---
date: 2012-07-23 00:27:02
layout: post
slug: the-correct-way-to-handle-pre-tag
title: The correct way to handle pre tag
categories:
- Web Development
tags:
- javascript
- snippet
meta:
---

There are two things that we have to remember when we want embed some code on our website: **it should be highlighted** and **easy to copy**.{{more}}

## Adding code
To add code, we'll use this structure:

	<pre class="prettyprint"><code>...</code></pre>

## Code highlighting
This is easy, we can use [Google Code Prettify](http://code.google.com/p/google-code-prettify/), it's easy to setup and quite universal. We just have to add some CSS and JavaScript, it's all well described [here](http://google-code-prettify.googlecode.com/svn/trunk/README.html).

## Adding "copy" functionality
The idea is simple:
> When user clicks on code then it is replaced with textarea where the code itself is added and selected. When the textarea loses focus, it is reverted to original state.

To accomplish this, we'll use [jQuery](http://jquery.com). Okey, now let's write some JavaScript.


	$("pre").delegate("code", "click", function() {
		// Code
	});
`Each time we click on code tag that is in pre tag, the function is called`

	var $code = $(this),
		$pre  = $(this).parent(),
		$clone= $code.clone(),
		text  = $code.text(),
		height= $code.outerHeight();
`Now we're just setting some variables`

	$code.replaceWith($('<textarea/>'));

	var $textarea = $pre.children('textarea');
`We're replacing code tag with textarea and add it to variable`

	$textarea.height(height).val(text).select();
`We're setting height for textarea as it was for code tag, add text and select it.`

	$textarea.one('blur', function() {
	  $textarea.replaceWith($clone);
	});
`When textarea loses it focus, everything is reverted back`

At the end, code will look like this:

	$("pre").delegate("code", "click", function() {
		var $code = $(this),
			$pre  = $(this).parent(),
			$clone= $code.clone(),
			text  = $code.text(),
			height= $code.outerHeight();

		$code.replaceWith($('<textarea/>'));

		var $textarea = $pre.children('textarea');

		$textarea.height(height).val(text).select();
		$textarea.one('blur', function() {
			$textarea.replaceWith($clone);
		});
	});

And that's all, with this code you can add really great user experience. I've used this technique on this blog so you can test it as you read this post.