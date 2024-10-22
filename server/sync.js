const sequelize = require('./src/config/database');

const User = require('./src/models/User');
const Evento = require('./src/models/Evento');
const Produto = require('./src/models/Produto');

Produto.belongsTo(Evento, {
    foreignKey: 'evento_id',
    as: 'evento'
});

Evento.hasMany(Produto, {
    foreignKey: 'evento_id',
    as: 'produtos'
});

Evento.belongsTo(User, {
    foreignKey: 'organizador_id',
    as: 'organizador'
});

User.hasMany(Evento, {
    foreignKey: 'organizador_id',
    as: 'organizador'
})


sequelize.sync({ alter: true })  
    .then(() => {
        console.log("Banco de dados sincronizado com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco de dados: ", error);
    });
