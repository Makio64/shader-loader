# Glsl loader for webpack

A simple glsl loader for webpack working with chunks writed by [@makio64](https://twitter.com/makio64) & inspired by [ShaderLoader](https://github.com/cabbibo/ShaderLoader) from [@cabbibo](https://twitter.com/cabbibo)

## Getting started

Install:
``` shell
npm install shader-loader --saveDev
```

Config webpack:
``` javascript
module: {
	loaders: [
		{ test: /\.glsl$/, loader: 'shader' },
	],
},
glsl: {
	// chunks folder, chunkpath by default is ""
	chunkPath: __dirname+"/glsl/chunks"
}
```
# Warning : the chunkPath have to be absolute to your glsl folder

You can now require your glsl files:
``` javascript
var shaderVx = require("./shader-vx.glsl");
// => return myShader-vx.glsl as string and with the chunks replaced
```

if you use the synthax $name in your shader.glsl it will be replaced by the content of name.glsl ( example with $fog above ) :

``` glsl
void main(void) {
	gl_FragColor = vec4(1.0);
	$fog //replace by the content of chunks/fog.glsl
}
```

Learn more about loaders & webpack:
http://webpack.github.io/docs/loaders.html

## License
MIT (http://www.opensource.org/licenses/mit-license.php)
