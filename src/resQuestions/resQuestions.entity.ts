// qnaId int(10) UN AI PK 
// qnaCreator int(10) UN 
// qnaDateCreate timestamp 
// qnaQuestionImage text 
// qnaAnswerImage text

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("qna")
export class qna {
    @PrimaryGeneratedColumn()
    qnaId: number

    @Column(
        {
            type: 'char',
            length: 36
        }
    )
    qnaCreator: string

    @Column(
        {
            type: 'text',
        }
    )
    qnaQuestionImage: string

    @Column(
        {
            type: 'text',
        }
    )
    qnaAnswerImage: string
}