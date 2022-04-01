export interface IMappingBlogData<P,R>{
    singleMap: (blogData: P) => Promise<R>
    multipleMap: (blogData: P[]) => Promise<R[]>
}