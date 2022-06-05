import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("faculty")
export class faculty {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    facultyId: number

    @Column({
        type: 'varchar',
        length: 100,
    })
    facultyName: string

    @Column({
        type: 'text'
    })
    facultyImageCompare: string

    @Column(
        {
            type: 'text',
        }
    )
    facultyImageHighlight: string

    @Column(
        {
            type: 'text'
        }
    )
    facultyIntroduction: string

    @Column(
        {
            type: 'text'
        }
    )
    facultyLogo: string
}