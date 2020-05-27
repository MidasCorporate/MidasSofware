import User from '../models/User';
import Segment from '../models/Segment';

class SegmentController {
  async index(req, res) {
    // const isMidas = await User.findOne({
    //   where: { id: req.userId, admin: true },
    // });

    // if (!isMidas) {
    //   return res.status(401).json({ error: 'You not are administrador' });
    // }

    const segments = await Segment.findAll();

    return res.json(segments);
  }

  async store(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(401).json({ error: 'You not are administrador' });
    }

    const { segment, description, img } = req.body;

    const segmentCreate = await Segment.create({
      segment,
      description,
      img,
    });

    return res.json(segmentCreate);
  }

  async update(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(401).json({ error: 'You not are administrador' });
    }

    const { segment_id, segment, description, img } = req.body;

    const segmentUpdate = await Segment.findByPk(segment_id);

    if (!segmentUpdate) {
      return res.status(400).json({ error: 'Sigment not exists' });
    }

    await segmentUpdate.update({
      segment,
      description,
      img,
    });

    return res.json(segmentUpdate);
  }

  async delete(req, res) {
    const isMidas = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isMidas) {
      return res.status(401).json({ error: 'You not are administrador' });
    }

    const { segment_id } = req.params;

    const haveSegment = await Segment.findByPk(segment_id);

    if (!haveSegment) {
      return res.status(400).json({ error: 'Sigment not exists' });
    }

    await haveSegment.destroy();

    return res.json(haveSegment);
  }
}

export default new SegmentController();
