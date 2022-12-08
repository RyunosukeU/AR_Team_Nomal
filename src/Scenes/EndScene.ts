import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";


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