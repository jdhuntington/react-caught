import * as React from "react";
import { ReactState } from "../../monads/rState";

export interface CheckBoxView {
  text: string;
  checked: boolean;
  onChange: (ev: React.ChangeEvent) => void;
}

export interface CheckboxProps {
  text: string;
  onChange: (checked: boolean) => void;
}

// PropsLayer => StateLayer => View
export const Checkbox: React.FC<CheckBoxView> = (props) => {
  return (
    <span>
      <input
        type={"checkbox"}
        checked={props.checked}
        onChange={props.onChange}
      ></input>
      <span>{props.text}</span>
    </span>
  );
};

export const StateCheckbox: React.FC<CheckboxProps> = (props) => {
  const [state, update] = React.useState(false);
  const onChange = React.useCallback(() => {
    update(!state);
    props.onChange(!state);
  }, [state, update]);
  return (
    <Checkbox onChange={onChange} text={props.text} checked={state}></Checkbox>
  );
};

const checkedState = ReactState((props: CheckboxProps): [
  CheckBoxView,
  CheckboxProps
] => {
  const [state, update] = React.useState(false);
  const onChange = React.useCallback(() => {
    update(!state);
    props.onChange(!state);
  }, [state, update]);
  return [{ text: props.text, onChange: onChange, checked: state }, props];
});

export const StatefulCheckbox = checkedState.bindRender(Checkbox);
