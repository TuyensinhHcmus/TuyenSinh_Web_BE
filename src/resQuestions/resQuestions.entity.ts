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

    @OneToMany(() => qna_trans, (qna_trans) => qna_trans.qna, { cascade: ['insert', 'update'] }) // note: we will create author property in the Photo class below
    qna_trans: qna_trans[]
}

@Entity("qna_trans")
export class qna_trans {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    qnaTransId: number

    @ManyToOne(() => qna, (qna) => qna.qna_trans)
    qna: qna

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