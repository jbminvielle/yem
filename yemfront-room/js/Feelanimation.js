if(typeof YEM == 'undefined') YEM = {};

	$(function () {
		var viewport = viewport();
		var universe = Raphael(0, 0, viewport.width, viewport.height);

		var tableEtoiles = [];

		for(var i=0; i<50; i++) {
			tableEtoiles[i] = {
				'x': Math.random()*viewport.width,
				'y': Math.random()*viewport.height,
				'r': Math.random()*0.5+0.3
			};
		}

		etoiles = [];

		for(var i in tableEtoiles) {
			etoiles[i] = universe.circle(tableEtoiles[i].x, tableEtoiles[i].y, tableEtoiles[i].r);
			etoiles[i].attr("fill", "#fff");
			etoiles[i].attr("stroke", "none");

			spaceAnimation(etoiles[i], tableEtoiles[i].r);
		}

		function viewport() {
			var e = window
			, a = 'inner';
			if ( !( 'innerWidth' in window ) ) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		}

		function spaceAnimation(el, speedFactor) {
			if(el.attr('cx') > viewport.width)  el.attr('cx', 0);
			if(el.attr('cy') > viewport.height) el.attr('cy', 0);
			el.animate({cx: el.attr('cx')+10*speedFactor, cy: el.attr('cy')+5*speedFactor}, 1000, 'linear', function() {
				spaceAnimation(el, speedFactor);
			});

		}
	});