//以下のpose-detection/demos/live_video/からの抜粋コードが含まれます
//https://github.com/tensorflow/tfjs-models

import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import * as posedetection from '@tensorflow-models/pose-detection';
import { Pose, MoveNetModelConfig } from '@tensorflow-models/pose-detection';
import * as params from './params';

export class PoseDetector {
    tfDetector?: posedetection.PoseDetector;

    constructor() {
    }

    static async create() : Promise<PoseDetector> {
        const detector = new PoseDetector();
        await detector.setup();

        return detector;
    }

    async setup() {
        try {
            this.tfDetector = await PoseDetector.createDetector();
            console.log("tf backend:",tf.getBackend());
        }catch(err) {
            console.warn(err);
        }

    }

    static async createDetector() : Promise<posedetection.PoseDetector> {
        const modelName = params.detection_model;
        let modelTypeName = 'thunder';
        let customModel = '';

        let modelType = "";
        if (modelTypeName == 'lightning') {
          modelType = posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
        } else if (modelTypeName == 'thunder') {
          modelType = posedetection.movenet.modelType.SINGLEPOSE_THUNDER;
        } else if (modelTypeName == 'multipose') {
          modelType = posedetection.movenet.modelType.MULTIPOSE_LIGHTNING;
        }

        let modelConfig : MoveNetModelConfig = {modelType:modelType};
  
        if (customModel !== '') {
          modelConfig.modelUrl = customModel;
        }
        if (modelTypeName === 'multipose') {
          modelConfig.enableTracking = params.modelConfig.enableTracking;
        }
        return posedetection.createDetector(modelName, modelConfig);
    }

    async detect(video : HTMLVideoElement) : Promise<Pose[]>  {
        //this.tfDetectorは確実にnullではない（ようにプログラマはコーディングしている）
        //ので!でnullではないことをコンパイラに伝える(unwap, undefinedのunion型を消す)
        //つまり PoseDetector | undefined -> PoseDetector　のように変換する
        const detector = this.tfDetector!;

        let poses = Array<Pose>();

        // Detectors can throw errors, for example when using custom URLs that
        // contain a model that doesn't provide the expected output.
        try {
            poses = await detector.estimatePoses(
                video,
                { maxPoses: params.modelConfig.maxPoses, flipHorizontal: false });
        } catch (error) {
            alert(error);
            detector.dispose();
            this.tfDetector = undefined;
        }

        return poses;
    }
};

