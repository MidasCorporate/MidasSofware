import User from '../models/User';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async store(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const product = await Product.create(req.body);

    return res.json(product);
  }

  async update(req, res) {
    return res.json();
  }
}

export default new ProductController();
