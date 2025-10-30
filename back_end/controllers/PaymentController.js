import { Stripe } from "stripe";
import { CartController } from "./CartController.js";
import { CartItemController } from "./CartItemController.js";

export const stripe = new Stripe(process.env.STRIPE_TOKEN);

export class PaymentController {

    static async createSessionCheckOut(idUser, email) {
        let items = await PaymentController.createItem(idUser);
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: items,
            mode: 'payment',
            success_url: `https://www.google.com`,
            cancel_url: `${process.env.END_POINT_ALLOWED}/cart`,
            metadata: {
                userId: idUser.toString(),

            },
        });

        return session;

    }

    static async createItem(idUser) {

        let paymentItem = [];

        let cart = await CartController.getCartByUser(idUser).then((val) => { return val });
        let items = await CartItemController.getItem(cart.dataValues.idCart).then((val) => { return val });

        items.forEach(item => {
            let object_item = {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.dataValues.Prodotto.dataValues.nome,
                    },
                    unit_amount: Math.round(item.dataValues.Prodotto.dataValues.costo * 100),
                },
                quantity: item.dataValues.quantity,
            }
            paymentItem.push(object_item);

        });

        return paymentItem;
    }

}
