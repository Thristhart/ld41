import CardGame from "./lib/cardgame";
 
import audio from "./lib/audio";

import City from "./lib/city";

const CARDS = {
  gather1: {
    title: "Gather Material",
    desc: "Add a Building Material to your pool.",
    cost: {},
    img: "https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Flogs.jpg?1524348341380",
    onPlay: function(hand) {
      console.log("gather!", City, City.resources, City.resources.material);
      City.resources.material += 1;
    },
    beforePlay: function(hand) {
      audio.getMaterial();
    },
  },
  buildWorkshop: {
    title: "Build Workshop",
    desc: `Builds a Workshop, a new Deck that will automatically play itself at the start of each turn.
           This card will remove itself from your deck after playing.`,
    cost: {material: 3},
    img: "https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fworkshop.jpg?1524348074572",
    onPlay: function(city, hand) {
      // do the thing
    },
  }
};

export default CARDS;