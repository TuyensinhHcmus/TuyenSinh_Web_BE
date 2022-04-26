// schoolinforId int(10) UN AI PK 
// schoolinforIntroduction text 
// schoolinforProfessor int(10) UN 
// schoolinforAssociateProfessor int(10) UN 
// schoolinforMaster int(10) UN 
// schoolinforDoctor int(10) UN 
// schoolinforMasterMajor int(10) UN 
// schoolinforDoctorMajor int(10) UN 
// schoolinforBachelorMajor int(10) UN 
// schoolinforVideoLink text 
// schoolinforImages text

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schoolinfor")
export class schoolinfo {
    @PrimaryGeneratedColumn(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforId: number

    @Column(
        {
            type: 'text',
        }
    )
    schoolinforIntroduction: string

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforProfessor: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforAssociateProfessor: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforMaster: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforDoctor: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforMasterMajor: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforDoctorMajor: number

    @Column(
        {
        type: 'int',
        unsigned: true,
    })
    schoolinforBachelorMajor: number

    @Column(
        {
            type: 'text',
        }
    )
    schoolinforVideoLink: string

    @Column(
        {
            type: 'text',
        }
    )
    schoolinforImages: string


    @Column(
        {
            type: 'text',
        }
    )
    schoolinfoBenchmarkImage: string
    
}