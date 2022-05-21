// // qnaId int(10) UN AI PK 
// // qnaCreator int(10) UN 
// // qnaDateCreate timestamp 
// // qnaQuestionImage text 
// // qnaAnswerImage text

// import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

// @Entity("qna")
// export class qna {
//     @PrimaryGeneratedColumn()
//     qnaId: number

//     @Column(
//         {
//             type: 'char',
//             length: 36,
//             nullable: false
//         }
//     )
//     qnaCreator: string

//     @Column(
//         {
//             type: 'timestamp',
//         }
//     )
//     qnaDateCreate: Timestamp

//     @Column(
//         {
//             type: 'text'
//         }
//     )
//     qnaQuestion: string

//     @Column(
//         {
//             type: 'text'
//         }
//     )
//     qnaAnswer: string

//     @Column(
//         {
//             type: 'char',
//             length: 4
//         }
//     )
//     qnaTypeOfTrainingID: string
// }