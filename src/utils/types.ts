export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface Participant {
  _id?: number
  name: string
  submissionStatus: string
}
