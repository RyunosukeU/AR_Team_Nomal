import { SceneBase } from "./SceneBase";
import * as DOM from "../DOM";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";
import { RankingScene } from "./RankingScene";
import { SelectionScene } from "./SelectionScene";

export class EndScene extends SceneBase {
    private rankingScene!: RankingScene
    private score: number;
    constructor(
        private prevScene: SceneBase,
        private stage_id: string,
        private correctAnswers: number,
        private timeRemaining: number,
        private stageName: string,
    ) {
        super();
        this.rankingScene = new RankingScene;
        this.score = this.calculationScore(correctAnswers, timeRemaining);
    }
    public render(): void {
        DOM.template("./templates/end.ejs", {
            stageName: this.stageName,
            correct: this.correctAnswers / 10,
            time: this.timeRemaining,
            score: this.score,
        }).then((dom) => {
            this.replaceElement(dom);

            DOM.id("back").onclick = () => { this.transitTo(new StartScene); };
            DOM.id("register").onclick = () => {
                const input = DOM.id("userName") as HTMLInputElement;
                if(input.value != "") {
                    this.rankingScene.add_and_show(this.stage_id, this.score, input.value);
                } else {
                    this.rankingScene.add_and_show(this.stage_id, this.score, "名無しさん");
                }

                // 2度目は入力できないように
                input.disabled = true;
                const button = DOM.id("register") as HTMLInputElement;
                button.disabled = true;
            }

            DOM.id("retry_button").onclick = () => { this.transitTo(new GameScene(this.stage_id)); };
            DOM.id("select_cource").onclick = () => { this.transitTo(new SelectionScene()); };
        });
    }

    private calculationScore(correctAnswers: number, timeRemaining: number): number{
        const score = correctAnswers + timeRemaining
        return score
    }
}