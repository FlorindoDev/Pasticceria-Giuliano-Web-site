import { WebBookErrorStripe } from "../utils/error/index.js";
import { stripe } from "../controllers/PaymentController.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export function WebBookAuthentication(req, res, next) {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        req.eventWebBook = event;
        next();
    } catch (err) {
        next(new WebBookErrorStripe(err.message));
    }


}