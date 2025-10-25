import { Component } from '@angular/core';
import { SweetCard } from '../sweet-card/sweet-card.component';
import { Dolce } from '../_services/assortimento/dolce.type';

@Component({
  selector: 'app-homepage',
  imports: [SweetCard],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {

  dolci: Dolce[] = [
    {
      idProdotto: null,
      nome: "Carramello",
      costo: 10,
      isShippable: false,
      peso: 10,
      tag: "dolce",
      image: "/carramello.jpeg",
    },
    {
      idProdotto: null,
      nome: "Coda di aragosta",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/codaaragosta.png",
    },
    {
      idProdotto: null,
      nome: "Croccantino",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/croccantino.jpeg",
    },
    {
      idProdotto: null,
      nome: "Specialità alla panna",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/specalitaallapanna.png",
    },
    {
      idProdotto: null,
      nome: "Tonino",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/tonino.jpeg",
    },
    {
      idProdotto: null,
      nome: "Tiramisú",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/tiramisu.jpeg",
    },
  ];





}
