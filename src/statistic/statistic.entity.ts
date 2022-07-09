//statisticYear` int unsigned NOT NULL,
//statisticMonth` int unsigned NOT NULL,
//statisticAccessTime` int unsigned DEFAULT NULL,
//statisticNumberNews` int unsigned DEFAULT NULL,
//statisticNumberNewUser` int unsigned DEFAULT NULL,
//statisticNumberCv` int unsigned DEFAULT NULL,

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("statistic")
export class statisticRepo {
  @PrimaryGeneratedColumn(
    {
      type: 'int',
      unsigned: true,
    }
  )
  id: number


  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticYear: number

  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticMonth: number

  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticApplyTemp: number

  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticNumberNews: number
  
  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticNumberNewUser: number

  @Column(
    {
      type: 'int',
      unsigned: true,
    })
  statisticNumberCv: number


}