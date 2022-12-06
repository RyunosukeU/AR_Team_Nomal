import { SceneManager } from "./SceneManager";
import * as DOM from "./DOM";
import { SelectionScene } from "./SelectionScene";
import { GameScene } from "./GameScene";

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
 

export class EndScene extends SceneBase {
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

class QuestionOfStage {
    constructor(
    title : string,
    questions : Question[]
    ){}
   }
   
class Point_ {
    constructor(
    x:number,
    y:number
    ){}
}
   
class Stroke_ {
    points : Point_[] = [];
    }

class Question {
    constructor(
    strokes : Stroke_[],
    kanji : string
    ){}
    }
   
const statge_of_questions : QuestionOfStage[] = [];

let title = "１年生";

const questions : Question[] = [];

const strokes_of_kan : Stroke_[] = [];

questions.push(
new Question(strokes_of_kan, "漢")
)

statge_of_questions.push(
new QuestionOfStage(
title, questions 
)
);

const json : string = JSON.stringify(statge_of_questions);
console.log(json);