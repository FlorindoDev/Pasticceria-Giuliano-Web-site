import express from "express";
import { enforceAuthentication, isOwnProfileQuery } from "../middleware/authorization.js"
import { getOrderSchema } from "../schemas/order.schema.js";
import { validate } from "../middleware/Middlewares.js";
import { OrderController } from "../controllers/OrderController.js";

export const router = express.Router();


/**
 * @swagger
 * {
 *   "/orders": {
 *     "get": {
 *       "tags": ["Orders"],
 *       "summary": "Recupera gli ordini di un utente",
 *       "description": "Restituisce la lista degli ordini associati a un utente, identificato tramite il parametro query `idUser`. È possibile filtrare gli ordini per stato.",
 *       "operationId": "getOrdersByUser",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "iduser",
 *           "in": "query",
 *           "required": true,
 *           "description": "ID dell'utente di cui recuperare gli ordini",
 *           "schema": { "type": "string", "format": "uuid" },
 *           "example": "018fa0fc-3e68-7ccd-9e85-5b3950397aad"
 *         },
 *         {
 *           "name": "stato",
 *           "in": "query",
 *           "required": false,
 *           "description": "Filtra gli ordini per stato",
 *           "schema": {
 *             "type": "string",
 *             "enum": ["IN PREPARAZIONE", "ANNULLATO", "CONSEGNATO"]
 *           },
 *           "example": "CONSEGNATO"
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Ordini recuperati con successo"
 *         },
 *         "400": { "description": "Parametro idUser mancante o non valido" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get("/", enforceAuthentication, validate(getOrderSchema, true), isOwnProfileQuery, (req, res, next) => {

    let filters = {}

    if (req.checked.query.stato != "TUTTI") {
        filters.stato = req.checked.query.stato;
    }

    OrderController.getOrder(req.idUser, filters)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);
