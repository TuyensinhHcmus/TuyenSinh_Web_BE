// programId int(10) UN AI PK 
// programMajorId char(20) 
// programContent text 
// programDocumentLink text

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("program")
export class program {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    programId: number

    @Column(
        {
            type: 'char',
            length: 20,
            nullable: false
        }
    )
    programMajorId: string


    @Column(
        {
            type: 'varchar',
            length: 30,
        }
    )
    programName: string

    @Column({
        type: 'text',
    })
    programContent: string

    @Column(
        {
            type: 'text',
        }
    )
    programDocumentLink: string
}