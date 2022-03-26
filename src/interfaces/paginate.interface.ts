import { BlogResponseDTO } from "src/modules/blog/blog.dto";

export interface PaginateResponse <T>{
    items: T[],
    total: number
}