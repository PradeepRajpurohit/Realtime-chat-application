import { Sequelize } from 'sequelize';

const db = new Sequelize('chat application', 'postgres', 'pradeep123', {
    host: 'localhost',
    dialect: 'postgres'
});

// const connectToDb = async () => {
//     try {
//         await db.authenticate();
//         console.log("connection establish")
//     } catch (error) {
//         console.log(error);
//     }
// }



export default db;