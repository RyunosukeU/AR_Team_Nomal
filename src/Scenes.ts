import { SceneManager } from "./SceneManager";
import * as DOM from "./DOM";

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
        const stages = [
            {name:"1", id:"stage1"},
            {name:"2", id:"stage2"}
        ];
        //ejs(https://ejs.co/#docs)によるテンプレートを使えるようするヘルパ
        //http getするのでpromiseが返る．
        DOM.template("./hello.ejs", {stages:stages}).then((dom)=>{
            this.replaceElement(dom);

            //onclickイベントハンドラを設定
            for(const stage of stages) {
                DOM.id(stage.id).onclick = (e) => {
                    console.log(`select stage ${stage.id}`);
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
    private timer? : NodeJS.Timer;
    constructor(
        private stage_id : string
    ){
        super();
    }

    public render(): void {
        this.timeRemaining = 5;

        //第２引数にHTMLElementの配列を指定すると入れ子構造にできる
        const div = DOM.make('div',
            [
                DOM.make('h1', `Stage ${this.stage_id}`),
                DOM.make('p', "time remaining", {id:"time"}),
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
        console.log(this.timeRemaining);
        this.timeRemaining -= 1;
        DOM.id("time").innerHTML = `${this.timeRemaining} seconds left`;

        if(this.timeRemaining === 0) {
            clearInterval(this.timer);
            this.transitTo(new EndScene(this));
        }
    }
}

class EndScene extends SceneBase {
    constructor(
        private prevScene : SceneBase
    ){
        super();
    }
    public render(): void {
        const div = DOM.make('div',
            [
                DOM.make('h1', 'Game Over!'),
                DOM.make('h2', 'retry', {
                    onclick:()=> {this.transitTo(this.prevScene);}
                }),
                DOM.make('h2', 'back to the title', {
                    onclick:()=> {this.transitTo(new StartScene);}
                })
            ]        
        );
        this.replaceElement(div);
    }
}
