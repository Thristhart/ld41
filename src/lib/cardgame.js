const cardTemplate = document.getElementById("cardTemplate");

let cardBeingDragged = null;
let dragOffsetX = null;
let dragOffsetY = null;
let dragStartX = null;
let dragStartY = null;

import Hand from "./hand";
import City from "./city";
import audio from "./audio";

const hand = new Hand(document.getElementById("hand"));

class CardGame {
  static createCard(cardData) {
    let card = document.importNode(cardTemplate.content, true);
    card.querySelector("h1").innerHTML = cardData.title;
    card.querySelector("p").innerHTML = cardData.desc.replace(/\n/g, "<br>");
    for(let key in cardData.cost) {
      let costSpan = document.createElement("span");
      costSpan.className = `cost ${key}`;
      costSpan.innerHTML = cardData.cost[key];
      card.querySelector(".costs").appendChild(costSpan);
    }
    card.querySelector("img").src = cardData.img;

    let cardElement = card.querySelector("card");
    cardElement.addEventListener("contextmenu", event => {
      event.preventDefault();
      return false;
    });
    cardElement.addEventListener("mousedown", event => {
      if(cardBeingDragged && event.which !== 1) {
        cardBeingDragged.style.transform = "";
        delete(cardBeingDragged.dataset.droppable);
        cardBeingDragged = null;
        return;
      }
      const rect = cardElement.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      cardBeingDragged = cardElement;
      dragOffsetX = offsetX;
      dragOffsetY = offsetY;

      dragStartX = event.clientX;
      dragStartY = event.clientY;
      event.preventDefault();
    });

    cardElement.callback = function() {
      if(cardData.onPlay) {
        cardData.onPlay(hand);
      }
    };
    
    cardElement.beforePlayCallback = function() {
      if(cardData.beforePlay) {
        cardData.beforePlay(hand);
      }
    };

    return card;
  }
  static async createAndAddCardToHand(cardData) {
    let card = this.createCard(cardData);
    return this.hand.addCard(card);
  }
  static registerGlobalDragEvents() {
    document.body.addEventListener("mousemove", event => {
      if(!cardBeingDragged) {
        return;
      }
      const rect = document.body.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      let dx = offsetX - dragStartX;
      let dy = offsetY - dragStartY;

      let distance = Math.sqrt(dx * dx + dy * dy);

      if(distance > cardBeingDragged.getBoundingClientRect().height / 3) {
        cardBeingDragged.dataset.droppable = true;
      }
      else {
        delete(cardBeingDragged.dataset.droppable);
      }

      cardBeingDragged.style.transform = `translate(${offsetX - dragStartX}px, ${offsetY - dragStartY}px)`;
    });
    document.body.addEventListener("mouseup", event => {
      if(cardBeingDragged) {
        if(cardBeingDragged.dataset.droppable) {
          this.playCard(cardBeingDragged, event.clientX, event.clientY);
        }
        else {
          cardBeingDragged.style.transform = "";
        }
        delete(cardBeingDragged.dataset.droppable);
        cardBeingDragged = null;
      }
    });
  }
  
  static playCard(card, mouseX, mouseY) {
    card.beforePlayCallback();
    let position = card.getBoundingClientRect();
    hand.removeCard(card);
    card.classList.add("playAnim");
    document.body.appendChild(card);
    card.style.transform = `translate(${mouseX - dragOffsetX}px, ${mouseY - dragOffsetY}px)`;
    audio.playCard();
    setTimeout(function() {
      document.body.removeChild(card);
      card.callback();
    }, 400);
  }
}

CardGame.hand = hand;

export default CardGame;