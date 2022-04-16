// qnaId int(10) UN AI PK 
// qnaCreator int(10) UN 
// qnaDateCreate timestamp 
// qnaQuestionImage text 
// qnaAnswerImage text

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qna")
export class qna {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    qnaId: number

    @Column(
        {
            type: 'int',
            unsigned: true,
            nullable: false
        }
    )
    qnaCreator: number

    @Column({
        type: 'timestamp',
        nullable: false
    })
    qnaDateCreate: Date

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

@Entity("qna_trans")
export class qna_trans {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    qnaTransId: number

    @Column(
        {
            type: 'int',
            unsigned: true,
            nullable: false
        }
    )
    qnaId: number

    @Column(
        {
            type: 'text',
        }
    )
    qnaQuestion: string

    @Column(
        {
            type: 'text',
        }
    )
    qnaAnswer: string
}