import * as DOM from "../DOM";
import { SceneBase } from "./SceneBase";
import scoreData from "../json/score.json"; 
import { SelectionScene } from "./SelectionScene";
import QuestionData from "../json/data.json";  

interface Ranking{

}

type ScoresByStage = {
  id: string;
  stageName: string;
  scores: ScoreInfo[]
}

type ScoreInfo = {
  userName: string;
  score: number
}

export class RankingScene extends SceneBase {
  public TIME_LIMIT : number = 60 // 秒数は後に修正
  public timeRemaining!: number
  public correctAnswers!: number
  public ranking!: object
  public scoreManager!: ScoresByStage[]
  public stageId = ['', '1', '2', '3', '4', '5', '6']

  constructor(){
    super()
    this.timeRemaining = this.TIME_LIMIT
    this.correctAnswers = 0
    this.scoreManager = scoreData.scores
  }

  public calculationScore(currentScore: number): number{
    const score = this.correctAnswers + this.timeRemaining
    return score
  }

  public buildRanking(stageId: string) {
    this.scoreManager[Number(stageId) - 1].scores = this.scoreManager[Number(stageId) - 1].scores.sort(function(a, b) {
      console.log(a.score-b.score)
      return b.score - a.score;
    });
  }

  public showRanking(stageId: string): void{
    this.buildRanking(stageId)
    DOM.id("ranking").innerHTML = ""
    let rankingByStage = this.scoreManager[Number(stageId) - 1].scores
    for (let i = 0; i < 3; i++) {
      console.log(i)
      let child = DOM.make("div", [
        DOM.make("p", `第 ${i+1}位`),
        DOM.make("p", `ユーザーネーム: ${rankingByStage[i].userName}`),
        DOM.make("p", `スコア: ${rankingByStage[i].score}`)
      ])
      DOM.add(DOM.id("ranking"), child)
    }
  }

  public render(): void {

    // let selectedStage = DOM.id("selectStage") as HTMLInputElement
    // selectedStage.onchange = () => {
    // let stage_num = selectedStage.value
    // console.log(stage_num)
    // }

    console.log(this.ranking)

    const ranking = DOM.make("div",
      [
        
        DOM.make('header',
        [
          DOM.make("h1", "Ranking"),
          DOM.make('div', '戻る', {
              onclick: () => { this.transitTo(new SelectionScene)},
              className: "side_button"
          })
        ]),
        DOM.make("div", "", {id: "ranking"}),
      ], {className:"ranking"});



      DOM.template("./templates/selectRanking.ejs", {}).then((dom) => {
        this.replaceElement(dom);
        this.showRanking(this.stageId[1]);
        DOM.id("back_to_select").onclick = () => {this.transitTo(new SelectionScene());};
        let selectedStage = DOM.id("selectStage") as HTMLInputElement
        selectedStage.onchange = () => {
        let stage_num = selectedStage.value
        this.showRanking(stage_num);
      }
      })

      //this.replaceElement(ranking);
  }

}
