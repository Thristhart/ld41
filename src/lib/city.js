import Tile from "./tile";
import {CITY_WIDTH, CITY_HEIGHT} from "../constants";

class City {
  static getTile(x, y) {
    if(x < 0 || y < 0 || x >= this.tiles.length || y >= this.tiles[0].length) {
      return null;
    }
    return this.tiles[x][y];
  }
}

City.tiles = [];
for(let x = 0; x < CITY_WIDTH; x++) {
  City.tiles[x] = [];
  for(let y = 0; y < CITY_HEIGHT; y++) {
    City.tiles[x][y] = new Tile(x, y);
  }
}

class Resources {
  static get materials() {
    console.log("getter on materials", this._materials);
    return this._materials;
  }
  static set materials(newValue) {
    console.log("setter on materials", this._materials, newValue);
    this._materials = newValue;
    document.getElementById("materials").innerHTML = newValue;
  }
  static get infrastructure() {
    return this._infrastructure;
  }
  static set infrastructure(newValue) {
    this._infrastructure = newValue;
    document.getElementById("infrastructure").innerHTML = newValue;
  }
  static get labour() {
    return this._labour;
  }
  static set labour(newValue) {
    this._labour = newValue;
    document.getElementById("labour").innerHTML = newValue;
  }
  static get knowledge() {
    return this._knowledge;
  }
  static set knowledge(newValue) {
    this._knowledge = newValue;
    document.getElementById("knowledge").innerHTML = newValue;
  }
  static get food() {
    return this._food;
  }
  static set food(newValue) {
    this._food = newValue;
    document.getElementById("food").innerHTML = newValue;
  }
}

Resources._materials = 0;
Resources._infrastructure = 0;
Resources._labour = 0;
Resources._knowledge = 0;
Resources._food = 0;

City.resources = Resources;

window.testCity = City;

export default City;