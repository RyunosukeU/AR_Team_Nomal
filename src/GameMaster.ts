import { SceneManager } from "./SceneManager"
import { StartScene } from "./Start"; 


export class GameMaster{
  private manager: SceneManager = new SceneManager()

  public start():void {
    this.manager.changeScene(new StartScene());
  }
}

