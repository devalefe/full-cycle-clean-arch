import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 100);
const product2 = ProductFactory.create("b", "Product B", 200);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0]).toEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price
    });

    expect(output.products[1]).toEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price
    });
  });
});
