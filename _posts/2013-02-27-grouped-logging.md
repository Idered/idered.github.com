---
date: 2013-02-27 21:31:02
layout: post
slug: grouped-logging
title: Grouped logging
categories:
- Web Development
tags:
- javascript
- workflow
meta:
---

Lets say that we have some `console.log` in our code, some of them are related to contact form other are related to user actions. We can split those logs into 2 sections: `contact-form` and `user-actions`. When we open our website, console displays all of those messages at once but we only want to debug user actions so what do we do? - remove console.log in contact form section? nope, there's better option - grouped logging.

At first lets write down all section names and create a var that will hold only those we want to debug:

	// Values: 'contact-form', user-actions'
	var debug = ['user-actions']

Looks good, this way we won't have to look for the names of groups. Now we only have to create a function that will group logs, here's a code for it:

	var log = function() {
		var args = [],
			first;

		// clone arguments
		Array.prototype.push.apply(args, arguments);

		// we need at least 2 arguments: group name and variable to log
		if (args.length > 1) {
			// get group name
			first = args.shift();

			// look for group name in debug array
			for (var i = 0; i < debug.length; i++)
				if (first === debug[i])
					console.log.apply(console, args);

		} else {
			// We have only 1 argument, there's no group name
			console.log.apply(console, args);
		}
	};

Here's how to use it:

	// This won't be logged because contact-form isn't in debug array
	log('contact-form', 'Response: ', response);
	// Response: {status:  1}

	//  This will be logged in console
	log('user-action', 'Action: ', action);
	// Action: click

That's all folks, thanks for reading!