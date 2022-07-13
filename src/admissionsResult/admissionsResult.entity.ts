import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// adrsMajorName varchar(255),
//     adrsFullName varchar(255),
//     adrsMethod varchar(100),
//     adrsScore varchar(5),
//     adrsPhone varchar(12),
//     adrsEmail varchar(255),
//     adrsMessageSms text,


@Entity("admissionsresult")
export class AdmissionsResult {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    adrsId: number

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    adrsMajorName: string

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    adrsFullName: string

    @Column(
        {
            type: 'varchar',
            length: 100,
        }
    )
    adrsMethod: string

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    adrsScore: string

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    adrsPhone: string

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    adrsEmail: string


    @Column(
        {
            type: 'text',
        }
    )
    adrsMessageSms: string
}