import * as React from "react";

export const ExplicitState: React.FC<{}> = (props) => {
  return (
    <>
      <h2>Explicit state management</h2>
      <dl>
        <dt>
          <pre>DumbComponent</pre>
        </dt>
        <dd>
          <DumbComponent myValue={-1} onIncrement={() => {}} />
        </dd>
        <dt>
          <pre>DumbComponentWithSimpleStateManagement</pre>
        </dt>
        <dd>
          <DumbComponentWithSimpleStateManagement />
        </dd>
        <dt>
          <pre>DumbComponentWithCustomHook</pre>
        </dt>
        <dd>
          <DumbComponentWithCustomHook step={1} />
        </dd>
        <dt>
          <pre>DumbComponentWithCustomHook</pre>
        </dt>
        <dd>
          <DumbComponentWithCustomHook step={42} />
        </dd>
      </dl>
    </>
  );
};

const useIncrementor = (initial: number, step: number) => {
  const [val, setVal] = React.useState(initial);
  const increment = React.useCallback(() => {
    setVal(val + step);
  }, [val, setVal, step]);
  return { val, increment };
};

const DumbComponentWithCustomHook: React.FC<{ step: number }> = (props) => {
  const { val, increment } = useIncrementor(0, props.step);
  return <DumbComponent myValue={val} onIncrement={increment} />;
};

const DumbComponentWithSimpleStateManagement: React.FC<{}> = (props) => {
  const [myValue, setMyValue] = React.useState(1);
  const incrementCallback = React.useCallback(() => {
    setMyValue(myValue + 1);
  }, [myValue, setMyValue]);
  return <DumbComponent myValue={myValue} onIncrement={incrementCallback} />;
};

const DumbComponent: React.FC<{ myValue: number; onIncrement: () => void }> = (
  props
) => {
  return (
    <>
      <p>
        The value is <strong>{props.myValue}</strong>
      </p>
      <button onClick={props.onIncrement}>Increment</button>
    </>
  );
};
