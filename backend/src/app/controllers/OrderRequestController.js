import User from '../models/User';
import Order from '../models/Order';
// import Product from '../models/Product';
import File from '../models/File';
import Segment from '../models/Segment';
import Notification from '../schemas/Notification';

class OrderRequestController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { user_id } = req.query;

    const order = await Order.findAll({
      where: { user_id },
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
          attributes: ['id', 'name', 'email'],
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
      user_id,
      product_id,
      amount,
      status,
      request,
      file_req_id,
      segment_id,
    } = req.body;

    const segment = await Segment.findByPk(segment_id);

    if (!segment) {
      return res.status(400).json({ error: 'Segment does not exist!' });
    }

    const order = await Order.create({
      user_id,
      product_id,
      amount,
      status,
      request,
      file_req_id,
      segment_id,
    });

    const user = await User.findByPk(req.userId);

    const notification = await Notification.create({
      content: `Novo pedido de compras de ${user.name}`,
    });

    // pessoa responsavel por receber a notificação

    const ownerSocket = req.connectedUsers[segment_id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('notification', notification);
    }

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
      request,
      file_req_id,
      segment_id,
    } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists' });
    }

    const segment = await Segment.findByPk(segment_id);

    if (!segment) {
      return res.status(400).json({ error: 'Segment does not exist!' });
    }

    await order.update({
      user_id,
      product_id,
      amount,
      status,
      request,
      file_req_id,
      segment_id,
    });

    return res.json(order);
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

export default new OrderRequestController();
