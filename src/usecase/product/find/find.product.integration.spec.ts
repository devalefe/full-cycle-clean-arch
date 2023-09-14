import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe('Test find product use case', () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should find a product', async () => {
    const productRepository = new ProductRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    const product = new Product("1", "Product A", 100);

    await productRepository.create(product);

    const input = { id: "1" };

    const result = await productFindUseCase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "Product A",
      price: 100
    });
  });
});
