import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";


export class EndScene extends SceneBase {
    constructor(
        private prevScene: SceneBase,
        private stage_id: string,
        private score: number,
    ) {
        super();
    }
    public render(): void {
        const div = DOM.make('div',
            [
                DOM.make('header',
                    [
                        DOM.make('h1', '結果発表'),
                        DOM.make('div', 'TOPに戻る', {
                            onclick: () => { this.transitTo(new StartScene); },
                            className: "side_button"
                        })
                    ]),
                DOM.make('div',
                    [
                        DOM.make('h1', 'あなたの点数は、、、'),
                        DOM.make('p', `${this.score}点`, {className:"result_score"}),
                        DOM.make('p', 'もう一度プレイする', {
                            onclick: () => { this.transitTo(new GameScene(this.stage_id)); },
                            className: "retry_button",
                        })
                    ], { id: "result" }),
                DOM.make('div', 'ランキング', {id:"ranking"}),
            ], { id: "end" }
        );
        this.replaceElement(div);
    }
}