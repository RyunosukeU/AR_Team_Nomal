import {Point} from './Point'
export class Pose {
    public pose: Point[];

    constructor(pose:Point[]){
        this.pose = pose;
    }
}