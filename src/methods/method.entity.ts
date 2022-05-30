// methodId char(5) PK 
// methodName text 
// methodContent text 
// methodImage text 
// methodParentId char(5)

import { major } from "src/majors/major.entity";
import { Column, Entity, JoinTable, ManyToMany, Timestamp } from "typeorm";

@Entity("method")
export class method {
    @Column({
        type: 'char',
        length: 5,
        primary: true,
    })
    methodId: string

    @Column(
        {
            type: 'text',
        }
    )
    methodName: string

    @Column({
        type: 'text',
    })
    methodContent: string

    @Column(
        {
            type: 'text',
        }
    )
    methodImage: string

    @Column({
        type: 'char',
        length: 5,
    })
    methodParentId: string

    @Column({
        type: 'timestamp',
    })
    methodDateStart: Timestamp

    @Column({
        type: 'timestamp',
    })
    methodDateEnd: Timestamp

    @Column({
        type: 'char',
        length: 4,
    })
    methodTypeOfTrainingID: string

    @ManyToMany(() => major)
    @JoinTable()
    major: major[];

    @Column({
        type: 'varchar',
        length: 100,
    })
    methodTarget: string

    @Column({
        type: 'text',
    })
    methodObject: string
}