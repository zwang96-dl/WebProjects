document.getElementById("app").innerHTML="This is the first packaged program!";
require("./first.js");
require("!style!css!./style.css");

var Vue = require("vue");
new Vue({
	el: "body",
	data: {
		message: "hello vue.js"
	}
});