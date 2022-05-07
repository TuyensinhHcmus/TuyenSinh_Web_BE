import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("unverifyuser")
export class unverifyuser {
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
            length: 12,
        }
    )
    userPhone: string

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    userEmail: string

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
            length: 17
        }
    )
    userSecret: string

    @Column(
        {
            type: 'varchar',
            length: 255
        }
    )
    userContactAddress: string
}