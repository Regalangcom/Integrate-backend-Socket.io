import { BaseEntity, 
        Column, 
        CreateDateColumn, 
        Entity, 
        PrimaryGeneratedColumn, 
        UpdateDateColumn } from "typeorm"



@Entity("message")
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable : false , type : 'text'})
    message!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updated!: Date
}