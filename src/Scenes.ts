import { SceneManager } from "./SceneManager";
import * as DOM from "./DOM";

export abstract class SceneBase {
    public sceneManager?: SceneManager;
 
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