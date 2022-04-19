import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admissionprocess")
export class admissionProcess {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true
        }
    )
    apId: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    apTitle: string

    @Column({
        type: 'text'
    })
    apContent: string

    @Column(
        {
            type: 'int',
            unsigned: true,
        }
    )
    apStep: number

}