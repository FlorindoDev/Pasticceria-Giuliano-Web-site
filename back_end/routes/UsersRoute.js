import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { UsersController } from "../controllers/UsersController.js";
import { idUserRequiredParams, schemaUserPut } from "../schemas/user.schema.js";
import { validate } from "../middleware/Middlewares.js";
import { ResidenceController } from "../controllers/ResidenceController.js";
import { schemaResidencePost, schemaResidencePut, idResidenzaRequiredParams } from "../schemas/residenza.schema.js";
import { CartIteamController } from "../controllers/CartItemController.js";
import { CartController } from "../controllers/CartController.js";
import { SchemaParams } from "../schemas/cart.schema.js";
import { SchemaCartItemPost, SchemaParamsDelete } from "../schemas/cartitem.schema.js";


export const router = express.Router();


/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera un utente tramite ID",
 *       "description": "Restituisce le informazioni dettagliate di un utente in base all'ID specificato",
 *       "operationId": "getUserById",
 *         "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "items": { "$ref": "#/components/schemas/User" }
 *               },
 *                "example": {
 *                      "idUser": 1,
 *                      "nome": "johnDoe",
 *                      "cognome": "johnDoe",
 *                       "email": "john@example.com",
 *                       "telefono": null,
 *                       "createdAt": "2025-05-17T16:18:36.773Z",
 *                       "updatedAt": "2025-05-17T16:18:36.773Z"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get('/:id', [enforceAuthentication, validate(idUserRequiredParams), isOwnProfile], (req, res, next) => {

    UsersController.getUserFromId(req.params.id).then((result) => {

        res.status(200);
        res.json(result);

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "put": {
 *       "tags": ["Users"],
 *       "summary": "Aggiorna un utente tramite ID",
 *       "description": "Aggiorna un utente in base all'ID specificato",
 *       "operationId": "putUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *        "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/User"
 *             },
 *             "example": {
 *               "nome": "johnDoe",
 *               "cognome": "johnDoe",
 *               "telefono": "3391382168",
 *               "email": "john@example.com",
 *               "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6"
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id', enforceAuthentication, validate(schemaUserPut), isOwnProfile, (req, res, next) => {

    let changes = UsersController.changesObject(req);

    UsersController.updateUser(req.idUser, changes).then(() => {

        res.status(200);
        res.send();

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Cancella un utente tramite ID",
 *       "description": "",
 *       "operationId": "deleteUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *          },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete('/:id', enforceAuthentication, isOwnProfile, (req, res, next) => {
    UsersController.deleteUser(req.idUser).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});


/**
 * @swagger
 * {
 *   "/users/{id}/residence": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "Aggiungi una residenza all'utente",
 *       "description": "Permette di aggiungere una residenza per l'utente specificato tramite ID.",
 *       "operationId": "addUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente a cui aggiungere la residenza",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "regione": {
 *                   "type": "string",
 *                   "example": "Lombardia"
 *                 },
 *                 "comune": {
 *                   "type": "string",
 *                   "example": "Milano"
 *                 },
 *                 "cap": {
 *                   "type": "string",
 *                   "example": "20100"
 *                 },
 *                 "via": {
 *                   "type": "string",
 *                   "example": "Via Roma"
 *                 },
 *                 "numero_civico": {
 *                   "type": "string",
 *                   "example": "10"
 *                 }
 *               },
 *               "required": ["regione", "comune", "cap", "via", "numero_civico"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Residenza aggiunta con successo"
 *         },
 *         "400": {
 *           "description": "Richiesta non valida — dati mancanti o errati",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "401": {
 *           "description": "Non autorizzato — token mancante o non valido",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "403": {
 *           "description": "Accesso negato — l’utente non può modificare questo profilo",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post('/:id/residence', [enforceAuthentication, validate(schemaResidencePost), isOwnProfile], (req, res, next) => {
    ResidenceController.addResidence(req.idUser, req.body).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residence/{residenceId}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Cancella una residenza dell'utente",
 *       "description": "Elimina una residenza associata all'utente specificato tramite il suo ID.",
 *       "operationId": "deleteUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         },
 *         {
 *           "name": "residenceId",
 *           "in": "path",
 *           "description": "ID della residenza da eliminare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Residenza eliminata con successo"
 *         },
 *         "401": {
 *           "description": "Non autorizzato — token mancante o non valido",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "403": {
 *           "description": "Accesso negato — l’utente non può modificare questo profilo",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "404": {
 *           "description": "Residenza non trovata",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "Residenza non trovata"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete('/:id/residence/:residenceId', [enforceAuthentication, validate(idResidenzaRequiredParams), isOwnProfile], (req, res, next) => {
    ResidenceController.deleteResidence(req.params.residenceId).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residence": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Ottieni la residenza dell'utente",
 *       "description": "Recupera i dati di residenza associati all'utente specificato tramite ID.",
 *       "operationId": "getUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente di cui ottenere la residenza",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Residenza recuperata con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "regione": { "type": "string", "example": "Lombardia" },
 *                   "comune": { "type": "string", "example": "Milano" },
 *                   "cap": { "type": "string", "example": "20100" },
 *                   "via": { "type": "string", "example": "Via Roma" },
 *                   "numero_civico": { "type": "string", "example": "10" }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l’utente non può accedere a questo profilo" },
 *         "404": { "description": "Residenza non trovata" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get('/:id/residence', enforceAuthentication, isOwnProfile, (req, res, next) => {
    ResidenceController.getResidence(req.idUser).then((result) => {
        res.status(200);
        res.json(result);
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residence/{residenceId}": {
 *     "put": {
 *       "tags": ["Users"],
 *       "summary": "Aggiorna la residenza di un utente",
 *       "description": "Permette di aggiornare i dati di una specifica residenza associata all'utente identificato tramite ID.",
 *       "operationId": "updateUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente proprietario della residenza",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         },
 *         {
 *           "name": "residenceId",
 *           "in": "path",
 *           "description": "ID della residenza da aggiornare",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "regione": { "type": "string" },
 *                 "comune": { "type": "string" },
 *                 "cap": { "type": "string" },
 *                 "via": { "type": "string" },
 *                 "numero_civico": { "type": "string" }
 *               },
 *               "required": ["regione", "comune", "cap", "via", "numero_civico"],
 *               "example": {
 *                 "regione": "Lombardia",
 *                 "comune": "Milano",
 *                 "cap": "20100",
 *                 "via": "Via Roma",
 *                 "numero_civico": "10"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": { "description": "Residenza aggiornata con successo" },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l’utente non può modificare questa residenza" },
 *         "404": { "description": "Residenza non trovata" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id/residence/:residenceId', [enforceAuthentication, validate(schemaResidencePut), isOwnProfile], (req, res, next) => {
    ResidenceController.updateResidence(req.params.residenceId, req.body).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});


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
    CartIteamController.addItem(req.body.idProdotto, req.params.idCart, req.body.quantity)
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
    CartIteamController.getItem(req.params.idCart)
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
    CartIteamController.deleteItem(req.params.idItem)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);


