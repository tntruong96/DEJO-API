import { beforeInsert, beforeUpdate } from "../..//utils/entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../blog/blog.entity";
import { User } from "../user/user.entity";

@Entity("comments")
export class CommentEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => BlogEntity)
    @JoinColumn({name: "blogId",referencedColumnName: "id"})
    blogId: BlogEntity;

    @OneToOne(() => User)
    @JoinColumn({name: "createdBy", referencedColumnName:"id"})
    createdBy: User

    @BeforeInsert()
    onBeforeInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onBeforeUpdate(){
        beforeUpdate(this);
    }
}