import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// cvId int(10) UN AI PK 
// cvMethodId char(5) 
// cvUserId char(36) 
// cvFile text 
// cvDateCreate timestamp 
// cvState varchar(50)

@Entity("cv")
export class cv {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    cvId: number

    @Column(
        {
            type: 'char',
            length: 5,
        }
    )
    cvMethodId: string

    @Column(
        {
            type: 'char',
            length: 36,
        }
    )
    cvUserId: string

    @Column(
        {
            type: 'text'
        }
    )
    cvFile: string

    @Column(
        {
            type: 'timestamp',
        }
    )
    cvDateCreate: Date

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    cvState: string
}