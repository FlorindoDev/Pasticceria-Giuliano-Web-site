import { CartItem } from "../models/DataBase.js";
import { FailToSaveCartItem } from "../utils/error/index.js";
import { CartItemNotFoundError } from "../utils/error/index.js";
import { ProductController } from "./ProductController.js";
import { CartController } from "./CartController.js";
import { Prodotto } from "../models/DataBase.js";

export class CartItemController {

    static async getItem(idCart) {
        let result = await CartItem.findAll({
            where: {
                CartIdCart: idCart
            },
            include: [
                {
                    model: Prodotto,

                }
            ]
        });

        if (!result || result.length === 0) {
            throw new CartItemNotFoundError();
        }

        return result;
    }

    static async deleteItem(idItem) {
        let result = await CartItem.findByPk(idItem);

        if (result != null) {
            result = result.destroy();
            return result;
        }

        throw new CartItemNotFoundError();
    }

    static async updateCartItem(item, filter) {
        let result = await CartItem.update(item, filter);

        if (result[0] === 0) {
            throw new CartItemNotFoundError();
        }
    }


    static async addItem(idProdotto, idCart, quantity) {

        let productPresent = await CartItem.findOne({
            where: {
                ProdottoIdProdotto: idProdotto,
                CartIdCart: idCart
            }
        })

        let item;

        if (productPresent) {

            item = {
                quantity: productPresent.dataValues.quantity + quantity
            };

            let filter = {
                where: {
                    ProdottoIdProdotto: idProdotto,
                    CartIdCart: idCart
                }
            }

            CartItemController.updateCartItem(item, filter);
            return;
        }

        await ProductController.getProductsByPk(idProdotto);
        await CartController.getCartById(idCart);

        item = new CartItem({
            ProdottoIdProdotto: idProdotto,
            CartIdCart: idCart,
            quantity: quantity
        });

        let result = item.save();

        if (!result) {
            throw new FailToSaveCartItem();
        }

        return result;

    }


}