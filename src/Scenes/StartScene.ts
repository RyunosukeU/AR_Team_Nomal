import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { SelectionScene } from "./SelectionScene";
import { RankingScene } from "./RankingScene";

export class StartScene extends SceneBase {
  public render(): void {
      //HTMLを簡単に作成するためのヘルパ関数
      const button_box = DOM.make("div",
      [
        DOM.make("p", "ゲームを始める",
        { //id, className, onclickを指定可能
            onclick:()=>{
                this.transitTo(new SelectionScene());                                
            },
            className: "btn btn-info",
        }),
        DOM.make("p", "ランキング",
        {
          onclick:()=>{
            this.transitTo(new RankingScene());                                
          },
          className: "btn btn-info",
        })
      ], {className:"button_box"});

      const start = DOM.make("div", button_box, {id: "start"});

      this.replaceElement(start);
  }
}