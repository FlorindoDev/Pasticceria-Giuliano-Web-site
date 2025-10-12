

import { Prodotto } from "../models/DataBase.js";
import { FailToSaveProductError, ProductNotFoundError } from "../utils/error/index.js";

export class ProductController {

    static async addProduct(body) {


        let prodotto = new Prodotto({
            costo: body.costo,
            nome: body.nome,
            image: body.image,
            isShippable: body.isShippable ?? true,
        });

        let result = await prodotto.save();

        if (!result) {
            throw new FailToSaveProductError();
        }

        return result;
    }

    static async deleteProduct(productId) {

        let result = await Prodotto.findByPk(productId);

        if (result != null) {
            result = result.destroy();
            return result;
        }

        throw new ProductNotFoundError();
    }

    static async getProducts() {
        let result = await Prodotto.findAll({});

        if (!result || result.length === 0) {
            throw new ProductNotFoundError();
        }

        return result;
    }

    static async getProductsByPk(idProdotto) {
        let result = await Prodotto.findByPk(idProdotto);

        if (!result) {
            throw new ProductNotFoundError();
        }

        return result;
    }

    static async updateProduct(productId, body) {
        let result = await Prodotto.update(body, {
            where: {
                idProdotto: productId
            }
        });

        if (result[0] === 0) {
            throw new ProductNotFoundError();
        }

        return result;
    }

}
