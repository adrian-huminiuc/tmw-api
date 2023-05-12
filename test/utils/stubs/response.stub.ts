export interface ResponseStub<T> {
  status: number;
  headers: Record<'content-type' | string, string>;
  body: T;
}
