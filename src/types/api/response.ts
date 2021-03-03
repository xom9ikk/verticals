export interface IServerResponse<T = {}> {
  readonly message: string
  readonly data: T
}
