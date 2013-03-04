---
date: 2012-11-27 01:16:02
layout: post
slug: better-usage-of-console.log
title: Better usage of console.log
categories:
- Web Development
tags:
- javascript
meta:
---

No one likes to remove console.log from source after finished development but there's a good solution for this. We have to set global variable and use custom wrapper function for console.log.

	var debug = true,
	    _log = function() {
	        debug && window.console && console.log.apply(console, arguments);
	    };

From now we can use `_log` function to log messages in console.

	_log('Yup, this is good.');