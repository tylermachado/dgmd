function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var n = 50,
	width = 1000,
	height = 1000;

var data = [];

var z = 0;

for (i=0; i<(n*n); i++) {
	data.push(i);
}

var color = d3.scale.category20b();

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
	 Math.floor(Math.random()*360)

	 // return i2y(i);
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
			.style("fill", function(d) { return "hsl(" + 380+(Math.sin(d*(z/10))*475) + ",70%,50%)" } )
			// .style("fill", function(d, i) { return "hsl(" + myRandomColor(i) + ",70%,50%)" } )
			// .style("fill", function(d) { return color(d+20) });

	// link.transition().duration(5000).delay(100).style("fill", function(d) { return "hsl(" + d + ",70%,50%)" } );
	// link.transition().duration(2300).delay(100).style("fill", function(d) { return "hsl(" + 250+(Math.sin(d)*456) + ",70%,50%)" } );

    

    z++;
    console.log(z/10);

    setTimeout(generateGrid, 1000);
}

generateGrid();