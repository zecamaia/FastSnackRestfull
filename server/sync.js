const sequelize = require('./src/config/database');

const User = require('./src/models/User');
const Evento = require('./src/models/Evento');
const Produto = require('./src/models/Produto');
const Categoria = require('./src/models/Categoria');


Categoria.hasMany(Produto, {
    foreignKey: 'categoria_id',
    as: 'categoria'
})

Categoria.belongsTo(Evento, {
    foreignKey: 'evento_id',
    as: 'evento'
});

Produto.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria'
})

Evento.hasMany(Categoria, {
    foreignKey: 'evento_id',
    as: 'categorias'
});

Evento.belongsTo(User, {
    foreignKey: 'organizador_id',
    as: 'organizador'
});

User.hasMany(Evento, {
    foreignKey: 'organizador_id',
    as: 'organizador'
})


sequelize.sync({ force: true })
    .then(() => {
        console.log("Banco de dados sincronizado com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco de dados: ", error);
    });
