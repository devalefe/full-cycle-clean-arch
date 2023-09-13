import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/product.interface";
// import Product from "../entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
