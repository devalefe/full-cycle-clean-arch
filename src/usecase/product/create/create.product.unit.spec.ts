import CreateProductUseCase from "./create.product.usecase";

const input = {
  id: "1",
  name: "Product A",
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

  it("should thrown an error if invalid name is provided", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";
    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error if invalid price is provided", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "Product A";
    input.price = -1;
    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
