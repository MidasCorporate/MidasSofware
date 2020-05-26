import Sequelize, { Model } from 'sequelize';

class RequestBudget extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        status: Sequelize.STRING,
        request: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'client_id',
      as: 'client',
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_req_id',
      as: 'fileRequest',
    });
    this.belongsTo(models.Segment, {
      foreignKey: 'segment_id',
      as: 'category',
    });
  }
}

export default RequestBudget;
