import { SceneBase } from "./Scenes";
import * as DOM from "./DOM";
import { SelectionScene } from "./SelectionScene";

export class StartScene extends SceneBase {
  public render(): void {
      //HTMLを簡単に作成するためのヘルパ関数
      const start = DOM.make("h1", "click to start!",
          { //id, className, onclickを指定可能
              onclick:()=>{
                  this.transitTo(new SelectionScene());                                
              }
          });
      this.replaceElement(start);
  }
}