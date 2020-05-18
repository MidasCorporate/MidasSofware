import User from '../models/User';
import Product from '../models/Product';
import Stock from '../models/Stock';

class StockController {
  async index(req, res) {
    await Stock.findAll();

    return res.json();
  }

  async store(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { product_id, amount } = req.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(401).json({ error: 'This product not exist' });
    }

    const stock = await Stock.create({
      product_id,
      amount,
    });

    return res.json(stock);
  }

  async update(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { id, product_id, amount } = req.body;

    const stock = await Stock.findByPk(id);

    if (!stock) {
      return res.status(401).json({ error: 'Stock not exist' });
    }

    await stock.update({
      product_id,
      amount,
    });

    return res.json(stock);
  }

  async delete(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { id } = req.params;

    const stock = await Stock.findByPk(id);

    if (!stock) {
      return res.status(401).json({ error: 'Stock not exist' });
    }

    await stock.destroy();

    return res.json(stock);
  }
}

export default new StockController();
