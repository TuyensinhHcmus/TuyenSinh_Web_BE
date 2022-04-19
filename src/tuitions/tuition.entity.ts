import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tuition")
export class tuition {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    tuitionId: number

    @Column({
        type: 'text',
    })
    tuitionContent: string
}