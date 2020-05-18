import { Op } from 'sequelize';
import Product from '../models/Product';
import File from '../models/File';

class ProductFilterController {
  async index(req, res) {
    const { name } = req.query;

    const product = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: name ? `%${name}%` : '%%',
        },
      },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(product);
  }
}

export default new ProductFilterController();
