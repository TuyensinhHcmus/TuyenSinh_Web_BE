// newsId int(10) UN AI PK 
// newsTitle varchar(255) 
// newsContent text 
// newsDateCreate timestamp 
// newsCreator int(10) UN 
// newsState varchar(10) 
// newsSlug varchar(255)

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("news")
export class news {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    newsId: number

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    newsTitle: string

    @Column({
        type: 'text',
    })
    newsContent: string

    @Column(
        {
            type: 'timestamp',
        }
    )
    newsDateCreate: Date

    @Column({
        type: 'int',
        unsigned: true,
    })
    newsCreator: number

    @Column({
        type: 'varchar',
        length: 10,
    })
    newsState: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    newsSlug: string
}