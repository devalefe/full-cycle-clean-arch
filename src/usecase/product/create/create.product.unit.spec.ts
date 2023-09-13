import CreateProductUseCase from "./create.product.usecase";

const input = {
  id: "1",
  type: "a",
  name: "Product 1",
  price: 100,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('Should create a product', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  });
});
