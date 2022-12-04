import { beforeInsert, beforeUpdate } from "../../utils/entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('campaign')
export class CampaignEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    slug: string

    @Column()
    items: string

    @Column()
    thumbnail: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @BeforeInsert()
    onInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onUpdate(){
        beforeUpdate(this);
    }
}
