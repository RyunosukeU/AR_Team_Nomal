import { SceneBase } from "./Scenes" 

export class SceneManager {
  public currentScene?: SceneBase;

  public changeScene(nextScene: SceneBase){
    this.currentScene = nextScene;
    nextScene.manager = this;
    nextScene.render();
  }


}