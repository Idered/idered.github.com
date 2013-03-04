---
date: 2013-02-25 22:09:02
layout: post
slug: send-forms-using-ctrl-enter
title: Send forms using Ctrl + Enter
categories:
- Web Development
tag: javascript, snippet, ux
meta:
---

Many times, after I finish writting my comment or post, I press `Ctrl + Enter` and ... nothing. That's too bad, form should be sent after I press that shortcut but nothing happens. Here's a snippet which will help you add this function for your forms:

	var isCtrl = false;

	$('textarea, input').keyup(function(e) {
		if (e.which == 17) isCtrl = false;
	}).keydown(function(e) {
		if (e.which == 17) isCtrl = true;
		if (e.which == 13 && isCtrl === true) {
			$(this).closest('form').submit();
			return false;
		}
	});

{{more}}