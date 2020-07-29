import * as React from "react";

export const DumbButtons: React.FC<{}> = (props) => {
  const focusRef = React.useRef(new Fok());
  React.useEffect(() => {
    const fcs = document.getElementById("keyboardgroup");
    console.log("shhsdfd");
    fcs.childNodes.forEach((node) => {
      focusRef.current.push(() => node as HTMLElement);
    });
  });
  return (
    <div>
      <div
        id={"keyboardgroup"}
        onKeyDown={(ev) => {
          switch (ev.keyCode) {
            case 37: {
              console.log("left");
              focusRef.current.focus(true).focus();
              break;
            } //left
            case 39: {
              console.log("right");
              focusRef.current.focus(false).focus();
              break;
            } // right
          }
        }}
      >
        <button id="a" onClick={() => console.log("db1 clicked")}>
          Text
        </button>
        <button id="b" onClick={() => console.log("db2 clicked")}>
          Funny words
        </button>
        <button id="c" onClick={() => console.log("db3 clicked")}>
          DUDE
        </button>
      </div>
      <div>
        <button onClick={() => console.log("db4 clicked")}>
          Can't arrow to me!
        </button>
      </div>
    </div>
  );
};

type ff = () => HTMLElement;
type fc = ff[];
class Fok {
  private _fcs: fc;
  private _curIndex: number = 0;
  public constructor(focusable: fc = []) {
    this._fcs = focusable;
  }

  public push = (f: ff) => {
    this._fcs.push(f);
  };

  public focus(dir: boolean) {
    if (dir) {
      if (this._curIndex <= 0) {
        this._curIndex = this._fcs.length - 1;
      } else {
        this._curIndex -= 1;
      }
    } else {
      if (this._curIndex >= this._fcs.length - 1) {
        this._curIndex = 0;
      } else {
        this._curIndex += 1;
      }
    }
    return this._fcs[this._curIndex]();
  }
}
