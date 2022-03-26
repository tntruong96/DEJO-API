import { IEntity } from "src/interfaces/entity.interface";

export const beforeInsert = <T extends IEntity >(entity: T): void => {
    const now = new Date();
    entity.createdAt = now;
    entity.updatedAt = now;
}


export const beforeUpdate = <T extends IEntity> (entity: T): void => {
    const now = new Date();
    entity.updatedAt = now;
}