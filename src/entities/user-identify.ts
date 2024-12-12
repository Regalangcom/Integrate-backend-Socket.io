import { BaseEntity, 
        Column, 
        CreateDateColumn, 
        Entity, 
        PrimaryGeneratedColumn, 
        UpdateDateColumn } from "typeorm"



@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable : false})
    name!: string

    @Column({nullable : false})
    email!: string

    @Column({nullable : false})
    password!: string

    // @Column({nullable : false})
    // confirmPassword!: string

    @Column({nullable : false})
    image!: string  

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updated!: Date
}