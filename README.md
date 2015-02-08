# glsl shader loader for webpack

## Installation
`npm install shader-loader --save`

## Usage
``` javascript
var fileContent = require("!shader!./shader.glsl");
// => returns shader.glsl content as string

```

## Chunk it!
if you use the synthax $chunks in your shader it will be replaced by the content of chunks/noise.glsl

``` glsl
void main(void) {
	gl_FragColor = vec4(1.0);
	$fog //replace by the content of chunks/noise.glsl
}

```

## Options
``` javascript
module: {
	loaders: [
		{ test: /\.glsl$/, loader: 'shader' },
	],
},

shader: {
	// chunks folder, chunkpath by default is ""
	chunkPath: "chunks"
},
```

## License
MIT (http://www.opensource.org/licenses/mit-license.php)