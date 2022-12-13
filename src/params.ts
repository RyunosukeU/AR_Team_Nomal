import {SupportedModels} from '@tensorflow-models/pose-detection';

 export const DEFAULT_LINE_WIDTH = 2;
 export const DEFAULT_RADIUS = 4;
 
 export const POSENET_CONFIG = {
   maxPoses: 1,
   scoreThreshold: 0.5
 };
 
 export const MOVENET_CONFIG = {
   maxPoses: 1,
   type: 'lightning',
   scoreThreshold: 0.3,
   customModel: '',
   enableTracking: false
 };

 export const detection_model = SupportedModels.MoveNet;
 export const modelConfig = MOVENET_CONFIG;
