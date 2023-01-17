import { string } from "@tensorflow/tfjs";
import * as DOM from "../DOM";
import { SceneBase } from "./SceneBase";
import { SelectionScene } from "./SelectionScene";

// ステージデータ
type ScoresByStage = {
    id: string;
    stageName: string;
    scores: ScoreInfo[]
}

// スコアデータ
type ScoreInfo = {
    userName: string;
    score: number
}

export class RankingScene extends SceneBase {
    public timeRemaining: number = 60
    public correctAnswers: number = 0
    public ranking!: object
    public scoreManager!: ScoresByStage[]

    constructor() {
        super()
        if ("score" in localStorage) {
            this.scoreManager = JSON.parse(localStorage.getItem('score')!) as ScoresByStage[]
        } else {
            // ローカルストレージにデータがない場合はステージデータを作成
            const scoreManager = Array(6) as ScoresByStage[];
            for(let i = 0; i < 6; i++) {
                const stage = {
                    id: `${i}`,
                    stageName: `stage${i}`,
                    scores: []
                } as ScoresByStage;
                scoreManager[i] = stage;
            }
            this.scoreManager = scoreManager;
        }

    }

    private pushScoreData(score: number, stageId: string, userName: string) {
        let inputData: ScoreInfo = { userName: userName, score: score }
        this.scoreManager[Number(stageId) - 1].scores.push(inputData)
        let decode_json = JSON.stringify(this.scoreManager)
        localStorage.setItem('score', decode_json)
    }

    private buildRanking(stageId: string) {
        this.scoreManager[Number(stageId) - 1].scores = this.scoreManager[Number(stageId) - 1].scores.sort(function (a, b) {
            return b.score - a.score;
        });
    }

    private showRanking(stageId: string): void {
        DOM.id("ranking").innerHTML = "";
        const rankingByStage = this.scoreManager[Number(stageId) - 1].scores
        if(rankingByStage.length != 0) {
            this.buildRanking(stageId)
            for (let i = 0; i < rankingByStage.length; i++) {
                let child = DOM.make("div", [
                    DOM.make("p", `第 ${i + 1}位`),
                    DOM.make("p", `ユーザーネーム: ${rankingByStage[i].userName}`),
                    DOM.make("p", `スコア: ${rankingByStage[i].score}`)
                ])
                DOM.add(DOM.id("ranking"), child)
            }
        } else {
            DOM.id("ranking").innerHTML = "データがまだ存在しません";
        }
    }

    public add_and_show(stage_id: string, score: number, userName: string) {
        this.pushScoreData(score, stage_id, userName);
        this.showRanking(stage_id);
    }

    public render(): void {
        const ranking = DOM.make("div",
            [

                DOM.make('header',
                    [
                        DOM.make("h1", "Ranking"),
                        DOM.make('div', '戻る', {
                            onclick: () => { this.transitTo(new SelectionScene) },
                            className: "side_button"
                        })
                    ]),
                DOM.make("div", "", { id: "ranking" }),
            ], { className: "ranking" });



        DOM.template("./templates/selectRanking.ejs", {}).then((dom) => {
            this.replaceElement(dom);
            this.showRanking('1');
            DOM.id("back_to_select").onclick = () => { this.transitTo(new SelectionScene()); };
            let selectedStage = DOM.id("selectStage") as HTMLInputElement
            selectedStage.onchange = () => {
                let stage_num = selectedStage.value
                this.showRanking(stage_num);
            }
        })

        //this.replaceElement(ranking);
    }

}
