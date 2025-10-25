import { CartItem } from "../models/DataBase.js";
import { FailToSaveCartItem } from "../utils/error/index.js";

export class CartIteamController {

    static async getItem(idCart) {
        let result = await CartItem.findAll({
            where: {
                CartIdCart: idCart
            }
        });

        if (!result || result.length === 0) {
            throw new CartNotFoundError();
        }

        return result;
    }

    static async addItem(idProdotto, idCart, quantity) {

        let item = new CartItem({
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