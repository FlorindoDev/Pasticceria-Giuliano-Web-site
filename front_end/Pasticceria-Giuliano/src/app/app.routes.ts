import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage.component';
import { Assortimento } from './assortimento/assortimento.component';
import { Cart } from './cart/cart.component';
import { SweetPage } from './sweet-page/sweet-page.component';
import { authGuard } from './_guards/auth/auth.guard';
import { OrderPage } from './order-page/order-page.component';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        title: "Home Page",
        component: Homepage
    },
    {
        path: "assortimento",
        title: "Assortimento",
        component: Assortimento
    },
    {
        path: "cart",
        title: "Carrello",
        component: Cart,
        canActivate: [authGuard]
    },
    {
        path: "products/:id",
        title: "Sweet Page",
        component: SweetPage
    },
    {
        path: "order",
        title: "Order Page",
        component: OrderPage
    }

];

