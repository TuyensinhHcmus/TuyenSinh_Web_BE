import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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
        unsigned: true
    })
    applyTempTotalScore: number

    @Column({
        type: 'float',
        unsigned: true
    })
    applyTempScore1: number

    @Column({
        type: 'float',
        unsigned: true
    })
    applyTempScore2: number

    @Column({
        type: 'float',
        unsigned: true
    })
    applyTempScore3: number

    @Column({
        type: 'char',
        length: 5
    })
    applyTempGroupId: string

    @Column({
        type: 'timestamp',
    })
    applyTempTime: Timestamp
}