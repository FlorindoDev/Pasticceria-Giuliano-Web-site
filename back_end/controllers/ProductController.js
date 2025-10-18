import { Prodotto } from "../models/DataBase.js";
import { FailToSaveProductError, ProductNotFoundError } from "../utils/error/index.js";

export class ProductController {

    static async addProduct(body, picUrl) {


        let prodotto = new Prodotto({
            costo: body.costo,
            nome: body.nome,
            image: picUrl,
            tag: body.tag,
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

    static async getProducts(filter) {
        let result = await Prodotto.findAll(filter);

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

    static async updateProduct(productId, body, picUrl) {

        if (picUrl) {
            body.image = picUrl;
        } else {
            delete body.image;
        }

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

    static createFilter(req) {
        let filter = {
            where: {}
        }

        if (req.query.nome) filter.where.nome = req.query.nome
        if (req.query.tag) filter.where.tag = req.query.tag

        return filter;

    }

}
