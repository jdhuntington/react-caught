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
      </dl>
    </>
  );
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
