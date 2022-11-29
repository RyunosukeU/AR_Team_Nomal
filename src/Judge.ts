
export class Judge{

    public judge(kanji: string): boolean{
        let judge = false;
        let dummyjudge = judge;
        let num = Math.floor(Math.random() * 100);
        if(num < 50) {
            dummyjudge = true;
        } else {
            dummyjudge = false;
        }
        judge=dummyjudge;
        return judge;
    }
    public judgeTest(){
        console.log(this.judge("正"));
    }
}