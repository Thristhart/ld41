const handElement = document.getElementById("hand");

import audio from "./audio";

class Hand {
  constructor(container) {
    this.container = container;
    this.firstCard = null;
  }
  
  async addCard(card) {
    let cardElem = card.querySelector("card");
    
    if(!this.firstCard) {
      this.firstCard = cardElem;
    }
    
    this.container.appendChild(card);
    
    let amountOfCardsInHand = handElement.querySelectorAll("card").length;
    this.container.dataset.cardcount = amountOfCardsInHand;
    if(amountOfCardsInHand > 6) {
      this.burnFirstCard();
    }
    
    audio.drawCard();
    
    cardElem.classList.add("enterHandAnim");
    await new Promise(resolve => {
      cardElem.addEventListener("animationend", function(event) {
        if(event.animationName === "addCardToHandAnimation") {
          resolve();
        }
      });
    });
    cardElem.classList.remove("enterHandAnim");
    
  }
  
  async burnFirstCard() {
    return this.burnCard(this.firstCard);
  }
  
  findNewFirstCard() {
    this.firstCard = null;
    for(let i = 0; i < this.container.children.length; i++) {
      let possible = this.container.children[i];
      if(possible.classList.contains("burnCardAnim")) {
        continue;
      }
      this.firstCard = possible;
      break;
    }
  }
  
  async burnCard(card) {
    card.classList.add("burnCardAnim");
    if(this.firstCard === card) {
      this.findNewFirstCard();
    }
    await new Promise(resolve => {
      card.addEventListener("animationend", function(event) {
        if(event.animationName === "burnCardAnimation") {
          resolve();
        }
      });
    });
    card.classList.remove("burnCardAnim");
    return this.removeCard(card);
  }

  removeCard(card) {
    if(this.firstCard === card) {
      this.findNewFirstCard();
    }
    this.container.removeChild(card);
    const amountOfCardsInHand = handElement.querySelectorAll("card").length;
    this.container.dataset.cardcount = amountOfCardsInHand;
  }
}

export default Hand;