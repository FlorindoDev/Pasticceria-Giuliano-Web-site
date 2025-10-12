import { Ingrediente } from '../models/DataBase.js'
import { ProductController } from './ProductController.js'
import { IngredientNotFoundError, FailToSaveIngredientError } from '../utils/error/index.js';


export class IngredientController {

    static async saveIngredients(idProdotto, req) {

        let ingredients = [];

        let prodotto = await ProductController.getProductsByPk(idProdotto);



        req.body.forEach(element => {
            ingredients.push(
                new Ingrediente({
                    nome: element.nome.toLowerCase()
                })
            );
        });


        const existingIngredients = await Promise.all(
            ingredients.map(ingredient => Ingrediente.findOne({ where: { nome: ingredient.nome } }))
        ).catch(() => {
            return Promise.reject(new FailToSaveIngredientError());
        });


        let NonPrsentIngredients = ingredients.filter(ingredient => {

            for (let i = 0; i < existingIngredients.length; i++) {
                if (existingIngredients[i] != null && ingredient.nome === existingIngredients[i].dataValues.nome) return false;

            }
            return true;

        });


        let savedIngredients = await Promise.all(
            NonPrsentIngredients.map(ingredient => ingredient.save())      //map funzione di ordine superire 
        ).catch(() => {
            return Promise.reject(new FailToSaveIngredientError());
        });

        let addedIngredients = savedIngredients.concat(existingIngredients);


        addedIngredients = addedIngredients.filter(ingredients => {
            if (ingredients === null) return false;
            return true
        })

        await prodotto.addIngredientes(addedIngredients);
        return addedIngredients;
    }

    static async getProductsIngredients(idProdotto, filters = {}, emptyCheck = true) {

        let prodotto = await ProductController.getProductsByPk(idProdotto);

        let result = await prodotto.getIngredients(filters);

        if (emptyCheck && result.length === 0) return Promise.reject(new IngredientNotFoundError());

        return result;

    }

    static async getIngredients(filters = {}, emptyCheck = true) {

        let result = await Ingrediente.findAll(filters);

        if (emptyCheck && result === 0) return Promise.reject(new IngredientNotFoundError());

        return result;
    }

    /*
    static isTagInList(tag, list) {
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            if (tag.dataValues.name === list[i]) flag = true;
        }
        return flag;
    }*/

    static async deleteIngredientsFromMeme(idProdotto, list) {

        list = await IngredientController.getIngredients({ where: { name: list } });


        let prodotto = await ProductController.getProductsByPk(idProdotto);

        list = await Promise.all(
            list.map(ingredient => prodotto.removeIngrediente(ingredient))
        );


        return list;
    }

}