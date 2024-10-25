const Categoria = require("../models/Categoria");

class CategoriaController {
    async store(req, res) {
        try {
            const novaCategoria = req.body;
            const { nome, descricao, evento_id } = novaCategoria;
            const categoria = await Categoria.create({
                nome,
                descricao,
                evento_id
            });
            res.status(201).json({ categoria });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao criar categoria" })
            console.error(error)
        }
    }
    async index(req, res) {
        try {
            const categorias = await Categoria.findAll();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar as categorias." });
            console.error(error)
        }
    }
    async show(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao mostrar a categorias." });
            console.error(error)
        }
    }
    async update(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            const categoriaEditada = await categoria.update(req.body);
            const { nome, descricao, evento_id } = categoriaEditada;
            res.status(200).json({ nome, descricao, evento_id });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao editar a categorias." });
            console.error(error)
        }
    }
    async delete(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            await categoria.destroy();
            res.status(200).json({ message: "Categoria deletada com sucesso." });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao deletar a categorias." });
            console.error(error)
        }
    }
}

module.exports = new CategoriaController();