import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        status: Sequelize.STRING,
        request: Sequelize.STRING,
        response: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'products',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_req_id',
      as: 'fileRequest',
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_res_id',
      as: 'fileResponse',
    });
  }
}

export default Order;
