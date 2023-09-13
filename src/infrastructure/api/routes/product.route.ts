import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productCreateUseCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productCreateDto = {
      name: req.body.name,
      price: req.body.price
    }

    const output = await productCreateUseCase.execute(productCreateDto);
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const productListUseCase = new ListProductUseCase(new ProductRepository());
  const output = await productListUseCase.execute({});

  res.status(200).send(output);
});
