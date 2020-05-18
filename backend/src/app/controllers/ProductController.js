import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async store(req, res) {
    // const { image_id, name, description, price } = req.body;

    const product = await Product.create(req.body);

    return res.json(product);
  }
}

export default new ProductController();
