module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'path', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn('Book', 'path');
  },
};
