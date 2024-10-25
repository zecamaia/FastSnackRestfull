const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ingresso = sequelize.define('Ingresso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Eventos',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    },
    data_inscricao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tipo_ingresso: {
        type: DataTypes.ENUM('meia', 'inteira'),
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('confirmado', 'pendente', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    },
}, {
    timestamps: true
});


module.exports = Ingresso;