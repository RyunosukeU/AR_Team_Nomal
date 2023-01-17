import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import QuestionData from "../json/data.json";    // jsonから問題群をインポート
import { SelectionScene } from "./SelectionScene";
import { EndScene } from "./EndScene";
import { Question } from "../QuestionDataBase";
import { GameManager } from "../GameLogics/GameManager";

export class GameScene extends SceneBase {
    private timeRemaining: number = 0;
    private questions: Question; // 問題データ
    private questionIndex: number; // 問題用インデックス
    private questionLength: number;   // 問題数
    private timer?: NodeJS.Timer;
    private stage_id: string;
    private score: number;
    public kanji: string;   // 他クラスで認識するための漢字

    constructor(
        stage_id: string
    ) {
        super();
        this.stage_id = stage_id;
        this.questionIndex = 0;
        this.questionLength = -1;
        this.questions = QuestionData.questions[Number(this.stage_id) - 1]  //ステージid(番号)から問題を取得
        this.score = 0;
        this.kanji = this.questions.data[this.questionIndex].kanji;
    }

    public init(): void {
        this.questionIndex = 0;
    }

    public render(): void {
        this.timeRemaining = 120;    //制限時間の設定
        this.questionLength = this.questions.data.length;   //問題数を取得

        DOM.template("./templates/game.ejs", {
            name: `Stage ${this.stage_id}`,
            score: this.score,
            kanji: this.questions.data[this.questionIndex].kanji
        }).then((dom) => {
            this.replaceElement(dom);

            DOM.id("monitor").onclick = async () => {
                DOM.id("monitor").innerHTML = '';
                // キャンバス要素の展開
                const tmp = await DOM.template("./templates/canvas.ejs");
                DOM.id("monitor").appendChild(tmp);

                const gameManager = new GameManager(this);
                await gameManager.build();

                // タイマーの開始
                this.timer = setInterval(this.ontimer.bind(this), 1000);

                // ゲームの実行
                await gameManager.run();

                // onclickイベントを削除
                DOM.id("monitor").onclick = () => {};
            };

            DOM.id("back").onclick = () => {
                clearInterval(this.timer);
                this.transitTo(new SelectionScene);
            };
        })
    }

    private ontimer(): void {
        this.timeRemaining -= 1;
        DOM.id("time").innerHTML = `制限時間： ${this.timeRemaining}秒`;
        DOM.id("status").innerHTML = '';

        //残り時間がなくなる、または問題が最後まで進む
        if (this.timeRemaining === 0 || this.questionIndex === this.questionLength) {
            DOM.id("kanji").innerHTML = '終了';

            clearInterval(this.timer);
            this.transitTo(new EndScene(this, this.stage_id, this.score, this.timeRemaining));
        }
    }

    // UIの変更を行う
    public changeUI(resultState: boolean) {

        if(resultState) {
            console.log("正解です");
            this.score += 10;
            this.timeRemaining += 3;   //残り時間の追加
            this.questionIndex += 1;    //次の問題へ移行
            this.kanji = this.questions.data[this.questionIndex].kanji;

            //UIの更新
            DOM.id("status").innerHTML = '○';
            if (this.questionIndex !== this.questionLength) {
                DOM.id("kanji").innerHTML = this.kanji;
            }
            DOM.id("score").innerHTML = `スコア：${this.score}`
        }
        else {
            console.log("不正解です");
            DOM.id("status").innerHTML = "×";
        }
    }
}