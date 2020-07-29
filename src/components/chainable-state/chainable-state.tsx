import { State } from "../../monads/state";
import { Foo, StateCheckbox } from "./check";
import * as React from "react";

export const Chainable: React.FC<{}> = (props) => {
  return (
    <>
      <h2>ChainableState</h2>
      <div>Chainable state management</div>
      <ChainableState />
      <ChainedInc />
      <StateCheckbox text="asdf" onChange={() => {}}></StateCheckbox>
      <Foo.runValue text="Foooo" onChange={() => {}} />
    </>
  );
};

const IncState = (s: number): [number, number] => {
  return [s, s + 1];
};

interface Foo {
  onChange: (newCount: number) => void;
}

const RenderIncremental = (cur: number) => (
  n: number
): [(p: Foo) => JSX.Element, number] => {
  const inc = (props: Foo) => {
    return NoState({
      value: `count is ${cur}`,
      onIncrement: () => props.onChange(n),
    });
  };
  return [inc, n];
};

const Inc = State(IncState);

// For rendering an incremental that handles most of the changes
const IncEle = Inc.bind((n) => {
  return State(RenderIncremental(n));
});

const ChainableState: React.FC<{}> = (props) => {
  const [myValue, setMyValue] = React.useState(0);
  const incrementCallback = React.useCallback(() => {
    setMyValue(Inc.runFN(myValue)[1]);
  }, [myValue, setMyValue]);
  return <NoState value={myValue} onIncrement={incrementCallback} />;
};

const ChainedInc: React.FC<{}> = (props) => {
  const [myValue, setMyValue] = React.useState(0);
  const R = IncEle.runValue(myValue);
  return <R onChange={(n) => setMyValue(n)} />;
};

const NoState: React.FC<{ value: number | string; onIncrement: () => void }> = (
  props
) => {
  return <button onClick={props.onIncrement}>{props.value}</button>;
};
