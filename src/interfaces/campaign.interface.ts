export interface IDataCreateDTO {
    name: string,
    thumbnail: string,
    items: string,
}

export interface IDataUpdateDTO {
    name: string,
    thumbnail: string,
    items: string,
}


export interface ICampaign {
    id: string,
    name: string,
    thumbnail: string,
    items?: string,
    createdAt: Date,
    updatedAt: Date,
    slug: string
}

export interface IResponseCampaign {
    campaigns: ICampaign[],
    total: number
}
