export type StateFunction<S, R> = (s: S) => [R, S];
export type DStateF<S, R, N> = (s: S, r: R) => [N, S];

export interface State<S, R> {
  bind: <N>(fn: (V: R) => State<S, N>) => State<S, N>;
  runFN: (s: S) => [R, S];
  runValue: (s: S) => R;
  combinedBind<N>(fn: DStateF<S, R, N>): State<S, N>;
}

class InternalState<S, R> implements State<S, R> {
  private _sfn: StateFunction<S, R>;
  // private _state: S
  public constructor(sfn: StateFunction<S, R>) {
    this._sfn = sfn;
  }

  // This is fine for now but there is probably a more elegant solution
  // The bind for state explicitly creates a new function which still much start
  // with an inital S
  public bind = <N>(fn: (v: R) => State<S, N>): State<S, N> => {
    return new InternalState((s: S) => {
      const [v, ns] = this.runFN(s);
      return fn(v).runFN(ns);
    });
  };

  public combinedBind = <N>(fn: DStateF<S, R, N>): State<S, N> => {
    return this.bind((v) => State((s) => fn(s, v)));
  };

  public runFN = (s: S) => {
    return this._sfn(s);
  };

  public runValue = (s: S) => {
    return this.runFN(s)[0];
  };
}

export function State<S, R>(sfn: StateFunction<S, R>): State<S, R> {
  return new InternalState<S, R>(sfn);
}
