import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import QuestionData from "../json/data.json";    // jsonから問題群をインポート
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";

export class SelectionScene extends SceneBase {
  public render(): void {
      const stages = QuestionData.questions;
      //ejs(https://ejs.co/#docs)によるテンプレートを使えるようするヘルパ
      //http getするのでpromiseが返る．
      DOM.template("./templates/selection.ejs", {stages:stages}).then((dom)=>{
          this.replaceElement(dom);

          //onclickイベントハンドラを設定
          for(const stage of stages) {
              DOM.id(stage.id).onclick = (e) => {
                  this.transitTo(new GameScene(stage.id));
              }
          }

          DOM.id("back_s").onclick = () => {this.transitTo(new StartScene);}

      });
      
  }
}