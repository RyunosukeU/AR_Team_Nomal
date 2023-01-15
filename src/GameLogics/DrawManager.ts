import '@tensorflow/tfjs-backend-webgl';
import { Camera } from "./camera";
import { HandDetector } from "./HandDetector";
import { LineDrawer } from './LineDrawer';

export class DrawManager {
    camera?: Camera;
    handDetector?: HandDetector;
    lineDrawer?: LineDrawer;

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

        const hands = await hand.detect(camera.video);

        if(hands.length > 0) {
            camera.drawHands(hands);
            lineDrawer.getHands(hands);
        }

        // 軌跡の描画
        lineDrawer.draw();

        //本メソッドをループ実行する(抜けたあと，再度呼び出される)
        requestAnimationFrame(this.run.bind(this));
    }
}