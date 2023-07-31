migrate:
	npx sequelize-cli db:migrate:undo:all
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all
	nodemon

undoTables: 
	npx sequelize-cli db:migrate:undo:all

createTables:
	npx sequelize-cli db:migrate

seedTables: 
	npx sequelize-cli db:seed:all

createDatabase: 
	npx sequelize-cli db:create

dropDatabase: 
	npx sequelize-cli db:drop

gitInit:
	git init

gitAdd:
	git add .

pushDevelopment:
	git push origin development