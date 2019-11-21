interface IAction<T> {
  type: string;
  meta?: IMeta;
  payload: T;
}

interface IMeta {
  url: string;
  onError: string;
  onSuccess: string;
  method: 'get' | 'post';
}

interface IStore {
  form: any;
}
