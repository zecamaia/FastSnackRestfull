const { Product, Order, OrderProduct } = require('../../models');

class OrderController {
    async createOrder(req, res) {
        try {
            const { user_id, products } = req.body;
            let total = 0;
            for (const product of products) {
                const foundProduct = await Product.findByPk(product.product_id);
                if (foundProduct) {
                    total += foundProduct.price * product.quantity;
                }
            }
            const order = await Order.create({ user_id, total });
            for (const product of products) {
                const foundProduct = await Product.findByPk(product.product_id);
                if (foundProduct) {
                    await OrderProduct.create({
                        order_id: order.id,
                        product_id: product.product_id,
                        quantity: product.quantity,
                        unit_price: foundProduct.price
                    });
                }
            }

            return res.status(201).json({
                status: 201,
                message: "Pedido criado com sucesso.",
                order: {
                    id: order.id,
                    user_id,
                    total,
                    products
                }
            });

        } catch (error) {
            console.error("Erro ao processar o pedido", error);
            return res.status(500).json({ erro: "Erro ao criar o pedido" });
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{
                    model: Product,
                    as: 'products',
                    through: OrderProduct
                }]
            });
            res.status(200).json({ orders })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: "Erro ao listar os pedidos" });
        }
    }
    async getOrderById(req, res) {
        const { id } = req.params;
        try {
            const order = await Order.findByPk(id, {
                include: [{
                    model: Product,
                    through: OrderProduct,
                    as: "products",
                    required: false
                }]
            });

            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }

            return res.status(200).json({
                status: 200,
                order
            });
        } catch (error) {
            console.error("Erro ao obter pedido", error);
            return res.status(500).json({ erro: "Erro ao obter pedido" });
        }
    }
    async updateOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }
            const newData = order.update(req.body);
            res.status(200).json({
                status: 200,
                message: "Pedido atualizado com sucesso",
                order: {
                    id: order.id,
                    user_id: order.user_id,
                    status: order.status,
                }
            })
        } catch (error) {
            console.error("Erro ao ediar pedido", error);
            return res.status(500).json({ erro: "Erro ao editar pedido" });
        }
    }
    async deleteOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ erro: "Pedido não encontrado" });
            }
            await order.destroy();
            res.status(200).json({ message: "Deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar pedido", error);
            return res.status(500).json({ erro: "Erro ao deletar pedido" });
        }
    }
}


module.exports = new OrderController();