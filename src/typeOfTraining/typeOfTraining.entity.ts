// methodId char(5) PK 
// methodName text 
// methodContent text 
// methodImage text 
// methodParentId char(5)

import { Column, Entity, Timestamp } from "typeorm";

@Entity("typeoftraining")
export class typeoftraining {
    @Column({
        type: 'char',
        length: 4,
        primary: true,
    })
    typeOfTrainingId: string

    @Column(
        {
            type: 'varchar',
            length: 35
        }
    )
    typeOfTrainingName: string

    @Column({
        type: 'text',
    })
    typeOfTrainingDescription: string

}