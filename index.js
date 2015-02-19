var path = require('path');
var fs = require('fs');

var chunks;
var finalString;
var chunkPath = "";

module.exports = function(source) {
	this.cacheable && this.cacheable();

	this.callback = this.async();
	if(!this.callback){
		return source
	}

	finalString = source

	if(this.options.glsl.chunkPath){
		chunkPath =  this.options.glsl.chunkPath
	}

	this.queue = 0
	this.isDone = false

	r = /\$(\w+)/gi

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

	var headerPath = path.resolve(this.context+"/"+chunkPath+"/"+name+".glsl");

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
	if(this.isDone)return
	this.isDone = true;

	for (var key in chunks){
		re = new RegExp("(\\"+key+")", "gi");
		finalString = finalString.replace(re,chunks[key])
	}
	finalString = "module.exports = " + JSON.stringify(finalString)

	this.callback(null, finalString)
}
