import { model, Schema, Document, Model } from 'mongoose';
import { OperationState, Result } from '../enums';
import TaskSet, { ITaskSet } from './taskSet';

interface ITaskDocument extends Document {
  _taskSet: ITaskSet['_id'],
  indexes: number[],
  arguments: string[],
  commandLine: string,
  precedence: number,
  errorCount: number,
  worker?: string,
  state: OperationState,
  result?: string,
  startTime?: Date,
  endTime?: Date,
}

export interface ITask extends ITaskDocument {
  isPending(): boolean,
  isSent(): boolean,
  isExecuting(): boolean,
  isFinished(): boolean,
  isCanceled(): boolean,
  isFailed(): boolean,
  updateToDefaultState(): Promise<ITask>,
  flagError(): Promise<ITask>,
}

interface ITaskModel extends Model<ITask> {

}

const taskSchema: Schema = new Schema({
  _taskSet: {
    type: Schema.Types.ObjectId,
    ref: 'TaskSet',
    required: true,
  },
  indexes: [{
    type: Number,
    required: true,
  }],
  arguments: [{
    type: String,
    required: true,
  }],
  commandLine: {
    type: String,
    required: true,
  },
  precedence: {
    type: Number,
    required: true,
  },
  errorCount: {
    type: Number,
    required: true,
    default: 0
  },
  worker: {
    type: String,
  },
  state: {
    type: Number,
    default: OperationState.Pending,
  },
  result: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  }
});

taskSchema.methods.updateToDefaultState = async function (): Promise<ITask> {
  const task: ITask = this;
  const taskSet = await TaskSet.findById(task._taskSet);
  task.worker = undefined;
  task.startTime = undefined;
  if (taskSet.state === OperationState.Executing) {
    task.state = OperationState.Pending;
  } else {
    task.state = OperationState.Canceled;
  }

  return task.save();
};

taskSchema.methods.flagError = async function (): Promise<ITask> {
  const task: ITask = this;
  const taskSet = await TaskSet.findById(task._taskSet);
  task.worker = undefined;
  task.startTime = undefined;
  task.errorCount += 1;

  if (task.errorCount > taskSet.errorLimitCount) {
    task.state = OperationState.Failed;
  } else if (taskSet.state === OperationState.Executing) {
    task.state = OperationState.Pending;
  } else {
    task.state = OperationState.Canceled;
  }

  return task.save();
};

taskSchema.methods.isPending = function (): boolean {
  return this.state === OperationState.Pending;
};

taskSchema.methods.isSent = function (): boolean {
  return this.state === OperationState.Sent;
};

taskSchema.methods.isExecuting = function (): boolean {
  return this.state === OperationState.Executing;
};

taskSchema.methods.isFinished = function (): boolean {
  return this.state === OperationState.Finished;
};

taskSchema.methods.isCanceled = function (): boolean {
  return this.state === OperationState.Canceled;
};

taskSchema.methods.isFailed = function (): boolean {
  return this.state === OperationState.Failed;
};

export const Task: ITaskModel = model<ITask, ITaskModel>('Task', taskSchema);

export default Task;
