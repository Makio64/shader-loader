var path = require("path");
var fs = require('fs');

var callback;
var chunks;
var finalString;
var queue = 0;
var chunkPath = "";

module.exports = function(source) {
    this.cacheable && this.cacheable();
    
    callback = this.async();

    finalString = source

    if(this.options.glsl.chunkPath)
   		chunkPath =  this.options.glsl.chunkPath

	r = /\$(\w+)/gi
		 
	chunks = {}
	match = source.match( r )
	for (var i = 0; i < match.length; i++) {
		chunks[match[i]] = ''
	};

	if(chunks == null){ 
		onChunksLoaded()
		return ""
	}
	
	for (var key in chunks){
		addChunk.call(this,key);
    };

	return ""
}

function addChunk(key){

	queue++

	var name = key.substr(1, key.length-1)

	var headerPath = path.resolve(this.context+"/"+chunkPath+"/"+name+".glsl");

	this.addDependency(headerPath);
	
	fs.readFile(headerPath, "utf-8", function(err, content) {
		queue--
		chunks[key]=content
		if(err) {
			console.error("Can't open the shader chunk",name,"\n"+err.toString())
		}
		else if(queue==0){
			onChunksLoaded()
		}
    });
}

function onChunksLoaded(){
	for (var key in chunks){
		re = new RegExp("(\\"+key+")", "gi");
		finalString = finalString.replace(re,chunks[key])
	}
	finalString = "module.exports = " + JSON.stringify(finalString)
	callback(null, finalString)
}