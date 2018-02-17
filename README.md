# [Noisy lines](https://anvaka.github.io/noisylines/)

This is rather simple application of https://github.com/anvaka/streamlines library to perlin noise.

# How it works?

First I generate a random angle using [this code](https://github.com/anvaka/noisylines/blob/master/lib/noise.js) by Gerard Ferrandez.
Then I assign each point on the canvas a vector, that corresponds to this angle. 

Now we've got a vector field, and we can use [anvaka/streamlines](https://github.com/anvaka/streamlines) to trace its streamlines.

The result is beautiful animation, that progresses from one noise to another. You can open it in background, and just watch, or if you like it - right click and save it as image.

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

