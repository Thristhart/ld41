class AudioController {
  constructor() {
    this.cardSounds = {};
    this.specificSounds = {};
    
    this.cardSounds.drawCard = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fdraw%20card.wav?1524337162393");
    this.cardSounds.playCard = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fcard%20from%20hand%20to%20play.wav?1524337150629");
    
    this.specificSounds.material = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fbuilding%20material.wav?1524352767755");
  }
  loadAudio(url) {
    let audio = document.createElement("audio");
    audio.src = url;
    audio.volume = 0.5;
    return audio;
  }
  playAudioFromStart(audio) {
    audio.currentTime = 0;
    audio.play();
  }
  drawCard() {
    this.playAudioFromStart(this.cardSounds.drawCard);
  }
  playCard() {
    this.playAudioFromStart(this.cardSounds.playCard);
  }
  getMaterial() {
    this.playAudioFromStart(this.specificSounds.material);
  }
}

let audio = new AudioController();

export default audio;