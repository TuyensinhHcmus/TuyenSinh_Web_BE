import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cvapplyinformation")
export class cvapplyinformation {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    cvaiId: number

    @Column(
        {
            type: 'varchar',
            length: 100,
        }
    )
    cvaiGraduateUniversity: string

    @Column(
        {
            type: 'float',
            unsigned: true
        }
    )
    cvaiUniversityGPA: number

    @Column(
        {
            type: 'year',
        }
    )
    cvaiUniversityGraduateYear: number

    @Column(
        {
            type: 'varchar',
            length: 100,
        }
    )
    cvaiGraduateCollege: string

    @Column(
        {
            type: 'float',
            unsigned: true
        }
    )
    cvaiCollegeGPA: number

    @Column(
        {
            type: 'year',
        }
    )
    cvaiCollegeGraduateYear: number

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    cvaiPriorityArea: string

    @Column(
        { 
            type: 'float',
            unsigned: true
        }
    )
    cvaiGPA12: number

    @Column(
        {
            type: 'float',
            unsigned: true
        }
    )
    cvaiGPA11: number

    @Column(
        {
            type: 'float',
            unsigned: true
        }
    )
    cvaiGPA10: number

    @Column(
        {
            type: 'year',
        }
    )
    cvaiHighSchoolGraduateYear: number

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiCapacity12: string

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiConduct12: string

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiCapacity11: string

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiConduct11: string

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiCapacity10: string

    @Column(
        {
            type: 'varchar',
            length: 15,
        }
    )
    cvaiConduct10: string

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    cvaiProvincialExcellentSubject: string

    @Column(
        {
            type: 'year',
        }
    )
    cvaiProvincialExcellentYear: number

    @Column(
        {
            type: 'varchar',
            length: 50,
        }
    )
    cvaiProvincialExcellentAward: string

    @Column(
        {
            type: 'float',
        }
    )
    cvaiIeltsCertificateScore: number

    @Column(
        {
            type: 'date',
        }
    )
    cvaiIeltsCertificateExpiration: Date

    @Column(
        {
            type: 'int',
            unsigned: true
        }
    )
    cvaiToeflCertificateScore: number

    @Column(
        {
            type: 'date',
        }
    )
    cvaiToeflCertificateExpiration: Date

    @Column(
        {
            type: 'tinyint',
        }
    )
    cvaiHaveVietnameseCertificate: number

    @Column(
        {
            type: 'char',
            length: 10,
        }
    )
    cvaiVietnameseCertificateLevel: string
}