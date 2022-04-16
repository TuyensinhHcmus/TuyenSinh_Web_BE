import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// contactid INT (10)
// contactDepartment VARCHAR(255)
// contactRoom VARCHAR (50)
// contactAddress VARCHAR(255)
// contactPhone CHAR(35)
// contactEmail VARCHAR( 100)
// contactPage TEXT

@Entity("contact")
export class contact {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    contactId: number

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    contactDepartment: string

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    contactRoom: string

    @Column(
        {
            type: 'varchar',
            length: 255,
        }
    )
    contactAddress: string

    @Column(
        {
            type: 'char',
            length: 35,
        }
    )
    contactPhone: string

    @Column(
        {
            type: 'varchar',
            length: 100,
        }
    )
    contactEmail: string

    @Column(
        {
            type: 'text',
        }
    )
    contactPage: string
}