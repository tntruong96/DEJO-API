import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { concatMap, map, Observable, pipe, tap } from "rxjs";
import { ImageService } from "src/modules/image/image.service";


export class TransformBlogRespone implements NestInterceptor{

    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next.handle().pipe(      
            tap((value) => console.log(value)),
        )
    }

}