import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { SelectionScene } from "./SelectionScene";

export class StartScene extends SceneBase {
  public render(): void {
      //HTMLを簡単に作成するためのヘルパ関数
      const start = DOM.make("div",
      [
        DOM.make("h1", "ゲーム名"),
        DOM.make("p", "click to start!",
          { //id, className, onclickを指定可能
              onclick:()=>{
                  this.transitTo(new SelectionScene());                                
              }
          })
      ], {className:"start"});

      this.replaceElement(start);
  }
}