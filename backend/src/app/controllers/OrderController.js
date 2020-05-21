import User from '../models/User';
import Order from '../models/Order';
import Product from '../models/Product';
import File from '../models/File';
import Notification from '../schemas/Notification';

class OderController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const order = await Order.findAll({
      attributes: ['id', 'amount', 'status'],
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'description', 'price', 'active'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(order);
  }

  async store(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { user_id, product_id, amount, status } = req.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exist!' });
    }

    const order = await Order.create({
      user_id,
      product_id,
      amount,
      status,
    });

    const user = await User.findByPk(req.userId);
    await Notification.create({
      content: `Novo pedido de compras de ${user.name}`,
    });

    return res.json(order);
  }

  async update(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { id, user_id, product_id, amount, status } = req.body;

    const order = await Order.findByPk(id);

    await order.update(req.body);

    return res.json({
      id,
      user_id,
      product_id,
      amount,
      status,
    });
  }

  async delete(req, res) {
    const { id, newStatus } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ error: 'Order not exist' });
    }

    await order.update({
      status: newStatus,
    });

    return res.json(order);
  }
}

export default new OderController();
