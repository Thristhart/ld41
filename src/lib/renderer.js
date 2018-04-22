import Camera from './camera';
import City from "./city";

import {TILE_SIZE} from "../constants";

import Images from "./images";

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.camera = new Camera();
  }
  
  update(dt) {
    this.context.save();
    
    this.context.translate(this.canvas.width / 2 - this.camera.x * this.camera.scale,
                           this.canvas.height / 2 - this.camera.y * this.camera.scale);
    this.context.scale(this.camera.scale, this.camera.scale);
    
    let leftBound = this.camera.x - this.camera.width / 2;
    let rightBound = this.camera.x + this.camera.width / 2;
    
    let topBound = this.camera.y - this.camera.height / 2;
    let bottomBound = this.camera.y + this.camera.height / 2;
    
    let leftCityBound = Math.floor(leftBound / TILE_SIZE);
    let rightCityBound = Math.ceil(rightBound / TILE_SIZE);
    
    let topCityBound = Math.floor(topBound / TILE_SIZE);
    let bottomCityBound = Math.ceil(bottomBound / TILE_SIZE);
    
    this.context.clearRect(this.camera.x - this.camera.width / 2, this.camera.y - this.camera.height / 2, this.camera.width, this.camera.height);
    
    for(let x = leftCityBound; x < rightCityBound; x++) {
      for(let y = topCityBound; y < bottomCityBound; y++) {
        let tile = City.getTile(x, y);
        if(tile) {
          this.context.drawImage(Images.GRASS1, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
    
    this.context.restore();
  }
}

export default Renderer;