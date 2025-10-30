import { PaymentController } from "../controllers/PaymentController.js";
import { WebBookAuthentication } from "../middleware/Payment.middlewares.js";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js";
import bodyParser from 'body-parser';
import express from "express";

export const router = express.Router();

/**
 * @swagger
 * {
 *   "/users/{id}/checkout-session": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "[Interno] Crea una sessione di pagamento Stripe",
 *       "description": "Endpoint interno usato dal server per creare una sessione di pagamento su Stripe. Restituisce la URL di Checkout. Non deve essere chiamato direttamente tramite Swagger o da utenti esterni.",
 *       "operationId": "createCheckoutSessionInternal",
 *       "responses": {
 *         "200": {
 *           "description": "Restituisce la URL della sessione di pagamento",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "url": "https://checkout.stripe.com/c/pay/cs_test_123456"
 *               }
 *             }
 *           }
 *         },
 *         "403": {
 *           "description": "Accesso non autorizzato o utente non proprietario"
 *         }
 *       },
 *       "x-internal": true
 *     }
 *   }
 * }
 */
router.post('/:id/checkout-session', express.json(), enforceAuthentication, isOwnProfile, async (req, res) => {

    PaymentController.createSessionCheckOut(req.idUser, req.email_in_token).then((session) => {
        res.status(303).json({ url: session.url });
    })

});

/**
 * @swagger
 * {
 *   "/users/checkout-success": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "[Interno] Webhook Stripe per conferma pagamento",
 *       "description": "Endpoint chiamato automaticamente da Stripe per notificare il completamento di un pagamento. Non è accessibile o utilizzabile tramite Swagger UI.",
 *       "operationId": "stripeWebhookPaymentSuccess",
 *       "responses": {
 *         "200": {
 *           "description": "Webhook ricevuto correttamente"
 *         },
 *         "400": {
 *           "description": "Firma non valida o payload non conforme"
 *         }
 *       },
 *       "x-internal": true
 *     }
 *   }
 * }
 */
router.post('/checkout-success', bodyParser.raw({ type: 'application/json' }), WebBookAuthentication, (req, res) => {

    if (req.eventWebBook.type === 'checkout.session.completed') {
        //const session = req.eventWebBook.data.object;

        //const userId = session.metadata?.userId;
        //const sessionId = session.id;
        // const paymentIntentId = session.payment_intent;
        console.log("grande coglione");

    }

    res.json({ received: true });
}
);