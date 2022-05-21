const users = [];
// generate users
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 40; i++) {
  users.push({
    username: `John Doe${i}`,
    email: `awni@gmail.com${i}`,
    password: 'awni@2020',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Authors', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
