// for json config file run migration
npx sequelize-cli migration:generate --name addColumnUsers  ---- for create migration
npx sequelize-cli db:migrate -- for run migration
npx sequelize-auto -h localhost -d healthray -T SequelizeMeta -u root -x -e mysql -- auto generate models
npx sequelize-auto -h 192.168.0.163 -p -d healthray_stage -T SequelizeMeta -u healthray -x -e mysql -- auto generate models**
npx sequelize-auto -h 45.118.163.206 -p -d healthray_stage -T SequelizeMeta -u office_local -x -e mysql --auto generate models stage**

// run migration
npx sequelize-cli db:migrate --name your-migration-file-name

//Undo migration
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js


// for js config file run migration
//npx sequelize-cli migration:generate --url 'mysql://pankaj:password@127.0.0.1/sequelize'  --name addUserTypeColumn 

// npx sequelize-cli db:migrate --url 'mysql://pankaj:password@127.0.0.1/sequelize' --name "20230703055841-addUserTypeColumn.js"

//npx sequelize-cli db:migrate --url 'mysql://pankaj:password@127.0.0.1/sequelize' --name "20230703055841-addUserTypeColumn.js"


example
npx sequelize-cli db:migrate --url 'mysql://avnadmin:AVNS_PaKu6Dy59EuKqjYr-z7@mysql-403c26a-raushanmanojkumar-fbe4.a.aivencloud.com:27495/defaultdb' --name "20240319060240-create-addresses.js"
npx sequelize-cli db:migrate:undo --name "20240319060240-create-addresses.js" --url 'mysql://avnadmin:AVNS_PaKu6Dy59EuKqjYr-z7@mysql-403c26a-raushanmanojkumar-fbe4.a.aivencloud.com:27495/defaultdb'


npx sequelize-cli db:migrate --url 'mysql://avnadmin:AVNS_PaKu6Dy59EuKqjYr-z7@mysql-403c26a-raushanmanojkumar-fbe4.a.aivencloud.com:27495/defaultdb' --name "20240319045942-create-user.js"