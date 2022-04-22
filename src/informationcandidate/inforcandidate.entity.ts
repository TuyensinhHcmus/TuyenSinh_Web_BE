import { Column, Entity } from "typeorm";

@Entity("informationcandidate")
export class inforcandidate {

    @Column(
        {
            type: 'char',
            length: 15,
            unique: true,
            primary: true
        }
    )
    icIdentity: string


    @Column({
        type: 'char',
        length: 15,
        unique: true
    })
    icCandidateId: string

    @Column(
        {
            type: 'char',
            length: 15,
            unique: true
        }
    )
    icStudentId: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    icName: string
}