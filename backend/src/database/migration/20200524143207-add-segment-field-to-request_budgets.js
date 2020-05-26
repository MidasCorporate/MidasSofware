module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('request_budgets', 'segment_id', {
      type: Sequelize.INTEGER,
      references: { model: 'segments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('request_budgets', 'segment_id');
  },
};
