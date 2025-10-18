import express from "express";
import { enforceAuthentication, isUserAdmin } from "../middleware/authorization.js";
import { ProductController } from "../controllers/ProductController.js";
import { upLoad as upLoadOnGoogle } from "../middleware/GoogleStorage.js";
import { IngredientController } from "../controllers/IngredientController.js";
import { validate } from "../middleware/Middlewares.js";
import { schemaProductPost, schemaProductPut } from "../schemas/product.schema.js";

// multer per upload immagine
import multer from "multer";
import { schemaIngredientPost } from "../schemas/ingredient.schema.js";
const upload = multer({ storage: multer.memoryStorage() });
const imageParser = upload.fields([{ name: "image", maxCount: 1 }]);

export const router = express.Router();


/**
 * @swagger
 * {
 *   "/products": {
 *     "post": {
 *       "tags": ["Products"],
 *       "summary": "Crea un prodotto",
 *       "description": "Crea un nuovo prodotto. Se viene inviata un'immagine come multipart/form-data, il middleware carica il file e imposta il campo `image` con l'URL risultante.",
 *       "operationId": "createProduct",
 *       "security": [ { "bearerAuth": [] } ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "multipart/form-data": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "costo": { "type": "number", "example": 29.9 },
 *                  "nome": { "type": "string", "example": "tiramisú" },
 *                 "isShippable": { "type": "boolean", "example": true },
 *                 "image": { "type": "string", "format": "binary", "description": "File immagine del prodotto" },
 *                 "tag": { "type": "string",  "example": "semi-freddo"}
 *               },
 *               "required": ["costo","isShippable","nome","tag","image"]
 *             }
 *           },
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "costo": { "type": "number", "example": 29.9 },
 *                  "nome": { "type": "string", "example": "tiramisú" },
 *                 "isShippable": { "type": "boolean", "example": true },
 *                 "tag": { "type": "string",  "example": "semi-freddo"},
 *                 "image": { "type": "string", "example": "https://storage.googleapis.com/bucket/img.png" }
 *               },
 *               "required": ["costo","isShippable","nome","tag","image"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Prodotto creato con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": { "$ref": "#/components/schemas/Prodotto" },
 *               "example": {
 *                 "idProdotto": 12,
 *                 "costo": 29.9,
 *                 "image": "https://storage.googleapis.com/bucket/prod-12.png",
 *                 "isShippable": true,
 *                 "createdAt": "2025-06-01T10:00:00.000Z",
 *                 "updatedAt": "2025-06-01T10:00:00.000Z"
 *               }
 *             }
 *           }
 *         },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.post("/", enforceAuthentication, imageParser, isUserAdmin, validate(schemaProductPost), upLoadOnGoogle(), (req, res, next) => {
    ProductController.addProduct(req.body, req.picUrl)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/products": {
 *     "get": {
 *       "tags": ["Products"],
 *       "summary": "Lista prodotti dell'utente autenticato",
 *       "description": "Recupera tutti i prodotti associati all'utente attualmente autenticato. È possibile filtrare i risultati per nome e tag.",
 *       "operationId": "listMyProducts",
 *       "parameters": [
 *         {
 *           "name": "nome",
 *           "in": "query",
 *           "description": "Filtra i prodotti in base al nome (ricerca parziale).",
 *           "required": false,
 *           "schema": {
 *             "type": "string"
 *           },
 *           "example": "red velvet"
 *         },
 *         {
 *           "name": "tag",
 *           "in": "query",
 *           "description": "Filtra i prodotti in base al tag associato.",
 *           "required": false,
 *           "schema": {
 *             "type": "string"
 *           },
 *           "example": "semi-freddo"
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Lista dei prodotti",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": { "$ref": "#/components/schemas/Prodotto" }
 *               },
 *               "example": [
 *                 { "idProdotto": 12, "costo": 29.9, "image": "https://.../p12.png", "isShippable": true, "tag": "semi-freddo" },
 *                 { "idProdotto": 13, "costo": 49.0, "image": "https://.../p13.png", "isShippable": false, "tag": "semi-freddo" }
 *               ]
 *             }
 *           }
 *         },
 *         "401": { "description": "Non autorizzato" },
 *         "404": { "description": "Nessun prodotto trovato" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get("/", (req, res, next) => {

    ProductController.getProducts(ProductController.createFilter(req))
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
});

/**
 * @swagger
 * {
 *   "/products/{productId}": {
 *     "put": {
 *       "tags": ["Products"],
 *       "summary": "Aggiorna un prodotto",
 *       "description": "Aggiorna i dati di un prodotto. Supporta aggiornamento immagine via upload multipart.",
 *       "operationId": "updateProduct",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "productId",
 *           "in": "path",
 *           "description": "ID del prodotto da aggiornare",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "multipart/form-data": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "costo": { "type": "number", "example": 39.5 },
 *                 "nome": { "type": "string", "example": tiramisù },
 *                 "isShippable": { "type": "boolean", "example": true },
 *                 "image": { "type": "string", "format": "binary" },
 *                  "tag": { "type": "string",  "example": "semi-freddo"}
 *               }
 *             }
 *           },
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "costo": { "type": "number", "example": 39.5 },
 *                  "nome": { "type": "string", "example": tiramisù },
 *                 "isShippable": { "type": "boolean", "example": true },
 *                 "image": { "type": "string", "example": "https://storage.googleapis.com/bucket/new-img.png" },
 *                  "tag": { "type": "string",  "example": "semi-freddo"}
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": { "description": "Prodotto aggiornato con successo" },
 *         "400": { "description": "Richiesta non valida" },
 *         "401": { "description": "Non autorizzato" },
 *         "404": { "description": "Prodotto non trovato" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.put(
    "/:productId", enforceAuthentication, imageParser, isUserAdmin, validate(schemaProductPut), upLoadOnGoogle(false), (req, res, next) => {
        ProductController.updateProduct(req.params.productId, req.body, req.picUrl)
            .then(() => res.status(200).send())
            .catch((err) => next(err));
    }
);

/**
 * @swagger
 * {
 *   "/products/{productId}": {
 *     "delete": {
 *       "tags": ["Products"],
 *       "summary": "Elimina un prodotto",
 *       "description": "Elimina un prodotto esistente.",
 *       "operationId": "deleteProduct",
 *       "security": [ { "bearerAuth": [] } ],
 *       "parameters": [
 *         {
 *           "name": "productId",
 *           "in": "path",
 *           "description": "ID del prodotto da eliminare",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "responses": {
 *         "200": { "description": "Prodotto eliminato con successo" },
 *         "401": { "description": "Non autorizzato" },
 *         "404": {
 *           "description": "Prodotto non trovato",
 *           "content": {
 *             "application/json": {
 *               "schema": { "$ref": "#/components/schemas/Error" },
 *             }
 *           }
 *         },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.delete("/:productId", enforceAuthentication, isUserAdmin, (req, res, next) => {
    ProductController.deleteProduct(req.params.productId)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
});


/**
 * @swagger
 * {
 *   "/products/{productId}/ingredients": {
 *     "post": {
 *       "tags": ["Products"],
 *       "summary": "Salva o aggiorna gli ingredienti di un prodotto",
 *       "description": "Crea o sostituisce la lista degli ingredienti associati a un prodotto. Richiede autenticazione e ruolo amministratore.",
 *       "security": [{ "bearerAuth": [] }],
 *       "parameters": [
 *         {
 *           "name": "productId",
 *           "in": "path",
 *           "description": "ID del prodotto (>= 1)",
 *           "required": true,
 *           "schema": {
 *             "type": "integer",
 *             "minimum": 1
 *           }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "array",
 *               "items": {
 *                 "type": "object",
 *                 "required": ["nome"],
 *                 "properties": {
 *                   "nome": {
 *                     "type": "string",
 *                     "description": "Nome dell'ingrediente"
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Ingredienti salvati correttamente",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "message": { "type": "string" }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Body non valido o schema ingredienti errato"
 *         },
 *         "401": {
 *           "description": "Non autenticato"
 *         },
 *         "403": {
 *           "description": "Non autorizzato (ruolo non sufficiente)"
 *         },
 *         "404": {
 *           "description": "Prodotto non trovato"
 *         },
 *         "500": {
 *           "description": "Errore interno del server"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/:productId/ingredients", enforceAuthentication, isUserAdmin, validate(schemaIngredientPost), (req, res, next) => {
    IngredientController.saveIngredients(req.params.productId, req)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/products/{productId}/ingredients": {
 *     "get": {
 *       "tags": ["Products"],
 *       "summary": "Ottiene la lista degli ingredienti di un prodotto",
 *       "description": "Restituisce tutti gli ingredienti associati a un determinato prodotto. Richiede autenticazione e ruolo amministratore.",
 *       "parameters": [
 *         {
 *           "name": "productId",
 *           "in": "path",
 *           "description": "ID del prodotto (>= 1)",
 *           "required": true,
 *           "schema": {
 *             "type": "integer",
 *             "minimum": 1
 *           }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Lista degli ingredienti recuperata correttamente",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": {
 *                   "type": "object",
 *                   "properties": {
 *                     "idIngrediente": { "type": "integer" },
 *                     "nome": { "type": "string" }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "ID prodotto non valido"
 *         },
 *         "401": {
 *           "description": "Non autenticato"
 *         },
 *         "403": {
 *           "description": "Non autorizzato (ruolo non sufficiente)"
 *         },
 *         "404": {
 *           "description": "Prodotto non trovato o nessun ingrediente associato"
 *         },
 *         "500": {
 *           "description": "Errore interno del server"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get("/:productId/ingredients", (req, res, next) => {
    IngredientController.getProductsIngredients(req.params.productId)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
}
);

/**
 * @swagger
 * {
 *   "/products/{productId}/ingredients": {
 *     "delete": {
 *       "tags": ["Products"],
 *       "summary": "Elimina uno o più ingredienti associati a un prodotto",
 *       "description": "Rimuove dal prodotto indicato gli ingredienti specificati come parametri di query. Richiede autenticazione e ruolo amministratore.",
 *       "security": [{ "bearerAuth": [] }],
 *       "parameters": [
 *         {
 *           "name": "productId",
 *           "in": "path",
 *           "description": "ID del prodotto (>= 1)",
 *           "required": true,
 *           "schema": {
 *             "type": "integer",
 *             "minimum": 1
 *           }
 *         },
 *         {
 *           "name": "nome",
 *           "in": "query",
 *           "description": "Nome dell'ingrediente da eliminare (può essere ripetuto più volte)",
 *           "required": true,
 *           "schema": {
 *             "type": "array",
 *             "items": { "type": "string" },
 *             "example": ["Pomodoro", "Mozzarella"]
 *           },
 *           "style": "form",
 *           "explode": true
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Ingredienti eliminati correttamente",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "message": {
 *                     "type": "string",
 *                     "example": "Ingredienti rimossi con successo"
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Parametri non validi o mancanti"
 *         },
 *         "401": {
 *           "description": "Non autenticato"
 *         },
 *         "403": {
 *           "description": "Non autorizzato (ruolo non sufficiente)"
 *         },
 *         "404": {
 *           "description": "Prodotto o ingredienti non trovati"
 *         },
 *         "500": {
 *           "description": "Errore interno del server"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete("/:productId/ingredients", enforceAuthentication, isUserAdmin, (req, res, next) => {
    IngredientController.deleteIngredientsFromProduct(req.params.productId, req.query.nome)
        .then(() => res.status(200).send())
        .catch((err) => next(err));
}
);

export default router;
