"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var drawing_utils_1 = require("@mediapipe/drawing_utils");
var hands_1 = require("@mediapipe/hands");
var camera_utils_1 = require("@mediapipe/camera_utils");
var video = document.getElementById('input');
var canvas = document.getElementById('output');
var ctx = canvas.getContext('2d');
//関連ファイルの読み込み
var config = {
    locateFile: function (file) { return "https://cdn.jsdelivr.net/npm/@mediapipe/hands/".concat(file); }
};
var hands = new hands_1.Hands(config);
//カメラからの映像をhands.jsで使えるようにする
var camera = new camera_utils_1.Camera(video, {
    onFrame: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hands.send({ image: video })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    width: 600,
    height: 400
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5 //ランドマーク追跡の信頼度(0.0~1.0)
});
//形状認識した結果の取得
hands.onResults(function (results) {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.scale(-1, 1)
    //ctx.translate(-width, 0)
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach(function (marks) {
            // 緑色の線で骨組みを可視化
            (0, drawing_utils_1.drawConnectors)(ctx, marks, hands_1.HAND_CONNECTIONS, { color: '#0f0' });
            // 赤色でランドマークを可視化
            (0, drawing_utils_1.drawLandmarks)(ctx, marks, { color: '#f00' });
        });
    }
});
//認識開始・終了ボタン
document.getElementById('start')
    .addEventListener('click', function () { return camera.start(); });
document.getElementById('stop')
    .addEventListener('click', function () { return camera.stop(); });
