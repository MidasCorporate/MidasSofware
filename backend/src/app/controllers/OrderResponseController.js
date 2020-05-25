import User from '../models/User';
import Order from '../models/Order';
// import Product from '../models/Product';
import File from '../models/File';
import Segment from '../models/Segment';
import Notification from '../schemas/Notification';

class OrderResponseController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is admin' });
    }
    const { segment_id } = req.query;

    const validationSigment = await Segment.findOne({
      where: { id: segment_id },
    });

    if (!validationSigment) {
      return res.status(400).json({ error: 'Sigment dont exist' });
    }

    const order = await Order.findAll({
      where: { segment_id },
      attributes: [
        'id',
        'amount',
        'status',
        'request',
        'response',
        'created_at',
      ],
      include: [
        // {
        //   model: Product,
        //   as: 'products',
        //   attributes: ['id', 'name', 'description', 'price', 'active'],
        //   include: [
        //     {
        //       model: File,
        //       as: 'image',
        //       attributes: ['id', 'path', 'url'],
        //     },
        //   ],
        // },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'created_at'],
          include: [
            {
              model: Segment,
              as: 'category',
              attributes: ['id', 'segment'],
            },
          ],
        },
        {
          model: File,
          as: 'fileRequest',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: File,
          as: 'fileResponse',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Segment,
          as: 'category',
          attributes: ['id', 'segment'],
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

    const {
      id,
      // user_id,
      // product_id,
      // amount,
      status,
      response,
      file_res_id,
    } = req.body;

    // const product = await Product.findByPk(product_id);

    // if (!product) {
    //   return res.status(400).json({ error: 'Product does not exist!' });
    // }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists' });
    }

    await order.update({
      status,
      response,
      file_res_id,
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

    const {
      id,
      user_id,
      product_id,
      amount,
      status,
      response,
      file_res_id,
    } = req.body;

    const order = await Order.findByPk(id);

    await order.update({
      status,
      response,
      file_res_id,
    });

    return res.json({
      id,
      user_id,
      product_id,
      amount,
      status,
      response,
      file_res_id,
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

export default new OrderResponseController();
