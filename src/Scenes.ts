import { SceneManager } from "./SceneManager";
import * as DOM from "./DOM";
import { Data } from "ejs";
import QuestionData from "./json/data.json";    // jsonから問題群をインポート
import { Judge } from "./judge";
import { on } from "events";

interface Question {
    kanji: string;
    handtrack: Handtrack;
}

interface Handtrack {
    strokes: Array<Stroke>;
}

interface Stroke {
    points: Array<Point>;
}

interface Point {
    x: number;
    y: number;
}

export abstract class SceneBase {
    public sceneManager?: SceneManager;
    constructor() {
    }
    set manager(manager: SceneManager) {
        this.sceneManager = manager;
    }
    get manager(): SceneManager {
        return this.sceneManager!;
    }

    replaceElement(new_element : HTMLElement) {
        var scene = DOM.id("Scene");
        DOM.removeChildren(scene);
        DOM.add(scene, new_element);
    }

    transitTo(next_scene : SceneBase) {
        this.manager.changeScene(next_scene);
    }

    abstract render(): void;
}

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
 
class SelectionScene extends SceneBase {
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

class GameScene extends SceneBase {
    private timeRemaining : number = 0;
    private questions; // 問題データ
    private questionIndex : number; // 問題用インデックス
    private questionLength : number;   // 問題数
    private timer? : NodeJS.Timer;
    private stage_id :string;
    private score: number;
    
    constructor(
        stage_id : string
    ){
        super();
        this.stage_id = stage_id;
        this.questionIndex = 0;
        this.questionLength = -1;
        this.questions = QuestionData.questions[Number(this.stage_id)-1]    //ステージid(番号)から問題を取得
        this.score = 0;
    }

    public init() : void {
        this.questionIndex = 0;
    }

    public render(): void {
        console.log(this.questionIndex);
        this.timeRemaining = 30;    //制限時間の設定
        this.questionLength = this.questions.data.length;   //問題数を取得

        //第２引数にHTMLElementの配列を指定すると入れ子構造にできる
        const div = DOM.make('div',
            [
                DOM.make('h1', `Stage ${this.stage_id}`),
                DOM.make('h2', `No.${this.questionIndex+1}`, {id:"no"}),
                DOM.make('p', "time remaining", {id:"time"}),
                DOM.make('p', `スコア：${this.score}`, {id:"score"}),
                DOM.make('p', `お題： ${this.questions.data[this.questionIndex].kanji}`, {id:"kanji"}),
                DOM.make('h1', '', {id:"state"}),
                DOM.make('h1', 'カメラ入力部', {
                    onclick:()=>{this.game(this.questions.data[this.questionIndex].kanji);}
                }),
                DOM.make('h1', 'back', {
                    onclick:()=> {this.transitTo(new SelectionScene);}
                })
            ]        
        );
        this.replaceElement(div);

        //コールバックとしてメソッドを指定する場合以下のようにbindしないといけないらしい
        this.timer = setInterval(this.ontimer.bind(this), 1000);
    }

    private ontimer(): void {
        this.timeRemaining -= 1;
        DOM.id("time").innerHTML = `${this.timeRemaining} seconds left`;
        DOM.id("state").innerHTML = '';

        //残り時間がなくなる、または問題が最後まで進む
        if(this.timeRemaining === 0 || this.questionIndex === this.questionLength) {
            this.timeRemaining = 30;

            clearInterval(this.timer);
            this.transitTo(new EndScene(this, this.stage_id));
        }
    }

    //ゲームの判定部分を行う関数
    private game(kanji:string): void {
        const judge = new Judge;
        if (judge.getJudgement(kanji)) {
            console.log("正解です");
            this.score += 10;
            this.timeRemaining += 5;   //残り時間の追加
            this.questionIndex += 1;    //次の問題へ移行

            //UIの更新
            DOM.id("state").innerHTML = '○';
            DOM.id("no").innerHTML = `No.${this.questionIndex+1}`;
            DOM.id("kanji").innerHTML = `お題： ${this.questions.data[this.questionIndex].kanji}`;
            DOM.id("score").innerHTML = `スコア：${this.score}`
        }
        else {
            console.log("不正解です");
            DOM.id("state").innerHTML = "×";
        }
    }
}

class EndScene extends SceneBase {
    constructor(
        private prevScene : SceneBase,
        private stage_id : string
    ){
        super();
    }
    public render(): void {
        const div = DOM.make('div',
            [
                DOM.make('h1', 'Game Over!'),
                DOM.make('h2', 'retry', {
                    onclick:()=> {this.transitTo(new GameScene(this.stage_id));}
                }),
                DOM.make('h2', 'back to the title', {
                    onclick:()=> {this.transitTo(new StartScene);}
                })
            ]        
        );
        this.replaceElement(div);
    }
}
