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
        type: 'text',
    })
    benchmarkImage: string
}