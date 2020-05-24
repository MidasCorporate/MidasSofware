module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'segment_id', {
      type: Sequelize.INTEGER,
      references: { model: 'segments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'segment_id');
  },
};
