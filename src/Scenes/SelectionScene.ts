import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import QuestionData from "../json/data.json";    // jsonから問題群をインポート
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";
import { RankingScene } from "./RankingScene";

export class SelectionScene extends SceneBase {
  public render(): void {
      const stages = QuestionData.questions;
      //ejs(https://ejs.co/#docs)によるテンプレートを使えるようするヘルパ
      //http getするのでpromiseが返る．
      DOM.template("./templates/selection.ejs", {stages:stages}).then((dom)=>{
          this.replaceElement(dom);

          DOM.id("ranking").onclick = (e) => {
            console.log("Ranking");
            this.transitTo(new RankingScene())
          }

          //onclickイベントハンドラを設定
          for(const stage of stages) {
              DOM.id(stage.id).onclick = (e) => {
                  console.log(`select ${stage.name}`);
                  this.transitTo(new GameScene(stage.id));
              }
          }

          DOM.id("back_s").onclick = () => {this.transitTo(new StartScene);}

      }).catch((e)=>{
          console.log(e);
      });
      
  }
}