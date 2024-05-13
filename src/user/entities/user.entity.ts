import { Department } from 'src/department/entities/department.entity'
import { Role } from 'src/role/entities/role.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ nullable: true })
  realname: string

  @Column()
  password: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date

  @ManyToOne(() => Department, (department) => department.users)
  @JoinColumn()
  department: Department

  @ManyToMany(() => Role, (roles) => roles.users)
  roles: Role[]
}
