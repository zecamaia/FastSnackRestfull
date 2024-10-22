const Produto = require("../models/Produto");

class ProdutoController {
    async store(req, res) {
        try {
            const novoProduto = req.body;
            const { nome, preco, quantidade, imagem, status, evento_id } = novoProduto;
            const produto = await Produto.create({
                nome,
                preco,
                quantidade,
                imagem,
                status,
                evento_id
            });
            res.status(201).json({ produto });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao criar produto" });
        }
    }
    async index(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao listar os produtos" });
        }
    }
    async show(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            res.status(200).json(produto);
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao mostar o produto" });
        }
    }
    async update(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            const novosDados = await produto.update(req.body);
            const { nome, preco, quantidade, imagem, status, evento_id } = novosDados;
            res.status(200).json({ nome, preco, quantidade, imagem, status, evento_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao editar o produto" });
        }
    }
    async delete(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(500).json({ erro: "Produto não encontrado" });
            }
            await produto.destroy()
            res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao deletar produto" });
        }

    }
}

module.exports = new ProdutoController();