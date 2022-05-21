sequelize-cli db:migrate
sequelize-cli db:seed:all
sequelize-cli db:migrate:undo --name 20220421110332-create-movie.js
nodemon src/index.js  
