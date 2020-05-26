import User from '../models/User';
import Segment from '../models/Segment';

class SegmentController {
  async index(req, res) {
    // const isMidas = await User.findOne({
    //   where: { id: req.userId, admin: true },
    // });

    // if (!isMidas) {
    //   return res.status(400).json({ error: 'Not found' });
    // }

    const segment = await Segment.findAll();

    return res.json(segment);
  }

  async store(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(400).json({ error: 'Not found' });
    }

    const { segment, description } = req.body;

    const segmentCreate = await Segment.create({
      segment,
      description,
    });

    return res.json(segmentCreate);
  }

  async update(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(400).json({ error: 'Not found' });
    }

    const { id, segment, description } = req.body;

    const segmentUpdate = await Segment.findByPk(id);

    if (!segmentUpdate) {
      return res.status(400).json({ error: 'Sigment not exists' });
    }

    await segmentUpdate.update({
      segment,
      description,
    });

    return res.json(segmentUpdate);
  }

  async delete(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(400).json({ error: 'Not found' });
    }

    const { id } = req.params;

    const segment = await Segment.findByPk(id);

    if (!segment) {
      return res.status(400).json({ error: 'Sigment not exists' });
    }

    await segment.destroy();

    return res.json(segment);
  }
}

export default new SegmentController();
