import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  // slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  // @IsNotEmpty()
  // @IsString()
  // thumbnail: string;

  @IsNotEmpty()
  @IsString()
  images: string;

  @IsString()
  @IsNotEmpty()
  sizes: string;

  @IsString()
  colors: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  discount: number
}

export class ResponeProductDTO {
  @IsNotEmpty()
  @IsString()
  id;

  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsString()
  description;

  @IsNotEmpty()
  @IsString()
  images;

  @IsNotEmpty()
  @IsString()
  sizes;

  @IsString()
  detail;

  @IsNumber()
  discount;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
