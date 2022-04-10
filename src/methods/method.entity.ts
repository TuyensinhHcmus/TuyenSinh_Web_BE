// methodId char(5) PK 
// methodName text 
// methodContent text 
// methodImage text 
// methodParentId char(5)

import { Column, Entity } from "typeorm";

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
}