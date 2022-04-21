import { Column, Entity } from "typeorm";

@Entity("typeprogrammethod")
export class typeProgramMethod {

    @Column({
        type: 'char',
        length: 5,
        primary: true
    })
    methodId: string

    @Column({
        type: 'char',
        length: 15,
        primary: true
    })
    typeProgramId: string
}