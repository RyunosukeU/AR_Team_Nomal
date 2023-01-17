import '@tensorflow/tfjs-backend-webgl';
import { Judge } from './Judge';
import { GameScene } from '../Scenes/GameScene';
import { Camera } from "./camera";
import { HandDetector } from "./HandDetector";
import { LineDrawer } from './LineDrawer';
import * as params from './params';

export class GameManager {
    camera?: Camera;
    handDetector?: HandDetector;
    lineDrawer?: LineDrawer;
    judge?: Judge;
    isJudged: boolean;  // trueなら判定中、falseなら手の認識中
    gameScene: GameScene;

    constructor(private _gameScene: GameScene){
        this.gameScene = _gameScene;
        this.isJudged = false;
    }

    async build() {
        this.camera = await Camera.setupCamera(
            { 
                targetFPS: 30, 
                sizeOption: { width: params.DEFAULT_CANVAS_WIDTH, height: params.DEFAULT_CANVAS_WIDTH } 
            }
        );
        this.judge = new Judge;
        await this.judge.setup();

        this.handDetector = await HandDetector.create();
        this.lineDrawer = new LineDrawer(this.camera.canvas, this.judge.model!);
        this.lineDrawer.setup();
    }

    async run() {
        //this.cameraとthis.detectorは確実にnullではない（ようにプログラマはコーディングしている）
        const camera = this.camera!;
        const hand = this.handDetector!;
        const lineDrawer = this.lineDrawer!;
        const judge = this.judge!;

        await camera.waitReady();
        camera.drawVideo();

        // 判定中でなければ手を認識
        if(!this.isJudged) {
            const hands = await hand.detect(camera.video);

            if(hands.length > 0) {
                camera.drawHands(hands);
                lineDrawer.getHands(hands);
            }

            // 軌跡の描画
            lineDrawer.draw();
        } else {
            // 判定器を作成
            const result = await judge.getJudgement(this.gameScene.kanji);
            this.gameScene.changeUI(result);

            // 画面のクリア
            lineDrawer.clear();
            lineDrawer.state = false;
        }

        // ジェスチャー認識の状態を取得
        this.isJudged = lineDrawer.state;

        //本メソッドをループ実行する(抜けたあと，再度呼び出される)
        requestAnimationFrame(this.run.bind(this));
    }
}