import { Cart } from "../models/DataBase.js";
import { FailToSaveCart, CartNotFoundError } from "../utils/error/index.js";

export class CartController {


    static async getCartByUser(idUser) {

        let result = await Cart.findOne({
            where: {
                UserIdUser: idUser
            }
        });

        if (!result) {
            throw new CartNotFoundError();
        }

        return result;

    }

    static async createCart(idUser) {

        let result = await Cart.findOne({
            where: {
                UserIdUser: idUser,
                isActive: true
            }

        })

        if (result) {
            /*
            await result.update({ isActive: false }, {
                where: {
                    idCart: result.dataValues.idCart
                }
            });
            */
            return 0;
        }

        let cart = new Cart({
            UserIdUser: idUser,
            isActive: true
        });

        let resultSave = await cart.save();

        if (!resultSave) {
            throw new FailToSaveCart();
        }

        return resultSave;
    }


}