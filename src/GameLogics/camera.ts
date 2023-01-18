import { Hand } from '@tensorflow-models/hand-pose-detection';
import * as params from './params';

const COLOR_PALETTE = [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
];

export class Camera {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

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
        // const devices = await (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.label === "FaceTime HDカメラ（内蔵） (05ac:8600)");
        // console.log(devices);

        const { targetFPS, sizeOption } = cameraParam;
        const videoConfig = {
            'audio': false,
            'video': {
                facingMode: 'user',
                width: sizeOption.width,
                height: sizeOption.height,
                frameRate: {
                    ideal: targetFPS,
                },
                // deviceId: devices[0].deviceId,
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

    drawHands(hands:Hand[], thre = 0.2) {
        this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

        for(const hand of hands) {
            if(hand.score > thre) {
                const kps = hand.keypoints.filter((kp) => kp.name === "index_finger_tip");
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