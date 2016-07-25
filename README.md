# Glsl loader for webpack

Glsl loader for webpack & webpack2. It support chunks & inspire by [ShaderLoader](https://github.com/cabbibo/ShaderLoader)

## Getting started

Install:
``` shell
npm install shader-loader --save-dev
```

Config webpack:
``` javascript
module: {
	loaders: [
		{ test: /\.(glsl|vs|fs)$/, loader: 'shader' },
	],
},
glsl: {
	chunkPath: path(__dirname,"/glsl/chunks")
}
```

You can now require your glsl files:
``` javascript
var vertexShader = require("shader.vs");
var fragmentShader = require("shader.fs");
```

if you use $xxx in your shader its replace by the content of xxx.glsl, for example:

``` glsl
void main(void) {
	$snoise //replace by chunks/snoise.glsl
}
```

Learn more about loaders & webpack:
http://webpack.github.io/docs/loaders.html

## License
MIT (http://www.opensource.org/licenses/mit-license.php)
