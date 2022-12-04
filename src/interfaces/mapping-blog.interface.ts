export interface IMappingBlogData<P,R>{
    singleMap: (blogData: P) => Promise<R>
    multipleMap: (blogData: P[]) => Promise<R[]>
}


export interface IMappingProductData<P, R>{
    multipleMap: (products: P[]) => Promise<R[]>;
    singleMap: (product: P) => Promise<R>;
}