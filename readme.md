# cookie.js

cookie.js is a tiny JavaScript library that simplifies cookies. It is capable of setting,
getting and removing cookies, accepts a variety of parameters, and supports chaining.

Original code came from @florian https://github.com/florian/cookie.js

He did a great job, I just want to rewrite it in ES6 (ES2015).

## Browser support

Since code is compiled to ES5, you can guess which browsers it will support: IE9+

## Gulp tasks

I'm using gulp to manage all tasks.

### Build main 'cookie.js' library

```
$ gulp build
```

### Build example with browserify and watch

```
$ gulp
```

### Tests

```
$ gulp test
```