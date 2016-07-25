var path = require('path')
var fs = require('fs')

var chunks
var chunkPath = ""
var callback = null
var finalString = ""

module.exports = function(source) {

	console.log(source)
	this.cacheable && this.cacheable()
	callback = this.async()

	finalString = source
	this.queue = 0
	this.isDone = false

	if(this.options.glsl && this.options.glsl.chunkPath){
		chunkPath =  this.options.glsl.chunkPath
	}

	var r = /\$[\w-.]+/gi

	var chunks = {}
	var match = source.match( r )

	if(match){
		for (var i = 0; i < match.length; i++) {
			chunks[match[i]] = ""
		}
	} else {
		onChunksLoaded.call(this)
	}

	for (var key in chunks){this.queue++}
	for (var key in chunks){
		addChunk.call(this,key);
	}
}

function addChunk(key){
	var scope = this;
	var name = key.substr(1, key.length-1)
	var headerPath = path.resolve(chunkPath+"/"+name+".glsl");

	this.dependency(headerPath)

	fs.readFile(headerPath, "utf-8", function(err, content) {
		scope.queue--
		chunks[key]=content
		if(err) {
			chunks[key]=""
			console.error("Can't open the shader chunk "+name+":\n"+err.toString())
		}
		if(scope.queue==0){
			onChunksLoaded.call(scope)
		}
	})
}

function onChunksLoaded(){
	if(this.isDone){ return }
	this.isDone = true

	for (var key in chunks){
		re = new RegExp("(\\"+key+")", "gi")
		finalString = finalString.replace(re,chunks[key])
	}
	finalString = "module.exports = " + JSON.stringify(finalString)
	console.log(finalString)
	callback(null, finalString)
}
