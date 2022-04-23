import { Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();
const baseProduct: Product = {
  name: 'Ps5',
  price: 400,
};
let product: Product;
describe('Testing Model: Product', () => {
  it('Must have a create method', () => {
    expect(productModel.create).toBeDefined();
  });
  it('Testing the create method with a product', async () => {
    product = await productModel.create(baseProduct);
    expect(product).toEqual(
      jasmine.objectContaining({
        name: baseProduct.name,
        price: baseProduct.price.toString(),
      })
    );
  });
  it('Must have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('Testing the index model to include the product', async () => {
    const products = await productModel.index();
    expect(products[0].name).toEqual(baseProduct.name);
    expect(Number(products[0].price)).toEqual(baseProduct.price);
  });

  it('Must have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('Testing the show model to return the product with id', async () => {
    const foundProduct = await productModel.show(product.id as number);
    expect(foundProduct).toEqual(product);
  });
});
