module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('segments', 'description', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('segments', 'description');
  },
};
