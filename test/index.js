"use strict";

var http = require("http"),
	owe = require("owe.js"),
	oweFs = require("../src"),
	oweHttp = require("owe-http");

var fs = oweFs({
	root: __dirname,
	index: false,
	onError: function(err, isHttp) {
		if(!isHttp)
			return err;

		return `<h1>Error ${err.status}</h1>`;
	}
});

fs("derp", true).then(function(res) {
	console.log("" + res);
}, function(err) {
	console.log(err);
});

http.createServer(
	oweHttp(
		owe.api(fs)
	)
).listen(5004);
