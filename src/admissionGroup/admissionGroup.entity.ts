import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admissionsgroup")
export class admissionsgroup {
    @Column(
        {
            type: 'char',
            length: 5,
            primary: true,
            nullable: false
        }
    )
    agId: string

    @Column({
        type: 'varchar',
        length: 20
    })
    agFirstSubject: string

    @Column({
        type: 'varchar',
        length: 20
    })
    agSecondSubject: string

    @Column({
        type: 'varchar',
        length: 20
    })
    agThirdSubject: string

}