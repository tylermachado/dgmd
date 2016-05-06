function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var n = 50,
	width = 1000,
	height = 1000;

var data = [];

for (i=0; i<(n*n); i++) {
	data.push(i);
}

// var color = d3.scale.category20b();

var gradient = d3.scale.linear()
                    .domain([0, (n*n)])
                    .range([110, 210]);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);



var i2y = function(i) {
	return Math.cos(i);
}

var myRandomColor = function(i) {
	 // Math.floor(Math.random()*360)

	 return i2y(i);
};

function generateGrid() {

	d3.selectAll("rect").remove();

    var link = svg.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("width",width/n)
			.attr("height",height/n)
			.attr("x", function(d) { return (Math.round((d-(n/2))/n)) * (width/n) } )
			.attr("y", function(d) { return (d % n) * (height/n) } )
			.style("fill", function(d) { return "hsl(" + getRandomInt(gradient(d),gradient(d)+25) + ",70%,50%)" } );
			// .style("fill", function(d, i) { return "hsl(" + myRandomColor(i) + ",70%,50%)" } );
			// .style("fill", function(d) { return color(d+20) });

    setTimeout(generateGrid, 50);
}

generateGrid();