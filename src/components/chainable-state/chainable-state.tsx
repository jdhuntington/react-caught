import {State} from '../../monads/state';
import * as React from "react";

export const Chainable: React.FC<{}> = (props) => {
  return (
    <>
      <h2>ChainableState</h2>
      <div>
        Chainable state management
      </div>
          <ChainableState />
    </>
  );
};

const IncState = (s: number): [number, number] => {
  return [s * 2, s+1];
}

const Inc = State(IncState)

const ChainableState: React.FC<{}> = (props) => {
  const [myValue, setMyValue] = React.useState(0);
  const incrementCallback = React.useCallback(() => {
    setMyValue(Inc.runFN(myValue)[1])
  }, [myValue, setMyValue]);
  return <NoState value={myValue} onIncrement={incrementCallback} />;
};

const NoState: React.FC<{value: number, onIncrement: () => void}> = (props)=> {
  return <button onClick = {props.onIncrement}>
    {props.value}
  </button>

}