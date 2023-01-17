import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";
import { RankingScene } from "./RankingScene";

export class EndScene extends SceneBase {
    private rankingScene!: RankingScene
    private score: number;
    constructor(
        private prevScene: SceneBase,
        private stage_id: string,
        private correctAnswers: number,
        private timeRemaining: number,
        //private userName: string,
    ) {
        super();
        this.rankingScene = new RankingScene;
        this.score = this.calculationScore(correctAnswers, timeRemaining);
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
                        DOM.make('p', `正解数：${this.correctAnswers}問`, {className:"result_score"}),
                        DOM.make('p', `残り時間${this.timeRemaining}秒`, {className:"result_score"}),
                        DOM.make('p', `${this.score}点`, {className:"result_score"}),
                        DOM.make('div', [
                            DOM.make('p', 'ユーザー名の登録'),
                            DOM.makeInput("text", {id: "userName"}),
                            DOM.makeInput("button", {value: "登録する", id: "submit_button", onclick: ()=>{
                                const input = DOM.id("userName") as HTMLInputElement;
                                if(input.value != "") {
                                    this.rankingScene.add_and_show(this.stage_id, this.score, input.value);
                                } else {
                                    this.rankingScene.add_and_show(this.stage_id, this.score, "名無しさん");
                                }

                                // 2度目は入力できないように
                                input.disabled = true;
                                const button = DOM.id("submit_button") as HTMLInputElement;
                                button.disabled = true;
                            }}),
                        ]),
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

    private calculationScore(correctAnswers: number, timeRemaining: number): number{
        const score = correctAnswers + timeRemaining
        return score
    }
}