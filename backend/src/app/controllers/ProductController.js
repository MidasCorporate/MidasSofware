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

    const { image_id, name, description, price } = req.body;

    const product = await Product.create({
      image_id,
      name,
      description,
      price,
    });

    return res.json(product);
  }

  async update(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { id, image_id, name, description, price } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(401).json({ error: 'Product not exist' });
    }

    await product.update({
      image_id,
      name,
      description,
      price,
    });

    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(401).json({ error: 'Product not exist' });
    }

    await product.update({
      active: false,
    });

    return res.json(product);
  }
}

export default new ProductController();
