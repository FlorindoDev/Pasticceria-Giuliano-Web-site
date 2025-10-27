import { Component } from '@angular/core';
import { SweetCard } from '../sweet-card/sweet-card.component';
import { Dolce } from '../_services/assortimento/dolce.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [SweetCard, RouterLink],
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
      descrizione: ""
    },
    {
      idProdotto: null,
      nome: "Coda di aragosta",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/codaaragosta.png",
      descrizione: ""
    },
    {
      idProdotto: null,
      nome: "Croccantino",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/croccantino.jpeg",
      descrizione: ""
    },
    {
      idProdotto: null,
      nome: "Specialità alla panna",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/specalitaallapanna.png",
      descrizione: ""
    },
    {
      idProdotto: null,
      nome: "Tonino",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/tonino.jpeg",
      descrizione: ""
    },
    {
      idProdotto: null,
      nome: "Tiramisú",
      costo: 10,
      peso: 10,
      isShippable: false,
      tag: "dolce",
      image: "/tiramisu.jpeg",
      descrizione: ""
    },
  ];





}
