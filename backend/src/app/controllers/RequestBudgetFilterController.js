import User from '../models/User';
import RequestBudget from '../models/RequestBudget';
import File from '../models/File';
import Segment from '../models/Segment';
// import Notification from '../schemas/Notification';

class OrderRequestFilterController {
  async index(req, res) {
    const isClient = await User.findOne({
      where: { id: req.userId },
    });

    if (!isClient) {
      return res.status(400).json({ error: 'You are not is client' });
    }

    const { client_id } = req.query;

    const listBudgets = await RequestBudget.findAll({
      where: { client_id },
      attributes: ['id', 'amount', 'status', 'request', 'created_at'],
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email', 'created_at'],
        },
        {
          model: File,
          as: 'fileRequest',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Segment,
          as: 'category',
          attributes: ['id', 'segment', 'description', 'img'],
        },
      ],
    });
    return res.json(listBudgets);
  }
}

export default new OrderRequestFilterController();
