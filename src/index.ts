//以下のpose-detection/demos/live_video/からの抜粋コードが含まれます
//https://github.com/tensorflow/tfjs-models

import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import * as posedetection from '@tensorflow-models/pose-detection';
//import { Pose, Keypoint, MoveNetModelConfig } from '@tensorflow-models/pose-detection';
import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';
import { Camera } from './camera';
import { PoseDetector } from './PoseDetector';
import { HandDetector } from './HandDetector';
import * as params from './params';
import { threadId } from 'worker_threads';
import { HandJudge } from './HandJudge'
import { deflateRaw } from 'zlib';

class App {
    camera?: Camera;
    //poseDetector?: PoseDetector;
    handDetector?: HandDetector;

    constructor() {
    }

    async build() {
        //cameraParam: { targetFPS: number, sizeOption: { width: number, height: number } }) {
        this.camera = await Camera.setupCamera(
            { 
                targetFPS: 30, 
                sizeOption: { width: 640, height: 480 } }
            );

        //this.poseDetector = await PoseDetector.create();
        this.handDetector = await HandDetector.create();
    }

    async run() {
        //this.cameraとthis.detectorは確実にnullではない（ようにプログラマはコーディングしている）
        const camera = this.camera!;
        //const detector = this.poseDetector!;
        const hand = this.handDetector!;

        await camera.waitReady();
        camera.drawVideo();

        const hands = await hand.detect(camera.video);
        //const poses = await detector.detect(camera.video);
        if(hands.length > 0) {
            camera.drawHands(hands);
            const point = hands[0].keypoints
            let handjud = new HandJudge;
            console.log(handjud.detectFingerPose(point))

        }
        //if (poses.length > 0 ) {
        //    camera.drawResults(poses);

            //例えばここでposesを分析するクラスのメソッドを呼び出す
        //}

        //本メソッドをループ実行する(抜けたあと，再度呼び出される)
        requestAnimationFrame(this.run.bind(this));
    }
};

async function run() {
    const app = new App();
    await app.build();
    await app.run();
}

run();
