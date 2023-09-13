import Product from "../entity/product";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  public static create(
    name: string,
    price: number
  ): Product {
    return new Product(uuid(), name, price);
  }
}
