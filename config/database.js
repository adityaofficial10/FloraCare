// const config = {
//     dialect: 'postgresql',
//     username: 'aditya',
//     host: 'rigid-koala-293.8nk.cockroachlabs.cloud',
//     port: '26257',
//     database: 'rigid-koala-293.iot',
//     password: 'Dpz62TFdElYCaK_TznIYPA',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false,
//             // For secure connection:
//             /*ca: fs.readFileSync('certs/ca.crt')
//                       .toString()*/
//         },
//         options: {
//             encrypt: true
//         }
//     },
//     logging: false
// };
const config = {
    dialect: 'postgres',
    username: 'aditya',
    host: 'free-tier6.gcp-asia-southeast1.cockroachlabs.cloud',
    port: '26257',
    database: 'rigid-koala-293.defaultdb',
    password: '5Qt12loeUaIcuhR_IQZ3qw',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            // For secure connection:
            /*ca: fs.readFileSync('certs/ca.crt')
                      .toString()*/
        },
        options: {
            encrypt: true
        }
    },
    logging: false
};

const Sequelize = require("sequelize-cockroachdb");

const DB = new Sequelize(config);

module.exports = DB;