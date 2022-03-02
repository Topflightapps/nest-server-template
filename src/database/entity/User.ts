import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;
}