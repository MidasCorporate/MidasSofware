import User from '../models/User';
import ResponseBudget from '../models/ResponseBudget';
import File from '../models/File';
import Segment from '../models/Segment';
import Notification from '../schemas/Notification';
import RequestBudget from '../models/RequestBudget';

class OrderResponseController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is admin' });
    }
    const { request_id } = req.query;

    const haveRequest = await RequestBudget.findOne({
      where: { id: request_id },
    });

    if (!haveRequest) {
      return res.status(400).json({ error: 'Request budget are not exist' });
    }

    const order = await ResponseBudget.findAll({
      where: { request_id },
      attributes: ['id', 'status', 'response', 'created_at'],
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'name', 'email', 'created_at'],
          include: [
            {
              model: Segment,
              as: 'category',
              attributes: ['id', 'segment', 'description', 'img'],
            },
          ],
        },
        {
          model: File,
          as: 'fileResponse',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: RequestBudget,
          as: 'request',
          attributes: ['id', 'request', 'status'],
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

    const { request_id, admin_id, status, response, file_res_id } = req.body;

    const haveRequest = await RequestBudget.findByPk(request_id);

    if (!haveRequest) {
      return res.status(400).json({ error: 'Request budget not exists' });
    }

    const createResponse = await ResponseBudget.create({
      request_id,
      admin_id,
      status,
      response,
      file_res_id,
    });

    const user = await User.findByPk(req.userId);
    await Notification.create({
      content: `Novo pedido de compras de ${user.name}`,
    });

    return res.json(createResponse);
  }

  async update(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { response_id, status, response, file_res_id } = req.body;

    const haveResponse = await ResponseBudget.findByPk(response_id);

    await haveResponse.update({
      status,
      response,
      file_res_id,
    });

    return res.json(haveResponse);
  }

  async delete(req, res) {
    const { response_id, newStatus } = req.params;

    const haveResponse = await ResponseBudget.findByPk(response_id);

    if (!haveResponse) {
      return res.status(401).json({ error: 'ResponseBudget not exist' });
    }

    await haveResponse.update({
      status: newStatus,
    });

    return res.json(haveResponse);
  }
}

export default new OrderResponseController();
