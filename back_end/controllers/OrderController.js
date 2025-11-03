
import { Ordine } from "../models/DataBase.js";
import { CartItemController } from "./CartItemController.js";
import { Prodotto, User, Residenza } from "../models/DataBase.js";
import { OrderNotFoundError } from "../utils/error/index.js";

//TODO: Aggiungere svuotamento carrello

export class OrderController {

    static async createOrder(session) {
        const userId = session.metadata?.userId;
        const nota = session.metadata?.nota;
        const idCart = session.metadata?.idCart;
        const paymentIntentId = session.payment_intent;
        const totalAmount = session.amount_total;

        let ordine = await Ordine.create({
            UserIdUser: userId,
            id_pagamento: paymentIntentId,
            nota_spedizione: nota,
            costo: totalAmount / 100

        })

        OrderController.AddProductOnOrdineProdotto(idCart, ordine);



    }

    static async AddProductOnOrdineProdotto(idCart, ordine) {

        let items = await CartItemController.getItem(idCart).then((val) => { return val });

        for (const item of items) {
            const prodotto = item.dataValues.Prodotto.dataValues;

            await ordine.addProdotto(prodotto.idProdotto, {
                through: {
                    quantity: item.dataValues.quantity,
                    costo: prodotto.costo,
                    peso: prodotto.peso
                }
            });
        }
    }

    static async getOrder(idUser, filters = {}) {

        filters.UserIdUser = idUser;
        let result = await Ordine.findAll({
            where: filters,
            include: [
                {
                    model: Prodotto,
                    attributes: ["nome", "tag"]
                },
                {
                    model: User,
                    attributes: ["idUser"],
                    include: [
                        {
                            model: Residenza
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (!result || result.length === 0) {
            throw new OrderNotFoundError();
        }

        return result;
    }

}
