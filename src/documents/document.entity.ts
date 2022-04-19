import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("document")
export class document {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    documentId: number

    @Column({
        type: 'varchar',
        length: 100
    })
    documentTitle: string

    @Column({
        type: 'text',
    })
    documentContent: string

    @Column({
        type: 'text',
    })
    documentImage: string
}