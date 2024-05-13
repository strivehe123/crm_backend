import { Role } from 'src/role/entities/role.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  type: number

  @Column({ nullable: true })
  url: string

  @Column({ nullable: true })
  icon: string

  @Column({ nullable: true })
  sort: number

  @ManyToOne(() => Menu, (menu) => menu.children)
  @JoinColumn()
  parent: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[]
  @Column({ nullable: true })
  permission: string

  @ManyToMany(() => Role, (role) => role.menus)
  @JoinTable({ name: 'menu_role' })
  roles: Role[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date
}
