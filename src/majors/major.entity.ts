import { method } from "src/methods/method.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity("major")
export class major {
  @Column(
    {
      type: 'char',
      length: 20,
      primary: true
    }
  )
  majorId: string

  @Column({
    type: 'int',
    unsigned: true,
  })
  majorFaculty: number

  @Column({
    type: 'varchar',
    length: 255
  })
  majorName: string

  @Column(
    {
      type: 'text',
    }
  )
  majorIntroduction: string

  @Column(
    {
      type: 'text',
    }
  )
  majorImageName: string

  @Column(
    {
      type: 'int',
      unsigned: true
    }
  )
  majorTarget: number

  @Column(
    {
      type: 'char',
      length: 15
    }
  )
  majorTypeProgram: string

  @Column(
    {
      type: 'text',
    }
  )
  majorVideo: string

  @Column(
    {
      type: 'varchar',
      length: 30
    }
  )
  majorTuition: string

  @Column(
    {
      type: 'text',
    }
  )
  majorAdmissionsInfo: string

  @ManyToMany(() => method, method => method.major, { cascade: ['insert', 'update'] })
  @JoinTable()
  method: method[];
}
