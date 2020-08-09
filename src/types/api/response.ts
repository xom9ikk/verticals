export interface IServerResponse<T = {}> {
  message: string
  data: T
}
