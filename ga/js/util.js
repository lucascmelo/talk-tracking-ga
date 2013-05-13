var Init = {
	setup:  function(){
		twttr.ready(function(){
			Init.twitter.setup();
		})
		
		Init.scroll.setup();
		
		jQuery('nav a').click(function() {
			value = $(this).attr("href");
			_gaq.push(['_trackEvent', 'menu', value]);
		});
	},
	facebook: {
		setup: function(){
			Init.facebook.like();
			Init.facebook.unlike();
			Init.facebook.sends();
		},
		like: function(){
			FB.Event.subscribe('edge.create', function(targetUrl){
				_gaq.push(['_trackEvent', 'facebook', 'like', targetUrl]);
			});
		},
		unlike: function(){
			FB.Event.subscribe('edge.remove', function(targetUrl) {
				_gaq.push(['_trackEvent', 'facebook', 'unlike', targetUrl]);
			});
		},
		sends: function(){
			FB.Event.subscribe('message.send', function(targetUrl) {
				_gaq.push(['_trackEvent', 'facebook', 'send',targetUrl]);
			});
		}
	},
	twitter: {
		setup: function(){
			Init.twitter.tweet();
			Init.twitter.retweet();
			Init.twitter.follow();
		},
		tweet: function(){
			twttr.events.bind('tweet', function(){
				_gaq.push(['_trackEvent', 'twitter', 'tweet']);
			});
		},
		retweet: function(){
			twttr.events.bind('retweet', function(){
				_gaq.push(['_trackEvent', 'twitter', 'retweet']);
			});
		},
		follow: function(){
			twttr.events.bind('follow', function(){
				_gaq.push(['_trackEvent', 'twitter', 'follow']);
			});
		},
		unfollow: function(){
			twttr.events.bind('unfollow', function(){
				_gaq.push(['_trackEvent', 'twitter', 'unfollow']);
			});
		}
	},
	scroll:{
		setup: function(){
			var flag_percent_50 = 0;
			var flag_percent_100 = 0;
			var flag_px_800 = 0;
		    var flag_px_1200 = 0;

			jQuery(window).scroll(function(){
				var scrollPercent = ScrollPercent();
				var scrollPx = ScrollPx();

				if(scrollPercent >= 50 && scrollPercent <= 60){
					if(flag_percent_50 == 0){ 
						flag_percent_50 = 1;
						_gaq.push(['_trackEvent', 'scroll', '50%']);
					}
				}
				else if(scrollPercent >= 95){
					if(flag_percent_100 == 0){ 
						flag_percent_100 = 1;
						_gaq.push(['_trackEvent', 'scroll', '100%']);
					}
				}

				else if(scrollPx >= 800 && scrollPx < 900){
					if (flag_px_800 == 0){
						flag_px_800 = 1;
						_gaq.push(['_trackEvent', 'scroll', '800px']);
					};
				}

				else if(scrollPx >= 1200){
					if (flag_px_1200 == 0){
						flag_px_1200 = 1;
						_gaq.push(['_trackEvent', 'scroll', '1200px']);
					};
				}

			});

			function ScrollPercent(){
				var bottom = $(window).height() + $(window).scrollTop();
				var height = $(document).height();
				return Math.round(100*bottom/height);
			}

			function ScrollPx(){
				var bottom_px = $(window).height() + $(window).scrollTop();
				return bottom_px;
			}
		}
	}
}

jQuery(document).ready(function() {
	Init.setup();
});
