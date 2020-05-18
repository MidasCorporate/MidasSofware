module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('products', 'category');
  },
};
