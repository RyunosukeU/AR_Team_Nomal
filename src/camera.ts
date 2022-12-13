import * as posedetection from '@tensorflow-models/pose-detection';
import { Pose, Keypoint } from '@tensorflow-models/pose-detection';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import * as params from './params';
import { Point } from './Point'

const COLOR_PALETTE = [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
];

export class Camera {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    model: posedetection.SupportedModels = params.detection_model;

    constructor() {
        this.video = document.getElementById('video') as HTMLVideoElement;
        this.canvas = document.getElementById('output') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    /**
     * Initiate a Camera instance and wait for the camera stream to be ready.
     */
    static async setupCamera(
        cameraParam: { targetFPS: number, sizeOption: { width: number, height: number } }) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }

        const { targetFPS, sizeOption } = cameraParam;
        const videoConfig = {
            'audio': false,
            'video': {
                facingMode: 'user',
                width: sizeOption.width,
                height: sizeOption.height,
                frameRate: {
                    ideal: targetFPS,
                }
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

        const camera = new Camera();
        camera.video.srcObject = stream;

        await new Promise((resolve) => {
            camera.video.onloadedmetadata = () => {
                resolve(null);
            };
        });

        camera.video.play();

        const videoWidth = camera.video.videoWidth;
        const videoHeight = camera.video.videoHeight;
        // Must set below two lines, otherwise video element doesn't show.
        camera.video.width = videoWidth;
        camera.video.height = videoHeight;

        camera.canvas.width = videoWidth;
        camera.canvas.height = videoHeight;

        // Because the image from camera is mirrored, need to flip horizontally.
        camera.ctx.translate(camera.video.videoWidth, 0);
        camera.ctx.scale(-1, 1);

        return camera;
    }
    
    /* ビデオフレームが利用可能になるまで待機
    */
    async waitReady() {
        //https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/readyState
        if (this.video.readyState < 2) {
            await new Promise((resolve) => {
                this.video.onloadeddata = () => {
                    resolve(this.video);
                };
            });
        }
    }

    drawVideo() {
        //console.log(this, this.ctx);
        this.ctx.drawImage(
            this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);

    }

    clearCtx() {
        this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    /**
     * Draw the keypoints and skeleton on the video.
     * @param poses A list of poses to render.
     */
    drawResults(poses_or_hands: Pose[] | Hand[]) {
        if(poses_or_hands instanceof Array<Pose>) {
            this.drawPoses(poses_or_hands);
        }else {
            this.drawHands(poses_or_hands);
        }
    }

    drawPoses(poses : Pose[]) {
        for (const pose of poses) {
            this.drawResult(pose);
        }
    }

    /**
     * Draw the keypoints and skeleton on the video.
     * @param pose A pose with keypoints to render.
     */
    drawResult(pose: Pose) {
        if (pose.keypoints != null) {
            this.drawKeypoints(pose.keypoints);
            this.drawSkeleton(pose.keypoints, pose.id);
        }
    }

    /**
     * Draw the keypoints on the video.
     * @param keypoints A list of keypoints.
     */
    //paramsに入れる？model
    drawKeypoints(keypoints: Keypoint[]) {
        const keypointInd =
            posedetection.util.getKeypointIndexBySide(this.model);
        this.ctx.fillStyle = 'Red';
        this.ctx.strokeStyle = 'White';
        this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

        for (const i of keypointInd.middle) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Green';
        for (const i of keypointInd.left) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Orange';
        for (const i of keypointInd.right) {
            this.drawKeypoint(keypoints[i]);
        }
    }

    drawKeypoint(keypoint: Keypoint) {
        // If score is null, just show the keypoint.
        const score = keypoint.score != null ? keypoint.score : 1;
        const scoreThreshold = params.modelConfig.scoreThreshold || 0;

        if (score >= scoreThreshold) {
            const circle = new Path2D();
            circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
            this.ctx.fill(circle);
            this.ctx.stroke(circle);

            //console.log(keypoint);

        }
    }

    /**
     * Draw the skeleton of a body on the video.
     * @param keypoints A list of keypoints.
     */
    drawSkeleton(keypoints: Keypoint[], poseId?: number) {
        // Each poseId is mapped to a color in the color palette.
        const color = params.modelConfig.enableTracking && poseId != null ?
            COLOR_PALETTE[poseId % 20] :
            'White';
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

        posedetection.util.getAdjacentPairs(this.model).forEach(([
            i, j
        ]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            // If score is null, just show the keypoint.
            const score1 = kp1.score != null ? kp1.score : 1;
            const score2 = kp2.score != null ? kp2.score : 1;
            const scoreThreshold = params.modelConfig.scoreThreshold || 0;

            if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
                this.ctx.beginPath();
                this.ctx.moveTo(kp1.x, kp1.y);
                this.ctx.lineTo(kp2.x, kp2.y);
                this.ctx.stroke();
            }
        });
    }

    drawHands(hands:Hand[], thre = 0.2) {
         this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
        // this.ctx.strokeStyle = 'White'; 
        // this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;


        for(const hand of hands) {
            if(hand.score > thre) {
                const kps= hand.keypoints.filter(kp => {if(kp.name == "index_finger_tip"){return kp}});
                for(const kp of kps) {
                    this.ctx.beginPath();
                    this.ctx.arc(kp.x, kp.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.stroke();
                }
            }
        }
    }
}