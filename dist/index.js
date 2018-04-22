(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cardgame = require("./lib/cardgame");

var _cardgame2 = _interopRequireDefault(_cardgame);

var _audio = require("./lib/audio");

var _audio2 = _interopRequireDefault(_audio);

var _city = require("./lib/city");

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CARDS = {
  gather1: {
    title: "Gather Material",
    desc: "Add a Building Material to your pool.",
    cost: {},
    img: "https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Flogs.jpg?1524348341380",
    onPlay: function onPlay(hand) {
      console.log("gather!", _city2.default, _city2.default.resources, _city2.default.resources.material);
      _city2.default.resources.material += 1;
    },
    beforePlay: function beforePlay(hand) {
      _audio2.default.getMaterial();
    }
  },
  buildWorkshop: {
    title: "Build Workshop",
    desc: "Builds a Workshop, a new Deck that will automatically play itself at the start of each turn.\n           This card will remove itself from your deck after playing.",
    cost: { material: 3 },
    img: "https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fworkshop.jpg?1524348074572",
    onPlay: function onPlay(city, hand) {
      // do the thing
    }
  }
};

exports.default = CARDS;

},{"./lib/audio":4,"./lib/cardgame":6,"./lib/city":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TILE_SIZE = exports.TILE_SIZE = 64;
var CITY_WIDTH = exports.CITY_WIDTH = 128;
var CITY_HEIGHT = exports.CITY_HEIGHT = 128;

},{}],3:[function(require,module,exports){
"use strict";

var _renderer = require("./lib/renderer");

var _renderer2 = _interopRequireDefault(_renderer);

var _city = require("./lib/city");

var _city2 = _interopRequireDefault(_city);

var _cardgame = require("./lib/cardgame");

var _cardgame2 = _interopRequireDefault(_cardgame);

var _cards = require("./cards");

var _cards2 = _interopRequireDefault(_cards);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("city");

function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

onResize();

window.addEventListener("resize", onResize);

canvas.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  return false;
});

window.debug = _cardgame2.default;

var renderer = new _renderer2.default(canvas);
_cardgame2.default.registerGlobalDragEvents();

renderer.camera.x = _constants.TILE_SIZE * _constants.CITY_WIDTH / 2;
renderer.camera.y = _constants.TILE_SIZE * _constants.CITY_HEIGHT / 2;

var lastUpdateTime = null;

function update(timestamp) {
  requestAnimationFrame(update);

  if (lastUpdateTime === null) {
    lastUpdateTime = timestamp;
  }

  var dt = timestamp - lastUpdateTime;

  renderer.update(dt);

  lastUpdateTime = timestamp;
}

_cardgame2.default.createAndAddCardToHand(_cards2.default.gather1);
_cardgame2.default.createAndAddCardToHand(_cards2.default.gather1);
_cardgame2.default.createAndAddCardToHand(_cards2.default.gather1);
_cardgame2.default.createAndAddCardToHand(_cards2.default.buildWorkshop);

requestAnimationFrame(update);

},{"./cards":1,"./constants":2,"./lib/cardgame":6,"./lib/city":7,"./lib/renderer":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioController = function () {
  function AudioController() {
    _classCallCheck(this, AudioController);

    this.cardSounds = {};
    this.specificSounds = {};

    this.cardSounds.drawCard = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fdraw%20card.wav?1524337162393");
    this.cardSounds.playCard = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fcard%20from%20hand%20to%20play.wav?1524337150629");

    this.specificSounds.material = this.loadAudio("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2Fbuilding%20material.wav?1524352767755");
  }

  _createClass(AudioController, [{
    key: "loadAudio",
    value: function loadAudio(url) {
      var audio = document.createElement("audio");
      audio.src = url;
      audio.volume = 0.5;
      return audio;
    }
  }, {
    key: "playAudioFromStart",
    value: function playAudioFromStart(audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }, {
    key: "drawCard",
    value: function drawCard() {
      this.playAudioFromStart(this.cardSounds.drawCard);
    }
  }, {
    key: "playCard",
    value: function playCard() {
      this.playAudioFromStart(this.cardSounds.playCard);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial() {
      this.playAudioFromStart(this.specificSounds.material);
    }
  }]);

  return AudioController;
}();

var audio = new AudioController();

exports.default = audio;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    _classCallCheck(this, Camera);

    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }

  _createClass(Camera, [{
    key: "translateMousePosition",
    value: function translateMousePosition(x, y) {
      var translated = { x: x, y: y };

      translated.x = x / this.scale - window.innerWidth * 0.5 / this.scale;
      translated.y = y / this.scale - window.innerHeight * 0.5 / this.scale;

      translated.x += this.x;
      translated.y += this.y;

      return translated;
    }
  }, {
    key: "width",
    get: function get() {
      return window.innerWidth / this.scale;
    }
  }, {
    key: "height",
    get: function get() {
      return window.innerHeight / this.scale;
    }
  }]);

  return Camera;
}();

exports.default = Camera;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hand = require("./hand");

var _hand2 = _interopRequireDefault(_hand);

var _city = require("./city");

var _city2 = _interopRequireDefault(_city);

var _audio = require("./audio");

var _audio2 = _interopRequireDefault(_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cardTemplate = document.getElementById("cardTemplate");

var cardBeingDragged = null;
var dragOffsetX = null;
var dragOffsetY = null;
var dragStartX = null;
var dragStartY = null;

var hand = new _hand2.default(document.getElementById("hand"));

var CardGame = function () {
  function CardGame() {
    _classCallCheck(this, CardGame);
  }

  _createClass(CardGame, null, [{
    key: "createCard",
    value: function createCard(cardData) {
      var card = document.importNode(cardTemplate.content, true);
      card.querySelector("h1").innerHTML = cardData.title;
      card.querySelector("p").innerHTML = cardData.desc.replace(/\n/g, "<br>");
      for (var key in cardData.cost) {
        var costSpan = document.createElement("span");
        costSpan.className = "cost " + key;
        costSpan.innerHTML = cardData.cost[key];
        card.querySelector(".costs").appendChild(costSpan);
      }
      card.querySelector("img").src = cardData.img;

      var cardElement = card.querySelector("card");
      cardElement.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        return false;
      });
      cardElement.addEventListener("mousedown", function (event) {
        if (cardBeingDragged && event.which !== 1) {
          cardBeingDragged.style.transform = "";
          delete cardBeingDragged.dataset.droppable;
          cardBeingDragged = null;
          return;
        }
        var rect = cardElement.getBoundingClientRect();
        var offsetX = event.clientX - rect.left;
        var offsetY = event.clientY - rect.top;

        cardBeingDragged = cardElement;
        dragOffsetX = offsetX;
        dragOffsetY = offsetY;

        dragStartX = event.clientX;
        dragStartY = event.clientY;
        event.preventDefault();
      });

      cardElement.callback = function () {
        if (cardData.onPlay) {
          cardData.onPlay(hand);
        }
      };

      cardElement.beforePlayCallback = function () {
        if (cardData.beforePlay) {
          cardData.beforePlay(hand);
        }
      };

      return card;
    }
  }, {
    key: "createAndAddCardToHand",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cardData) {
        var card;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                card = this.createCard(cardData);
                return _context.abrupt("return", this.hand.addCard(card));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createAndAddCardToHand(_x) {
        return _ref.apply(this, arguments);
      }

      return createAndAddCardToHand;
    }()
  }, {
    key: "registerGlobalDragEvents",
    value: function registerGlobalDragEvents() {
      var _this = this;

      document.body.addEventListener("mousemove", function (event) {
        if (!cardBeingDragged) {
          return;
        }
        var rect = document.body.getBoundingClientRect();
        var offsetX = event.clientX - rect.left;
        var offsetY = event.clientY - rect.top;

        var dx = offsetX - dragStartX;
        var dy = offsetY - dragStartY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > cardBeingDragged.getBoundingClientRect().height / 3) {
          cardBeingDragged.dataset.droppable = true;
        } else {
          delete cardBeingDragged.dataset.droppable;
        }

        cardBeingDragged.style.transform = "translate(" + (offsetX - dragStartX) + "px, " + (offsetY - dragStartY) + "px)";
      });
      document.body.addEventListener("mouseup", function (event) {
        if (cardBeingDragged) {
          if (cardBeingDragged.dataset.droppable) {
            _this.playCard(cardBeingDragged, event.clientX, event.clientY);
          } else {
            cardBeingDragged.style.transform = "";
          }
          delete cardBeingDragged.dataset.droppable;
          cardBeingDragged = null;
        }
      });
    }
  }, {
    key: "playCard",
    value: function playCard(card, mouseX, mouseY) {
      card.beforePlayCallback();
      var position = card.getBoundingClientRect();
      hand.removeCard(card);
      card.classList.add("playAnim");
      document.body.appendChild(card);
      card.style.transform = "translate(" + (mouseX - dragOffsetX) + "px, " + (mouseY - dragOffsetY) + "px)";
      _audio2.default.playCard();
      setTimeout(function () {
        document.body.removeChild(card);
        card.callback();
      }, 400);
    }
  }]);

  return CardGame;
}();

CardGame.hand = hand;

exports.default = CardGame;

},{"./audio":4,"./city":7,"./hand":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = require("./tile");

var _tile2 = _interopRequireDefault(_tile);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var City = function () {
  function City() {
    _classCallCheck(this, City);
  }

  _createClass(City, null, [{
    key: "getTile",
    value: function getTile(x, y) {
      if (x < 0 || y < 0 || x >= this.tiles.length || y >= this.tiles[0].length) {
        return null;
      }
      return this.tiles[x][y];
    }
  }]);

  return City;
}();

City.tiles = [];
for (var x = 0; x < _constants.CITY_WIDTH; x++) {
  City.tiles[x] = [];
  for (var y = 0; y < _constants.CITY_HEIGHT; y++) {
    City.tiles[x][y] = new _tile2.default(x, y);
  }
}

var Resources = function () {
  function Resources() {
    _classCallCheck(this, Resources);
  }

  _createClass(Resources, null, [{
    key: "materials",
    get: function get() {
      console.log("getter on materials", this._materials);
      return this._materials;
    },
    set: function set(newValue) {
      console.log("setter on materials", this._materials, newValue);
      this._materials = newValue;
      document.getElementById("materials").innerHTML = newValue;
    }
  }, {
    key: "infrastructure",
    get: function get() {
      return this._infrastructure;
    },
    set: function set(newValue) {
      this._infrastructure = newValue;
      document.getElementById("infrastructure").innerHTML = newValue;
    }
  }, {
    key: "labour",
    get: function get() {
      return this._labour;
    },
    set: function set(newValue) {
      this._labour = newValue;
      document.getElementById("labour").innerHTML = newValue;
    }
  }, {
    key: "knowledge",
    get: function get() {
      return this._knowledge;
    },
    set: function set(newValue) {
      this._knowledge = newValue;
      document.getElementById("knowledge").innerHTML = newValue;
    }
  }, {
    key: "food",
    get: function get() {
      return this._food;
    },
    set: function set(newValue) {
      this._food = newValue;
      document.getElementById("food").innerHTML = newValue;
    }
  }]);

  return Resources;
}();

Resources.materials = 0;
Resources.infrastructure = 0;
Resources.labour = 0;
Resources.knowledge = 0;
Resources.food = 0;

City.resources = Resources;

window.testCity = City;

exports.default = City;

},{"../constants":2,"./tile":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audio = require("./audio");

var _audio2 = _interopRequireDefault(_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handElement = document.getElementById("hand");

var Hand = function () {
  function Hand(container) {
    _classCallCheck(this, Hand);

    this.container = container;
    this.firstCard = null;
  }

  _createClass(Hand, [{
    key: "addCard",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(card) {
        var cardElem, amountOfCardsInHand;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cardElem = card.querySelector("card");


                if (!this.firstCard) {
                  this.firstCard = cardElem;
                }

                this.container.appendChild(card);

                amountOfCardsInHand = handElement.querySelectorAll("card").length;

                this.container.dataset.cardcount = amountOfCardsInHand;
                if (amountOfCardsInHand > 6) {
                  this.burnFirstCard();
                }

                _audio2.default.drawCard();

                cardElem.classList.add("enterHandAnim");
                _context.next = 10;
                return new Promise(function (resolve) {
                  cardElem.addEventListener("animationend", function (event) {
                    if (event.animationName === "addCardToHandAnimation") {
                      resolve();
                    }
                  });
                });

              case 10:
                cardElem.classList.remove("enterHandAnim");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addCard(_x) {
        return _ref.apply(this, arguments);
      }

      return addCard;
    }()
  }, {
    key: "burnFirstCard",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.burnCard(this.firstCard));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function burnFirstCard() {
        return _ref2.apply(this, arguments);
      }

      return burnFirstCard;
    }()
  }, {
    key: "findNewFirstCard",
    value: function findNewFirstCard() {
      this.firstCard = null;
      for (var i = 0; i < this.container.children.length; i++) {
        var possible = this.container.children[i];
        if (possible.classList.contains("burnCardAnim")) {
          continue;
        }
        this.firstCard = possible;
        break;
      }
    }
  }, {
    key: "burnCard",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(card) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                card.classList.add("burnCardAnim");
                if (this.firstCard === card) {
                  this.findNewFirstCard();
                }
                _context3.next = 4;
                return new Promise(function (resolve) {
                  card.addEventListener("animationend", function (event) {
                    if (event.animationName === "burnCardAnimation") {
                      resolve();
                    }
                  });
                });

              case 4:
                card.classList.remove("burnCardAnim");
                return _context3.abrupt("return", this.removeCard(card));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function burnCard(_x2) {
        return _ref3.apply(this, arguments);
      }

      return burnCard;
    }()
  }, {
    key: "removeCard",
    value: function removeCard(card) {
      if (this.firstCard === card) {
        this.findNewFirstCard();
      }
      this.container.removeChild(card);
      var amountOfCardsInHand = handElement.querySelectorAll("card").length;
      this.container.dataset.cardcount = amountOfCardsInHand;
    }
  }]);

  return Hand;
}();

exports.default = Hand;

},{"./audio":4}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function loadImage(src) {
  var image = new Image();
  image.src = src;
  return image;
}
var IMAGES = {
  SAND1: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileSand1.png?1524279136594"),
  SAND2: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileSand2.png?1524279136824"),
  GRASS1: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileGrass1.png?1524279339317"),
  GRASS2: new loadImage("https://cdn.glitch.com/50417417-4282-49c9-ab43-b5448f9f2946%2FtileGrass2.png?1524279136388")
};

exports.default = IMAGES;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = require("./camera");

var _camera2 = _interopRequireDefault(_camera);

var _city = require("./city");

var _city2 = _interopRequireDefault(_city);

var _constants = require("../constants");

var _images = require("./images");

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(canvas) {
    _classCallCheck(this, Renderer);

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.camera = new _camera2.default();
  }

  _createClass(Renderer, [{
    key: "update",
    value: function update(dt) {
      this.context.save();

      this.context.translate(this.canvas.width / 2 - this.camera.x * this.camera.scale, this.canvas.height / 2 - this.camera.y * this.camera.scale);
      this.context.scale(this.camera.scale, this.camera.scale);

      var leftBound = this.camera.x - this.camera.width / 2;
      var rightBound = this.camera.x + this.camera.width / 2;

      var topBound = this.camera.y - this.camera.height / 2;
      var bottomBound = this.camera.y + this.camera.height / 2;

      var leftCityBound = Math.floor(leftBound / _constants.TILE_SIZE);
      var rightCityBound = Math.ceil(rightBound / _constants.TILE_SIZE);

      var topCityBound = Math.floor(topBound / _constants.TILE_SIZE);
      var bottomCityBound = Math.ceil(bottomBound / _constants.TILE_SIZE);

      this.context.clearRect(this.camera.x - this.camera.width / 2, this.camera.y - this.camera.height / 2, this.camera.width, this.camera.height);

      for (var x = leftCityBound; x < rightCityBound; x++) {
        for (var y = topCityBound; y < bottomCityBound; y++) {
          var tile = _city2.default.getTile(x, y);
          if (tile) {
            this.context.drawImage(_images2.default.GRASS1, x * _constants.TILE_SIZE, y * _constants.TILE_SIZE, _constants.TILE_SIZE, _constants.TILE_SIZE);
          }
        }
      }

      this.context.restore();
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

},{"../constants":2,"./camera":5,"./city":7,"./images":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile(x, y) {
  _classCallCheck(this, Tile);

  this.x = x;
  this.y = y;
  this.type = "grass";
};

exports.default = Tile;

},{}]},{},[3])

//# sourceMappingURL=index.js.map
