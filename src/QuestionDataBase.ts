// 問題用の型
export type QuestionSet = {
    id: string;
    name: string
    data: Question[]
}

export type Question = {
    kanji: string
}