var path = require('path');
var fs = require('fs');

var chunks;
var chunkPath = "";

module.exports = function(source) {
	this.cacheable && this.cacheable();

	this.callback = this.async();

	this.finalString = source

	if(this.options.glsl && this.options.glsl.chunkPath){
		chunkPath =  this.options.glsl.chunkPath
	}

	this.queue = 0
	this.isDone = false

	r = /\$[\w-.]+/gi

	chunks = {}
	match = source.match( r )

	if(match){
		for (var i = 0; i < match.length; i++) {
			chunks[match[i]] = ""
		}
	} else {
		onChunksLoaded.call(this)
	}

	for (var key in chunks){ this.queue++ }
	for (var key in chunks){ addChunk.call(this,key); }

}

function addChunk(key){

	var name = key.substr(1, key.length-1)

	var headerPath = path.resolve(chunkPath+"/"+name+".glsl");

	this.dependency(headerPath);

	var scope = this;

	fs.readFile(headerPath, "utf-8", function(err, content) {
		scope.queue--
		chunks[key]=content
		if(err) {
			chunks[key]=""
			console.error("Can't open the shader chunk",name,"\n"+err.toString())
		}
		else if(scope.queue===0){
			onChunksLoaded.call(scope)
		}
	});
}

function onChunksLoaded(){
	if(this.isDone){
		return
	}
	this.isDone = true;

	for (var key in chunks){
		re = new RegExp("(\\"+key+")", "gi");
		this.finalString = this.finalString.replace(re,chunks[key])
	}
	this.finalString = "module.exports = " + JSON.stringify(this.finalString)

	this.callback(null, this.finalString)
}
