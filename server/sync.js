const sequelize = require('./src/config/database');
//chamar as models
const User = require('./src/models/User');
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
}).catch((error) => {
    console.error("Erro ao sincronizar o banco de dados: ", error)
});