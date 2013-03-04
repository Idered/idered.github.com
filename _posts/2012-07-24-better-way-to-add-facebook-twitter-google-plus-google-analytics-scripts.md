---
date: 2012-07-24 14:50:02
layout: post
slug: better-way-to-add-facebook-twitter-google-plus-google-analytics-scripts
title: Better way to add Facebook, Twitter, Google Plus and any other external scripts
categories:
- Web Development
tag: javascript, snippet
meta:
---

Every time I've to embed facebook, twitter or any other external script on website, it takes longer than it should and my code get messy. But no longer, with this code it's easier to embed scripts from external source. {{more}}

	<script type="text/javascript">
	  var scripts = {
	    'facebook-jssdk': '//connect.facebook.net/en_US/all.js#xfbml=1',
	    'googleplus'    : 'https://apis.google.com/js/plusone.js',
	    'twitter-wjs'   : '//platform.twitter.com/widgets.js',
	    'analytics'     : ('https:'==location.protocol?'//ssl':'//www') + '.google-analytics.com/ga.js'
	  }, script, _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];

	  for (var id in scripts) {
	    script = document.createElement('script'); script.src = scripts[id];
	    script.id = id;script.type = 'text/javascript'; script.async = true;
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
	  }
	</script>

Although it's just a loop, it's really useful and helps to manage all those scripts.

**Don't forget to add `<div id="fb-root"></div>` to your markup when you're using facebook.**

