import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe('Test list product use case', () => {
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

  it('Should list a product', async () => {
    const productRepository = new ProductRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const product1 = new Product("1", "Product A", 100);
    const product2 = new Product("2", "Product B", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const result = await productListUseCase.execute({});

    expect(result.products[0]).toEqual({
      id: "1",
      name: "Product A",
      price: 100
    });

    expect(result.products[1]).toEqual({
      id: "2",
      name: "Product B",
      price: 200
    });
  });
});
