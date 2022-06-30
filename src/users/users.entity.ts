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

import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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
            length: 50,
            unique: true
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

    @Column(
        {
            type: 'varchar',
            length: 17
        }
    )
    userSecret: string

    @Column(
        {
            type: 'varchar',
            length: 9
        }
    )
    userGender: string

    @Column(
        {
            type: 'varchar',
            length: 32
        }
    )
    userEthnicity: string

    @Column(
        {
            type: 'varchar',
            length: 50
        }
    )
    userNationality: string

    @Column(
        {
            type: 'date',
        }
    )
    userBirthday: Date

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userBirthplace: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userContactAddress: string

    @Column(
        {
            type: 'varchar',
            length: 32
        }
    )
    userProvinceResidence: string

    @Column(
        {
            type: 'varchar',
            length: 32
        }
    )
    userDistrictResidence: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userAddress12: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userSchool12: string
	
    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userAddress11: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userSchool11: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userAddress10: string

    @Column(
        {
            type: 'varchar',
            length: 100
        }
    )
    userSchool10: string

    @Column(
        {
            type: 'char',
            length: 15
        }
    )
    userIdentityNumber: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userWardResidence: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userStreetResidence: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    currentTokenDevice: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    oldTokenDevice: string
    
    @Column(
        {
            type: 'varchar',
            length: 20,
            //unique: false
        }
    )
    userCandicateId: string

    @Column(
        {
            type: 'timestamp'
        }
    )
    userDateCreate: Timestamp
}