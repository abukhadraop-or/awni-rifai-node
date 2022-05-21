module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookUser', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      BookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BookUser');
  },
};
