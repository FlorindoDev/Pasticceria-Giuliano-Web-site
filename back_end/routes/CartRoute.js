import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js";
import { CartController } from "../controllers/CartController.js";
import { CartIteamController } from "../controllers/CartItemController.js";

export const router = express.Router();

/**
 * @swagger
 * {
 *   "/carts/{idUser}": {
 *     "post": {
 *       "tags": ["Cart"],
 *       "summary": "Crea un nuovo carrello per l'utente",
 *       "description": "Crea un nuovo carrello associato all'utente autenticato. Solo l'utente proprietario può creare il proprio carrello.",
 *       "operationId": "createCart",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "idUser",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'utente proprietario del carrello",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 3
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Carrello creato con successo"
 *         },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l'utente non è proprietario del profilo" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.post("/:id", enforceAuthentication, isOwnProfile, (req, res, next) => {
    CartController.createCart(req.idUser)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/carts/{idUser}": {
 *     "get": {
 *       "tags": ["Cart"],
 *       "summary": "Recupera il carrello attivo dell'utente",
 *       "description": "Restituisce il carrello attivo (isActive=true) associato all'utente autenticato, con eventuali elementi contenuti.",
 *       "operationId": "getCartByUser",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "idUser",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'utente di cui recuperare il carrello attivo",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 3
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Carrello recuperato con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": { "$ref": "#/components/schemas/Cart" }
 *               },
 *               "example": [
 *                 {
 *                   "idCart": 12,
 *                   "isActive": true,
 *                   "userId": 3,
 *                   "createdAt": "2025-10-25T10:00:00.000Z",
 *                   "updatedAt": "2025-10-25T10:10:00.000Z"
 *                 }
 *               ]
 *             }
 *           }
 *         },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l'utente non è proprietario del profilo" },
 *         "404": { "description": "Nessun carrello attivo trovato per l'utente" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get("/:id", enforceAuthentication, isOwnProfile, (req, res, next) => {
    CartController.getCartByUser(req.idUser)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);