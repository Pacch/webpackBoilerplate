Webpack 4 Boilerplate
===========

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go. 
If you don’t want to work with lodash, just remove it from the node packages and the webpack config.

## Setup
Install dependencies
```sh
$ npm install
```

This <strong>Webpack 4 Boilerplate</strong> comes with 3 builds:

## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)
```sh
$ npm run watch or npm run dev
```
## Deployment
Build the current application
```sh
$ npm run prod
```
-> creates prod files to <code>/dist</code> with:


1. compiles sass to css <br>
2. autoprefixer for browser compability <br>
3. compiles ES6/ES7/ES8 to ES5 <br>
4. minifying for css/js <br>
5. uglyfing js code <br>
6. hash css and js file (file versioning for browser caching) <br>

* BABEL JS
* SASS
* PUG MULTIPLE FILES PUG
* OPTIMIZED FILES 
* WEBPACK 4
