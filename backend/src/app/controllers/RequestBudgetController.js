import User from '../models/User';
import RequestBudget from '../models/RequestBudget';
import File from '../models/File';
import Segment from '../models/Segment';
import Notification from '../schemas/Notification';

class OrderRequestController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { segment_id } = req.query;

    const listBudgets = await RequestBudget.findAll({
      where: { segment_id },
      attributes: ['id', 'amount', 'status', 'request', 'created_at'],
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'fileRequest',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Segment,
          as: 'category',
          attributes: ['id', 'segment'],
        },
      ],
    });
    return res.json(listBudgets);
  }

  async store(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const {
      client_id,
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

    const createRequest = await RequestBudget.create({
      client_id,
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

    return res.json(createRequest);
  }

  async update(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const {
      request_id,
      amount,
      status,
      request,
      file_req_id,
      segment_id,
    } = req.body;

    const haveRequest = await RequestBudget.findByPk(request_id);

    if (!haveRequest) {
      return res.status(400).json({ error: 'RequestBudget not exists' });
    }

    const segment = await Segment.findByPk(segment_id);

    if (!segment) {
      return res.status(400).json({ error: 'Segment does not exist!' });
    }

    await haveRequest.update({
      amount,
      status,
      request,
      file_req_id,
      segment_id,
    });

    return res.json(haveRequest);
  }

  async delete(req, res) {
    const { request_id, newStatus } = req.params;

    const haveRequest = await RequestBudget.findByPk(request_id);

    if (!haveRequest) {
      return res.status(401).json({ error: 'Request not exist' });
    }

    await haveRequest.update({
      status: newStatus,
    });

    return res.json(haveRequest);
  }
}

export default new OrderRequestController();
