import '@tensorflow/tfjs-backend-webgl';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Hand, MediaPipeHandsTfjsModelConfig, MediaPipeHandsMediaPipeModelConfig } from '@tensorflow-models/hand-pose-detection';
//import * as params from './params';

export class HandDetector {
    tfDetector?: handPoseDetection.HandDetector;

    constructor() {
    }

    static async create() : Promise<HandDetector> {
        const detector = new HandDetector();
        await detector.setup();

        return detector;
    }

    async setup() {
        try {
            this.tfDetector = await HandDetector.createDetector();
        }catch(err) {
            console.warn(err);
        }

    }

    static async createDetector() : Promise<handPoseDetection.HandDetector> {
        /*
        export interface MediaPipeHandsTfjsModelConfig extends MediaPipeHandsModelConfig {
    runtime: 'tfjs';
    detectorModelUrl?: string;
    landmarkModelUrl?: string;
}*/
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig : MediaPipeHandsMediaPipeModelConfig = {
          runtime: 'mediapipe', // or 'tfjs',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
          modelType: 'lite'
        }
        const detector = await handPoseDetection.createDetector(model, detectorConfig);
        return detector;
    }

    async detect(video : HTMLVideoElement) : Promise<Hand[]>  {
        //this.tfDetectorは確実にnullではない（ようにプログラマはコーディングしている）
        //ので!でnullではないことをコンパイラに伝える(unwap, undefinedのunion型を消す)
        //つまり PoseDetector | undefined -> PoseDetector　のように変換する
        const detector = this.tfDetector!;
        let hands = Array<Hand>();
        // Detectors can throw errors, for example when using custom URLs that
        // contain a model that doesn't provide the expected output.
        try {
            hands = await detector.estimateHands(
                video,
                { });
        } catch (error) {
            alert(error);
            detector.dispose();
            this.tfDetector = undefined;
        } 
        return hands;
    }
};

