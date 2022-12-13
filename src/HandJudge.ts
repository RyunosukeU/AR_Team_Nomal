import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';



export class HandJudge{
    constructor() {
        
    }
    public calcDistance(p0:Keypoint, p1:Keypoint) :number{
        let a1 = p1.x-p0.x
        let a2 = p1.y-p0.y
        return Math.sqrt(a1*a1 + a2*a2)
      }
      
      // 3頂点の角度の計算
      public calcAngle(p0:Keypoint, p1:Keypoint, p2:Keypoint) {
        let a1 = p1.x-p0.x
        let a2 = p1.y-p0.y
        let b1 = p2.x-p1.x
        let b2 = p2.y-p1.y
        let angle = Math.acos( (a1*b1 + a2*b2) / Math.sqrt((a1*a1 + a2*a2)*(b1*b1 + b2*b2)) ) * 180/Math.PI
        return angle
      }
      
      // 指の角度の合計の計算
      public cancFingerAngle(p0:Keypoint, p1:Keypoint, p2:Keypoint, p3:Keypoint, p4:Keypoint) {
        let result = 0
        result += this.calcAngle(p0, p1, p2)
        result += this.calcAngle(p1, p2, p3)
        result += this.calcAngle(p2, p3, p4)
        return result
      }
      
      // 指ポーズの検出
      public detectFingerPose(landmarks: Keypoint[]) {
        // 指のオープン・クローズ
        let thumbIsOpen = this.cancFingerAngle(landmarks[0], landmarks[1], landmarks[2], landmarks[3], landmarks[4]) < 70
        let firstFingerIsOpen = this.cancFingerAngle(landmarks[0], landmarks[5], landmarks[6], landmarks[7], landmarks[8]) < 100
        let secondFingerIsOpen = this.cancFingerAngle(landmarks[0], landmarks[9], landmarks[10], landmarks[11], landmarks[12]) < 100
        let thirdFingerIsOpen = this.cancFingerAngle(landmarks[0], landmarks[13], landmarks[14], landmarks[15], landmarks[16]) < 100
        let fourthFingerIsOpen = this.cancFingerAngle(landmarks[0], landmarks[17], landmarks[18], landmarks[19], landmarks[20]) < 100
      
        // ジェスチャー
        if (this.calcDistance(landmarks[4], landmarks[8]) < 0.1 && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen) {
          return "OK"
        } else if (this.calcDistance(landmarks[4], landmarks[12]) < 0.1 && this.calcDistance(landmarks[4], landmarks[16]) < 0.1 && firstFingerIsOpen && fourthFingerIsOpen) {
          return "キツネ"
        } else if (thumbIsOpen && !firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
          return "いいね"
        } else if (thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen) {
          return "パー"
        } else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen) {
          return "四"
        } else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && !fourthFingerIsOpen) {
          return "三"
        } else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
          return "二"
        } else if (!thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
          return "一"
        }
        return "グー"
      }
}