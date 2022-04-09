import { Column, Entity } from "typeorm";

@Entity("admissionsgroup")
export class AdmissionsGroup {
    @Column({
        type: 'char',
        length: 10,
        primary: true
    })
    admissionsGroupId: string

    @Column(
        {
            type: 'varchar',
            length: 50
        }
    )
    admissionsGroupName: string
}