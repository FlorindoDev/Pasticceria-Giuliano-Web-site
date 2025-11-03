import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { idUserRequiredParams } from "../schemas/user.schema.js";
import { validate } from "../middleware/Middlewares.js";
import { CartItemController } from "../controllers/CartItemController.js";
import { CartController } from "../controllers/CartController.js";
import { SchemaParams } from "../schemas/cart.schema.js";
import { SchemaCartItemPost, SchemaParamsDelete } from "../schemas/cartitem.schema.js";


export const router = express.Router();


/**
 * @swagger
 * {
 *   "/users/{idUser}/carts": {
 *     "post": {
 *       "tags": ["Users"],
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
router.post("/:id/carts", enforceAuthentication, isOwnProfile, validate(idUserRequiredParams), (req, res, next) => {
    CartController.createCart(req.idUser)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/users/{idUser}/carts": {
 *     "get": {
 *       "tags": ["Users"],
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
router.get("/:id/carts", enforceAuthentication, isOwnProfile, validate(idUserRequiredParams), (req, res, next) => {
    CartController.getCartByUser(req.idUser)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/users/{idUser}/carts/{idCart}": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "Aggiunge un prodotto al carrello dell'utente",
 *       "description": "Inserisce un prodotto specifico nel carrello indicato per l'utente autenticato. Se l'elemento è già presente nel carrello, la quantità viene aggiornata.",
 *       "operationId": "addItemToCart",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "idUser",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'utente proprietario del carrello",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 3
 *         },
 *         {
 *           "name": "idCart",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID del carrello in cui aggiungere il prodotto",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 12
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "idProdotto": {
 *                   "type": "string",
 *                   "description": "ID del prodotto da aggiungere al carrello",
 *                   "example": 45
 *                 },
 *                 "quantity": {
 *                   "type": "integer",
 *                   "description": "Quantità del prodotto da aggiungere",
 *                   "example": 2
 *                 }
 *               },
 *               "required": ["idProdotto", "quantity"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": { "description": "Prodotto aggiunto o aggiornato nel carrello con successo" },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l'utente non è proprietario del profilo" },
 *         "404": { "description": "Carrello o prodotto non trovato" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.post("/:id/carts/:idCart", enforceAuthentication, isOwnProfile, validate(SchemaCartItemPost), (req, res, next) => {
    CartItemController.addItem(req.body.idProdotto, req.params.idCart, req.body.quantity)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/users/{idUser}/carts/{idCart}": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera gli elementi di un carrello specifico",
 *       "description": "Restituisce la lista dei prodotti contenuti nel carrello indicato per l'utente autenticato.",
 *       "operationId": "getCartItems",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "idUser",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'utente proprietario del carrello",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 3
 *         },
 *         {
 *           "name": "idCart",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID del carrello di cui recuperare gli elementi",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 12
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Lista degli elementi del carrello recuperata con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": { "$ref": "#/components/schemas/CartItem" }
 *               },
 *               "example": [
 *                 {
 *                   "idCartItem": 101,
 *                   "quantity": 2,
 *                   "cartId": 12,
 *                   "prodottoId": 45,
 *                   "createdAt": "2025-10-25T10:00:00.000Z",
 *                   "updatedAt": "2025-10-25T10:10:00.000Z",
 *                   "Prodotto": {
 *                     "idProdotto": 45,
 *                     "nome": "Tiramisù",
 *                     "costo": 9.99,
 *                     "image": "https://storage.googleapis.com/bucket/tiramisu.png"
 *                   }
 *                 }
 *               ]
 *             }
 *           }
 *         },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l'utente non è proprietario del profilo" },
 *         "404": { "description": "Carrello non trovato o vuoto" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get("/:id/carts/:idCart", enforceAuthentication, isOwnProfile, validate(SchemaParams), (req, res, next) => {
    CartItemController.getItem(req.params.idCart)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/users/{idUser}/carts/{idCart}/{idItem}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Rimuove un prodotto dal carrello dell'utente",
 *       "description": "Elimina un elemento specifico dal carrello indicato per l'utente autenticato.",
 *       "operationId": "deleteCartItem",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "idUser",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'utente proprietario del carrello",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 3
 *         },
 *         {
 *           "name": "idCart",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID del carrello da cui rimuovere l'elemento",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 12
 *         },
 *         {
 *           "name": "idItem",
 *           "in": "path",
 *           "required": true,
 *           "description": "ID dell'elemento (CartItem) da eliminare dal carrello",
 *           "schema": { "type": "integer", "format": "int32" },
 *           "example": 101
 *         }
 *       ],
 *       "responses": {
 *         "200": { "description": "Elemento rimosso con successo dal carrello" },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l'utente non è proprietario del profilo" },
 *         "404": { "description": "Carrello o elemento non trovato" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.delete("/:id/carts/:idCart/:idItem", enforceAuthentication, isOwnProfile, validate(SchemaParamsDelete), (req, res, next) => {
    CartItemController.deleteItem(req.params.idItem)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);
