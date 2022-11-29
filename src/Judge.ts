
export class Judge{
    
    public judge(kanji: string): boolean{
        let boo = false;
        let dummyjudge;
        let num = Math.floor(Math.random() * 100);
        if(num < 50) {
            dummyjudge = true;
        } else {
            dummyjudge = false;
        }
        boo=dummyjudge;
        return boo;
    }
}
let p = new Judge();
console.log(p.judge("正"));