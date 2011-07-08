(function($){
$.helpme = {
	init: function(url, debug){
		/**
		* 	'url' is the URL to the file that
		* 	contains the help text data in the
		* 	following format
		*
		* 	{
		* 		".selector": "help text for this selector",
		* 		"#selector": "help text for THIS selector",
		* 		...
		* 	}
		*/
		debug = (debug != undefined) ? true : false;
		if(!debug){
			console = {log: function(){}, group: function(){}, groupEnd: function(){}}
		}
		
		if($.helpme.options.ran){//has already been run, just show the mask
			$("#helpmejs_mask").show();
			return;
		}

		var _data;
		console.group('incoming');
		console.log('url: ', url);

		var xhr = $.getJSON(url, function(d){ 
						console.log('data:', d);
						console.groupEnd(); 
						_data = d;
						doHelp();
					})
					.error(function(){ 
						console.log("failed: ", xhr.status + ' ~ ' + xhr.responseText);
						console.groupEnd();
					});

		function doHelp(){
			//mask that will hold all help tags
			var mask = $("<div id='helpmejs_mask'></div>");
				mask.width($(document).width()+"px").height($(document).height()+"px");
				$("body").append(mask);

			//build and append tags
			$.each(_data, function(i,v){
				var ele = $(i);
					if(!ele.length || !ele.is(":visible"))
						return;//if some idiot added a tooltip for a selector that doesn't exist or element is hidden

				var ele_x = ele.offset().left; //
				var ele_y = ele.offset().top; //I <3 jQuery
				var ele_w = ele.get(0).offsetWidth;
				var ele_h = ele.get(0).offsetHeight;

				console.group('element:', i);
				console.log('x', ele_x);
				console.log('y', ele_y);
				console.log('width', ele_w);
				console.log('height', ele_h);
				console.groupEnd();
				
				/*
				* tag 			# container
				* 	- label		# ?
				* 	- tooltip	# actual help text
				*/
				var tag = $("<div class='tag'></div>");
					tag.css({
								'left':(ele_x+ele_w+5)+'px',
								'top':ele_y+'px'
							});
					
				var label = $("<div class='label'>?</div>");
					tag.hover(function(){
							$(i).addClass('helpmejs_highlight');

							var tt = $(this).children('.tooltip');
							
							console.group('current tooltip:',i);
							console.log('ele_y', ele_y);
							console.log('tooltip height', tt.get(0).offsetHeight);
							console.log('window scroll', window.scrollY);
							console.log('sum', (ele_y+tt.get(0).offsetHeight)); 
							console.log('window height', window.innerHeight+window.scrollY);
							console.groupEnd();

							if((ele_y+tt.get(0).offsetHeight+20) > window.innerHeight+window.scrollY){// too far down, put tooltip at top
								console.log("tooltip pos: ", 'top');
								tt.addClass('top');
							} else {
								console.log("tooltip pos: ", 'bottom');
								tt.addClass('bottom');
							}
						},
						function(){
							var tt = $(this).children('.tooltip');
							$(i).removeClass('helpmejs_highlight');
							tt.removeClass('bottom top');
						});

				var tooltip = $("<div class='tooltip'><div class='ua'></div>"+v+"<div class='da'></div></div>");

					tag.append(label).append(tooltip);
				mask.append(tag);
			});

			$.helpme.options.ran = 1;
		}
	},
	hide: function(){
		$('#helpmejs_mask').hide();
	},
	options: {
		ran:0
	}
}
})(jQuery);
