import Types from '../types';

type Args<T> = IMeta & {
  body?: T;
};

export default <T>({ method, url, body, onSuccess, onError }: Args<T>) => ({
  meta: { method, url, onSuccess, onError },
  payload: body,
  type: Types.API_REQUEST,
});
