export const enum LogLevel {
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
};

export const enum OperationState {
  Pending,
  Executing,
  Finished,
  Canceled,
  Sent,
  Failed,
};

export const enum TaskSetPriority {
  Minimum,
  Low,
  Normal,
  High,
  Urgent,
};

export const enum Result {
  Error,
  Success,
};
