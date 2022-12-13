import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import QuestionData from "../json/data.json";    // jsonから問題群をインポート
import { SelectionScene } from "./SelectionScene";
import { Judge } from "../Judge";
import { EndScene } from "./EndScene";
import { Question } from "../QuestionDataBase";

export class GameScene extends SceneBase {
    private timeRemaining: number = 0;
    private questions: Question; // 問題データ
    private questionIndex: number; // 問題用インデックス
    private questionLength: number;   // 問題数
    private timer?: NodeJS.Timer;
    private stage_id: string;
    private score: number;

    constructor(
        stage_id: string
    ) {
        super();
        this.stage_id = stage_id;
        this.questionIndex = 0;
        this.questionLength = -1;
        this.questions = QuestionData.questions[Number(this.stage_id) - 1]  //ステージid(番号)から問題を取得
        this.score = 0;
    }

    public init(): void {
        this.questionIndex = 0;
    }

    public render(): void {
        console.log(typeof(QuestionData.questions));
        this.timeRemaining = 30;    //制限時間の設定
        this.questionLength = this.questions.data.length;   //問題数を取得

        DOM.template("./templates/game.ejs", {
            name: `Stage ${this.stage_id}`,
            score: this.score,
            kanji: this.questions.data[this.questionIndex].kanji
        }).then((dom) => {
            this.replaceElement(dom);

            DOM.id("monitor").onclick = () => {
                DOM.id("monitor").innerHTML = 'カメラ入力部';
                this.timer = setInterval(this.ontimer.bind(this), 1000);
                DOM.id("monitor").onclick = () => { this.capture_handtrack(this.questions.data[this.questionIndex].kanji); };
            };

            DOM.id("back").onclick = () => {
                this.transitTo(new SelectionScene);
                clearInterval(this.timer);
            };
        })
    }

    private ontimer(): void {
        this.timeRemaining -= 1;
        DOM.id("time").innerHTML = `制限時間： ${this.timeRemaining}秒`;
        DOM.id("status").innerHTML = '';

        //残り時間がなくなる、または問題が最後まで進む
        if (this.timeRemaining === 0 || this.questionIndex === this.questionLength) {
            this.timeRemaining = 30;

            DOM.id("kanji").innerHTML = '終了';

            clearInterval(this.timer);
            this.transitTo(new EndScene(this, this.stage_id, this.score));
        }
    }

    //ゲームの判定部分を行う関数
    private capture_handtrack(kanji: string): void {
        const judge = new Judge;
        if (judge.getJudgement(kanji)) {
            console.log("正解です");
            this.score += 10;
            this.timeRemaining += 3;   //残り時間の追加
            this.questionIndex += 1;    //次の問題へ移行

            //UIの更新
            DOM.id("status").innerHTML = '○';
            if (this.questionIndex !== this.questionLength) {
                DOM.id("kanji").innerHTML = this.questions.data[this.questionIndex].kanji;
            }
            DOM.id("score").innerHTML = `スコア：${this.score}`
        }
        else {
            console.log("不正解です");
            DOM.id("state").innerHTML = "×";
        }
    }
}