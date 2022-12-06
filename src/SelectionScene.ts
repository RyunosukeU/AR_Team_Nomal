import { SceneBase } from "./Scenes";
import * as DOM from "./DOM";
import QuestionData from "./json/data.json";    // jsonから問題群をインポート
import { GameScene } from "./GameScene";

export class SelectionScene extends SceneBase {
  public render(): void {
      const stages = QuestionData.questions;
      //ejs(https://ejs.co/#docs)によるテンプレートを使えるようするヘルパ
      //http getするのでpromiseが返る．
      DOM.template("./hello.ejs", {stages:stages}).then((dom)=>{
          this.replaceElement(dom);

          //onclickイベントハンドラを設定
          for(const stage of stages) {
              DOM.id(stage.id).onclick = (e) => {
                  console.log(`select ${stage.name}`);
                  this.transitTo(new GameScene(stage.id));
              }
          }

      }).catch((e)=>{
          console.log(e);
      });
      
  }
}