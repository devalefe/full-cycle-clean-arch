type Product = {
  id: string;
  name: string;
  price: number;
}

export interface InputListProductDto {}

export interface OutputListProductDto {
  products: Product[];
}
