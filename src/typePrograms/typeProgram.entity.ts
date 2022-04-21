import { Column, Entity } from "typeorm";

@Entity("typeprogram")
export class typeProgram {

    @Column({
        type: 'char',
        length: 15,
        primary: true
    })
    typeProgramId: string

    @Column({
        type: 'varchar',
        length: 50,
    })
    typeProgramName: string
}