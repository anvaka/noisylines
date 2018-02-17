# Noisy lines

[This](https://anvaka.github.io/noisylines/) is rather simple application of [anvaka/streamlines](https://github.com/anvaka/streamlines) library to Perlin noise.

[![noisy lines](https://i.imgur.com/MvSBpOY.gif)](https://anvaka.github.io/noisylines/)

# How does it work?

First, I generate a random angle using [this code](https://github.com/anvaka/noisylines/blob/master/lib/noise.js) by Gerard Ferrandez.
Then, for every point on the canvas, I assign a vector that points at given angle. 

Now we've got a vector field, and we can use [anvaka/streamlines](https://github.com/anvaka/streamlines) to trace its streamlines.

[The result](https://anvaka.github.io/noisylines/) is beautiful animation, that changes from one noise to another. You can open it in background, and just watch, or if you like it - right click and save it as image.

Also feel free to [play with code] - it's very short.


## Building locally

```
git clone https://github.com/anvaka/noisylines
cd noisylines
npm install
npm run build
```

Now you can open `index.html` file and get the animation running locally. If you change `index.js` file - you'll need to
manually run `npm run build` every time.

# License

MIT

