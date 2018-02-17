var Noise = require('./lib/noise');
var streamlines = require('@anvaka/streamlines');

var canvas = document.getElementById('scene');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var boundingBox = {left: 1, top: 1, width: 10, height: 10};
var genState, sc;

restart();

function restart() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, width, height);
  canvas.classList.remove('hide-opacity');
  genState = generateRandomState()

  // TODO: This may need to depend on screen size/device performance.
  var dSep = 0.01 + Math.random() / 100;
  var streamLineGeneratorOptions = {
    vectorField: genState.vectorField,
    boundingBox: boundingBox,
    stepsPerIteration: 1000,
    maxTimePerIteration: 32,
    timeStep: 0.01,
    dSep: dSep,
    dTest: dSep *  0.25,
    onPointAdded: onPointAdded,
  };

  sc  = streamlines(streamLineGeneratorOptions)
  sc.run().then(fadeout);
}

function generateRandomState() {
  var perlin = new Noise(Math.round(Math.random() * 5 + 1));
  var freq = Math.random() * 20 + 1;
  var hue = Math.round(Math.random() * 360);

  var vectorField = vectorField0;
  // if (fieldId === 0) vectorField = vectorField0;
  // else if (fieldId === 1) vectorField = vectorField1;
  // else vectorField = vectorField2;

  return {
    vectorField: vectorField,
    getColor: Math.random() < 0.5 ? getColor : getPColor
  };

  function vectorField0(p) {
    var n = perlin.noise(p.x, p.y)
    return {
      x: Math.cos(n * freq),
      y: Math.sin(n * freq)
    }
  }

  function vectorField1(p) {
    var n = perlin.noise(p.x, p.y)
    return {
      x: n * freq,
      y: Math.sin(n * freq)
    }
  }

  function vectorField2(p) {
    var n = perlin.noise(p.x, p.y)
    return {
      y: n * freq,
      x: Math.sin(n * freq)
    }
  }

  function getPColor(p) {
    var n = perlin.noise(p.x, p.y);
    var l = 50 + Math.round(10*(Math.random() - 0.5)); // 900 * n * n * n;
    var h = hue + n * 140;
    return 'hsla(' + h + ', 60%, ' + l + '%, 0.5)';

  }

  function getColor() {
    return 'hsla(' + hue +' , 53%, 68%, 0.51)';
  }
}

function fadeout() {
  // wait a bit before switching to next.
  setTimeout(function() {
    canvas.classList.add('hide-opacity');
    setTimeout(restart, 1000);
  }, 5000);
}

function onPointAdded(a, b) {
  ctx.beginPath();
  ctx.strokeStyle = genState.getColor(a, b),
  a = transform(a);
  b = transform(b);
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.closePath();
}

function transform(pt) {
  var tx = (pt.x - boundingBox.left)/boundingBox.width;
  var ty = (pt.y - boundingBox.top)/boundingBox.height;
  // var ar = width/height;
  //tx /= ar;
  return {
    x: tx * width,
    y: (1 - ty) * height
  }
}
