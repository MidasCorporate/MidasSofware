import Sequelize, { Model } from 'sequelize';

class ResponseBudget extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        response: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.RequestBudget, {
      foreignKey: 'request_id',
      as: 'request',
    });
    this.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admin',
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_res_id',
      as: 'fileResponse',
    });
  }
}

export default ResponseBudget;
