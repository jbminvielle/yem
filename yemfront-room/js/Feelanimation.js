if(typeof YEM == 'undefined') YEM = {};


/* --------------------

Feelanimations is the SVG interface which will insert animations
with feelings in the background of the app.


----------------------- */


YEM.Feelanimations = {

	viewport: null,
	animateds: [],

	init: function() {

		YEM.Feelanimations.calculateViewport();
		
		//creating the canvas
		YEM.Feelanimations.drawSpace = Raphael(0, 0, YEM.Feelanimations.viewport.width, YEM.Feelanimations.viewport.height);

		//launch waiting
		YEM.Feelanimations.moveTheSnow();
	},

	render: function(data) {
		console.log(data);
		for (i in data) {
			YEM.Feelanimations.createShapes(data[i].shape, data[i].width, data[i].color);
		};
	},




	// internals

	moveTheSnow: function () {
		YEM.Feelanimations.render([{shape: 'circle', width: 0.5, color: '#fff'}]);
	},

	createShapes: function(shapeType, width, color) {
		var tableShapes = [];

		for(var i=0; i<50; i++) {
			tableShapes[i] = {
				'x': Math.random()*YEM.Feelanimations.viewport.width,
				'y': Math.random()*YEM.Feelanimations.viewport.height,
				'r': Math.random()*width+0.3
			};
		}

		shapes = [];

		for(var i in tableShapes) {
			if(shapeType=='circle') shapes[i] = YEM.Feelanimations.drawSpace[shapeType](tableShapes[i].x, tableShapes[i].y, tableShapes[i].r);
			if(shapeType=='rect') shapes[i] = YEM.Feelanimations.drawSpace[rect](tableShapes[i].x, tableShapes[i].y, tableShapes[i].r, tableShapes[i].r);
			shapes[i].attr("fill", color);
			shapes[i].attr("stroke", "none");

			YEM.Feelanimations.snowAnimation(shapes[i], tableShapes[i].r);
		}
	},

	resetAnim: function() {
		$('svg').animate({'opacity': 0}, 4000, function() {
			for (i in YEM.Feelanimations.animateds) {
				YEM.Feelanimations.animateds[i].stop();
				delete YEM.Feelanimations.animateds[i];
			}
			YEM.Feelanimations.drawSpace.clear();
			$('svg').css('opacity', 1);
		});
	},

	calculateViewport: function() {
		var e = window
		, a = 'inner';
		if ( !( 'innerWidth' in window ) ) {
		
			a = 'client';
			e = document.documentElement || document.body;
		}
		YEM.Feelanimations.viewport = { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	},

	snowAnimation: function(el, speedFactor) {

		if(el.attr('cx') > YEM.Feelanimations.viewport.width)  el.attr('cx', 0);
		if(el.attr('cy') > YEM.Feelanimations.viewport.height) el.attr('cy', 0);

		//var animation = Raphael.animation({cx: YEM.Feelanimations.calculateC('x', el)+10*speedFactor, cy: YEM.Feelanimations.calculateC('y', el)+5*speedFactor}, 1000, 'linear');
		el.animate({cx: YEM.Feelanimations.calculateC('x', el)+10*speedFactor, cy: YEM.Feelanimations.calculateC('y', el)+5*speedFactor}, 1000, 'linear', function() {
			YEM.Feelanimations.snowAnimation(el, speedFactor);
		});
		YEM.Feelanimations.animateds.push(el);

	},

	calculateC: function(direction, el) {
		return el.attr('c'+direction);

	},

}


