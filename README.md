# glsl shader loader for webpack

glsl loader for webpack working with chunks writed by [@makio64](https://twitter.com/makio64) & inspired by [ShaderLoader](https://github.com/cabbibo/ShaderLoader) from [@cabbibo](https://twitter.com/cabbibo)

## Getting started

`npm install shader-loader`

``` javascript
var myShader-vx = require("!shader!./myShader-vx.glsl");
// => returns myShader-vx.glsl content as string and with the chunks include
```

## Chunk it!
if you use the synthax $name in your shader it will be replaced by the content of name.glsl ( example with $fog above ) :

``` glsl
void main(void) {
	gl_FragColor = vec4(1.0);
	$fog //replace by the content of chunks/fog.glsl
}
```

## Config webpack
``` javascript
module: {
	loaders: [
		{ test: /\.glsl$/, loader: 'shader' },
	],
},

shader: {
	// chunks folder, chunkpath by default is ""
	chunkPath: "chunks"
}
```

## License
MIT (http://www.opensource.org/licenses/mit-license.php)