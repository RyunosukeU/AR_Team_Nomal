import '@tensorflow/tfjs-backend-webgl';
import { Judge } from './Judge';
import { GameScene } from '../Scenes/GameScene';
import { Camera } from "./camera";
import { HandDetector } from "./HandDetector";
import { LineDrawer } from './LineDrawer';

export class GameManager {
    camera?: Camera;
    handDetector?: HandDetector;
    lineDrawer?: LineDrawer;
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
                sizeOption: { width: 640, height: 480 } }
            );

        this.handDetector = await HandDetector.create();
        this.lineDrawer = new LineDrawer(this.camera.canvas);
        this.lineDrawer.setup();
    }

    async run() {
        //this.cameraとthis.detectorは確実にnullではない（ようにプログラマはコーディングしている）
        const camera = this.camera!;
        const hand = this.handDetector!;
        const lineDrawer = this.lineDrawer!;

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
            const judge = new Judge;
            const result = await judge.getJudgement(this.gameScene.kanji);
            this.gameScene.changeUI(result);

            this.clear();
            lineDrawer.state = false;
        }

        // ジェスチャー認識の状態を取得
        this.isJudged = lineDrawer.state;

        //本メソッドをループ実行する(抜けたあと，再度呼び出される)
        requestAnimationFrame(this.run.bind(this));
    }

    clear() {
        const lineDrawer = this.lineDrawer!;
        lineDrawer.letter_ctx.clearRect(0, 0, lineDrawer.letter_canvas.width, lineDrawer.letter_canvas.height);
        lineDrawer.buffer = [];
        lineDrawer.tmp_buff = [];
    }
}