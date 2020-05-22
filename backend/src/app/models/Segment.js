import Sequelize, { Model } from 'sequelize';

class Segment extends Model {
  static init(sequelize) {
    super.init(
      {
        segment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Segment;
