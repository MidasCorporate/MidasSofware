import User from '../models/User';

class OderController {
  async index(req, res) {
    const isUser = await User.findOne({
      where: { id: req.params.userId },
    });

    console.log(isUser);
    return res.json(isUser);
  }
}

export default new OderController();
