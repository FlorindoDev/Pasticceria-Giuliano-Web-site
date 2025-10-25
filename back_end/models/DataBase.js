import { Sequelize } from "sequelize";
import { UserModel } from "./User.js";
import { ResidenzaModel } from "./Residenza.js";
import { OrdineModel } from "./Ordine.js";
import { ProdottoModel } from "./Prodotto.js";
import { IngredienteModel } from "./Ingrediente.js";
import { OrdineProdottoModel } from "./OridineProdotto.js";
import { ProdottoIngredienteModel } from "./ProdottoIngrediente.js";
import { CartModel } from "./Cart.js";
import { CartItemModel } from "./CartItem.js";

import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

UserModel(database);
ResidenzaModel(database);
OrdineModel(database);
ProdottoModel(database);
IngredienteModel(database);
OrdineProdottoModel(database);
ProdottoIngredienteModel(database);
CartModel(database);
CartItemModel(database);

export const {
    User,
    Residenza,
    Ordine,
    Prodotto,
    Ingrediente,
    OrdineProdotto,
    ProdottoIngrediente,
    Cart,
    CartItem
} = database.models;


//Associazioni User
User.Residenza = User.hasMany(Residenza, { onDelete: 'CASCADE' });
User.Ordine = User.hasMany(Ordine, { onDelete: 'CASCADE' });
User.Cart = User.hasMany(Cart, { onDelete: 'CASCADE' });

//Associazioni Cart
Cart.User = Cart.belongsTo(User);
Cart.CartItem = Cart.hasMany(CartItem, { onDelete: 'CASCADE' });

//Associazioni CartItem
CartItem.Cart = CartItem.belongsTo(Cart);
CartItem.Prodotto = CartItem.belongsTo(Prodotto);

//Associazioni Residenza
Residenza.User = Residenza.belongsTo(User);

//Associazioni Ordine
Ordine.User = Ordine.belongsTo(User);
Ordine.Prodotto = Ordine.belongsToMany(Prodotto, { through: "OrdineProdotto", onDelete: 'CASCADE' });

//Associazioni Prodotto
Prodotto.Ordine = Prodotto.belongsToMany(Ordine, { through: "OrdineProdotto" });
Prodotto.Ingrediente = Prodotto.belongsToMany(Ingrediente, { through: "ProdottoIngrediente" });
Prodotto.CartItem = Prodotto.hasMany(CartItem, { onDelete: 'CASCADE' });

//Associazioni ingredienti
Ingrediente.Prodotto = Ingrediente.belongsToMany(Prodotto, { through: "ProdottoIngrediente" });





database.sync({ /*alter: true*/ }).then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.log("Error with database synchronization: " + err.message);
});



