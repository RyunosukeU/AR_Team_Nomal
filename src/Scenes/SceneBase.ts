import { SceneManager } from "../SceneManager";
import * as DOM from "../DOM";

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