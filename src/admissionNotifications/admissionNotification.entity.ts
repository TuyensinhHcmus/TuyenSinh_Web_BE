import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notification")
export class notification {
    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    notificationId: number

    @Column(
        {
            type: 'char',
            length: 36
        }
    )
    notificationUserId: string

    @Column({
        type: 'varchar',
        length: 255
    })
    notificationContent: string

    @Column({
        type: 'varchar',
        length: 255
    })
    notificationTo: string

    @Column(
        {
            type: 'timestamp',
        }
    )
    notificationTimestamp: Date

    @Column({
        type: 'varchar',
        length: 50
    })
    notificationState: string

}