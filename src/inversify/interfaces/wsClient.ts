export interface IWSClient {
  open: (path: string) => void;
  close: (path: string) => void;
  on: <T>(path: string, method: string, callback: (data: T) => void) => void;
  emit: (path: string, method: string, data?: Object) => void;
}
