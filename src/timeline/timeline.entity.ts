import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("timeline")
export class timeline {
    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    timelineId: number

    @Column({
        type: 'varchar',
        length: 255
    })
    timelineTitle: string

    @Column(
        {
            type: 'timestamp',
        }
    )
    timelineStart: Date

    @Column(
        {
            type: 'timestamp',
        }
    )
    timelineEnd: Date

    @Column({
        type: 'text',
    })
    timelineContent: string

    @Column({
        type: 'char',
        length: 4
    })
    timelineTypeOfTrainingID: string

}