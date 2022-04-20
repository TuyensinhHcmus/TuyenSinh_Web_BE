import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("aspiration")
export class aspiration {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true
        }
    )
    aspirationId: number

    @Column({
        type: 'char',
        length: 20,
    })
    aspirationMajor: string

    @Column({
        type: 'varchar',
        length: 25
    })
    aspirationState: string

    @Column(
        {
            type: 'int',
            length: 10,
            unsigned: true,
        }
    )
    aspirationCvId: number

}