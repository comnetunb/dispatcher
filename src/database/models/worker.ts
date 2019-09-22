import { model, Schema, Document, Model, DocumentQuery } from 'mongoose';
import { WorkerState } from '../enums';
import Task from './task';

interface IWorkerDocument extends Document {
  address: string,
  port: number,
  uuid: string,
  runningInstances: number,
  state: WorkerState,
  resource: {
    outdated?: boolean,
    cpu?: number,
    memory?: number,
  },
  performance: {
    ratio?: number,
    leve?: string,
  },
  alias?: string,
}

export interface IWorker extends IWorkerDocument {
  updateRunningInstances(): Promise<IWorker>,
}

interface IWorkerModel extends Model<IWorker> {
  getAvailables(cpuThreshold: number, memoryThreshold: number): Promise<IWorker[]>,
}

const workerSchema: Schema = new Schema({
  address: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  // Internal id
  uuid: {
    type: String,
    required: true
  },
  runningInstances: {
    type: Number,
    default: 0
  },
  state: {
    type: Number,
  },
  resource: {
    outdated: {
      type: Boolean,
      default: true
    },
    cpu: Number,
    memory: Number
  },
  performance: {
    ratio: Number,
    level: {
      type: String,
      default: 'Undefined'
    }
  },
  alias: {
    type: String
  }
});

workerSchema.statics.getAvailables = function (cpuThreshold: number, memoryThreshold: number): Promise<IWorker[]> {
  const filter = {
    'resource.outdated': false,
    'resource.cpu': { $gt: cpuThreshold },
    'resource.memory': { $gt: memoryThreshold },
    'state': WorkerState.Running,
  };
  const worker: IWorkerModel = this;
  return worker
    .find(filter)
    .then((availableWorkers) => {
      return availableWorkers;
    });
};

workerSchema.methods.updateRunningInstances = function (): Promise<IWorker> {
  const worker: IWorker = this;
  return Task
    .count({ worker: worker.uuid })
    .then((count) => {
      worker.runningInstances = count;
      return worker.save();
    });
};

workerSchema.index({ address: 1, port: 1 }, { unique: true });

export const Worker: IWorkerModel = model<IWorker, IWorkerModel>('Worker', workerSchema);

export default Worker;