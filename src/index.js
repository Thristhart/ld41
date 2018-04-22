const canvas = document.getElementById("city");

function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

onResize();

window.addEventListener("resize", onResize);

canvas.addEventListener("contextmenu", event => {
  event.preventDefault();
  return false;
});

import Renderer from "./lib/renderer";
import City from "./lib/city";
import CardGame from "./lib/cardgame";
import CARDS from "./cards";

window.debug = CardGame;

const renderer = new Renderer(canvas);
CardGame.registerGlobalDragEvents();

import {TILE_SIZE, CITY_WIDTH, CITY_HEIGHT} from "./constants";

renderer.camera.x = TILE_SIZE * CITY_WIDTH / 2;
renderer.camera.y = TILE_SIZE * CITY_HEIGHT / 2;

let lastUpdateTime = null;

function update(timestamp) {
  requestAnimationFrame(update);
  
  if(lastUpdateTime === null) {
    lastUpdateTime = timestamp;
  }
  
  const dt = timestamp - lastUpdateTime;
  
  renderer.update(dt);
  
  lastUpdateTime = timestamp;
}

CardGame.createAndAddCardToHand(CARDS.gather1);
CardGame.createAndAddCardToHand(CARDS.gather1);
CardGame.createAndAddCardToHand(CARDS.gather1);
CardGame.createAndAddCardToHand(CARDS.buildWorkshop);

requestAnimationFrame(update);