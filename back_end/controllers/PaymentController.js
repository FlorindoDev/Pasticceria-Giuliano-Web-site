import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_TOKEN);

export class PaymentController {

    static async createSessionCheckOut() {
        const session = await stripe.checkout.sessions.create({
            customer_email: 'awdawd@mammt.com',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Corso JavaScript',
                        },
                        unit_amount: 2000000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://www.google.com`,
            cancel_url: `https://www.google.com`
        });

        return session;

    }

}
