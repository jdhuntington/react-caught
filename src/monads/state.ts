export type StateFunction<S, R> = (s: S) => [R, S];

export interface State<S, R> {
  bind: <N>(fn: (V: R) => State<S, N>) => State<S, N>;
  runFN: (s: S) => [R, S];
}

class InternalState<S, R> implements State<S, R> {
  private _sfn: StateFunction<S, R>;
  // private _state: S
  public constructor(sfn: StateFunction<S, R>) {
    this._sfn = sfn;
  }

  public bind<N>(fn: (v: R) => State<S, N>): State<S, N> {
    return new InternalState((s: S) => {
      const [v, ns] = this.runFN(s);
      return fn(v).runFN(ns);
    });
  }

  public runFN(s: S) {
    return this._sfn(s);
  }
}

export function State<S, R>(sfn: StateFunction<S, R>): State<S, R> {
  return new InternalState<S, R>(sfn);
}
