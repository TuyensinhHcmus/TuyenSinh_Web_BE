import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("benchmark")
export class benchmark {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    benchmarkId: number

    @Column({
        type: 'char',
        length: 20
    })
    benchmarkMajorId: string

    @Column({
        type: 'year',
    })
    benchmarkYear: number

    @Column({
        type: 'float',
    })
    benchmarkScore: number
}