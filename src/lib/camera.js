class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }
  
  get width() {
    return window.innerWidth / this.scale;
  }
  get height() {
    return window.innerHeight / this.scale;
  }
  
  translateMousePosition(x, y) {
    let translated = {x:x, y:y};
    
    translated.x = (x / this.scale) - ((window.innerWidth * 0.5) / this.scale);
    translated.y = (y / this.scale) - ((window.innerHeight * 0.5) / this.scale);
    
    translated.x += this.x;
    translated.y += this.y;
    
    return translated
  }
}

export default Camera;