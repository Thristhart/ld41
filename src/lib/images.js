function loadImage(src) {
  let image = new Image();
  image.src = src;
  return image;
}
const IMAGES = {
  SAND1: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileSand1.png?1524279136594"),
  SAND2: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileSand2.png?1524279136824"),
  GRASS1: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileGrass1.png?1524279339317"),
  GRASS2: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileGrass2.png?1524279136388"),
};

export default IMAGES;