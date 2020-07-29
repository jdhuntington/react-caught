import {StateFunction, DStateF} from './state';
import * as React from 'react'

export class ReactMonad<Props, R> {

  private _sfn: StateFunction<Props, R>;
  // private _state: S
  public constructor(sfn: StateFunction<Props, R>) {
    this._sfn = sfn;
  }
  public bind: <N>(fn: (v: R) => ReactMonad<Props, N>) => ReactMonad<Props, N> = (fn) => {
    return new ReactMonad((s: Props) => {
      const [v, ns] = this.runFN(s);
      return fn(v).runFN(ns);
    });
  };

  public render = (props: Props) => {
    return this.runValue(props);
  }

  public bindRender: (
    Rnd: (p: R) => JSX.Element
  ) => ReactMonad<Props, JSX.Element>  = (Rnd) => {
    return this.combinedBind((s: Props, p: R) => [<Rnd {...p} />, s]);
  }

  public combinedBind: <N>(fn: DStateF<Props, R, N>) => ReactMonad<Props, N> = (fn) => {
    return this.bind((v) => new ReactMonad((s) => fn(s, v)));
  };

  public runFN = (s: Props) => {
    return this._sfn(s);
  };

  public runValue = (s: Props) => {
    return this.runFN(s)[0];
  };
}

// function bnd<V, P>(Rnd: (p: P)=> JSX.Element):DStateF<V,P, JSX.Element>  {
//   return (s:V, p:P) => [<Rnd {...p} />, s ]
// }

export function ReactState<S, R>(sfn: StateFunction<S, R>){
  return new ReactMonad<S, R>(sfn);
}