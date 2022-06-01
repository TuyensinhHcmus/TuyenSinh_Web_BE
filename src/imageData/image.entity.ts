// imageId int(10) UN AI PK 
// imagePath text 
// imageTypeOfTrainingId char(4) 
// imageType varchar(20) 
// imageStartDate datetime 
// imageEndDate datetime


import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("image")
export class imageData {

    @PrimaryGeneratedColumn(
        {
            type: 'int',
            unsigned: true,
        }
    )
    imageId: number


    @Column({
        type: 'text'
    })
    imagePath: string


    @Column(
        {
            type: 'varchar',
            length: 20
        }
    )
    imageType: string

    @Column(
        {
            type: 'varchar',
            length: 5
        }
    )
    imageTypeOfTrainingId: string

    @Column(
        {
            type: 'timestamp',
        }
    )
    imageStartDate: Timestamp


    @Column(
        {
            type: 'timestamp',
        }
    )
    imageEndDate: Timestamp
}