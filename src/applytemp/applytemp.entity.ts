import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("applytemp")
export class applytemp {
    @Column({
        type: 'char',
        length: 36,
        primary: true,
        nullable: false
    })
    applyTempId: string
   
    @Column({
        type: 'char',
        length: 36,
    })
    applyTempUserId: string

    @Column({
        type: 'char',
        length: 20,
    })
    applyTempMajorId: string

    @Column({
        type: 'float',
    })
    applyTempTotalScore: number
}