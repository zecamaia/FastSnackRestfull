const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define('Evento', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo'
    }
}, {
    timestamps: true
});

module.exports = Evento;
