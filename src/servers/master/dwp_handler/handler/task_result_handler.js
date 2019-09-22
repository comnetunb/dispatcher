
const dispatcherProtocol = require('dispatcher-protocol');

const { taskResult } = dispatcherProtocol.pdu;

// Database Related
const Task = rootRequire('database/models/task');
const TaskSet = rootRequire('database/models/taskSet');
const Notification = rootRequire('database/models/notification');

// Shared Related
const mailer = rootRequire('servers/shared/mailer');
const log = rootRequire('servers/shared/log');

module.exports.execute = (pdu, worker) => {
  if (pdu.code === taskResult.ReturnCode.SUCCESS) {
    // Succeded
    try {
      JSON.parse(pdu.output);
    } catch (e) {
      log.fatal(`${e}\nJSON: ${pdu.output}`, pdu.task.id);
    }

    const taskUpdate = {
      result: pdu.output,
      state: Task.State.FINISHED,
      endTime: new Date(),
      $unset: { worker: 1 }
    };

    Task
      .findByIdAndUpdate(pdu.task.id, taskUpdate, { new: true })
      .then((task) => {
        log.info(`Worker ${worker.address}:${worker.port} has finished task with precedence ${task.precedence} (${task._id})`, pdu.task.id);

        TaskSet.UpdateRemainingTasksCount(task._taskSet);

        return cascadeConclusion(task._taskSet);
      })
      .then(() => {
        return worker.updateRunningInstances();
      })
      .catch((e) => {
        log.fatal(e, pdu.task.id);
      });
  } else {
    // Failed
    log.warn(`${pdu.task.id} failed to execute: ${pdu.output}`, pdu.task.id);

    Task
      .flagError(pdu.task.id)
      .then((task) => {
        TaskSet.UpdateRemainingTasksCount(task._taskSet);
        worker.updateRunningInstances();
        return cascadeConclusion(task._taskSet);
      })
      .catch((e) => {
        log.fatal(e, pdu.task.id);
      });
  }
};

function cascadeConclusion(taskSetId) {
  const taskFilter = {
    _taskSet: taskSetId,
    $or: [
      { state: Task.State.PENDING },
      { state: Task.State.SENT },
      { state: Task.State.EXECUTING }
    ],
  };

  return Task
    .count(taskFilter)
    .then((activeCount) => {
      if (activeCount > 0) {
        return;
      }

      // All tasks are done. Finish TaskSet
      const taskSetUpdate = {
        state: TaskSet.State.FINISHED,
        endTime: Date.now()
      };

      TaskSet
        .findOneAndUpdate({ _id: taskSetId, state: TaskSet.State.EXECUTING }, taskSetUpdate, { new: true })
        .populate('_user')
        .then((taskSet) => {
          if (taskSet) {
            sendConclusionEmail(taskSet);
            sendConclusionNotification(taskSet);
          }
        });
    });
}

function sendConclusionNotification(taskSet) {
  if (taskSet.state !== TaskSet.State.FINISHED) {
    return;
  }

  const taskFilter = {
    _taskSet: taskSet._id,
    $or: [
      { state: Task.State.CANCELED },
      { state: Task.State.FAILED }
    ],
  };

  return Task
    .count(taskFilter)
    .then((activeCount) => {
      let result = Notification.Result.SUCCESS;
      if (activeCount > 0) {
        result = Notification.Result.WARNING;
      }

      Notification.create(result, `Task set "${taskSet.name}" has finished`,
        `Result: ${result}`, taskSet._user, taskSet._id);
    });

}

function sendConclusionEmail(taskSet) {
  const to = taskSet._user.email;
  const subject = `Task set "${taskSet.name}" has finished`;

  // TODO: use template email
  const text =
    `Start time: ${taskSet.startTime}` +
    `\nEnd time: ${taskSet.endTime}` +
    `\nPriority: ${taskSet.priority}`;

  mailer.sendMail(to, subject, text);
}