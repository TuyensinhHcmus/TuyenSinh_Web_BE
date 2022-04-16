// userId int10
// userName varchar100
// userType varchar50
// userPhone char12
// userEmail varchar50
// userRole varchar50
// userIsBlock tinyint1
// userPassword varchar100
// userAvatar text
// userRefreshToken varchar255

// newsId int(10) UN AI PK 
// newsTitle varchar(255) 
// newsContent text 
// newsDateCreate timestamp 
// newsCreator int(10) UN 
// newsState varchar(10) 
// newsSlug varchar(255)

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class user {
    @Column(
        {
            type: 'char',
            length: 36,
            primary: true,
        }
    )
    userId: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userName: string

    @Column(
        {
            type: 'varchar',
            length: 50
        }
    )
    userType: string

    @Column(
        {
            type: 'char',
            length: 50
        }
    )
    userPhone: string

    @Column(
        {
            type: 'varchar',
            length: 50,
            unique: true
        }
    )
    userEmail: string

    @Column(
        {
            type: 'varchar',
            length: 50
        }
    )
    userRole: string

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    userIsBlock: boolean

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userPassword: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userRefreshToken: string

    @Column({
        type: 'text',
    })
    userAvatar: string
}