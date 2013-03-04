---
date: 2012-07-22 16:56:14
layout: post
slug: create-custom-twitter-share-button
title: Create custom Twitter share button
categories:
- Web Development
tag: php
meta:
---

Default Twitter button doesn't look bad though there is no way to change it background color, border or font size. If we want to change those values then we have to recreate that button and it's quite easy. First we have to create basic button structure:

	<a href="#" class="btn btn-counter" data-count="0">Tweet it</a>

This post is not about html and css so we'll use [button](http://designitcodeit.com/i/9) that I've created some time ago, it's perfect for this. {{more}}

### Getting number of tweets
To get number of tweets, a simple request to this url `http://urls.api.twitter.com/1/urls/count.json?url=URL_HERE` is enough:



We can do that either by PHP or JavaScript, this time we'll use PHP.

	function get_tweets($url)
	{
		$api = "http://urls.api.twitter.com/1/urls/count.json?url=";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
		curl_setopt($ch, CURLOPT_URL, $api.$url);
		$result = json_decode(curl_exec($ch));

		return $result->count;
	}

### Creating button
Let's create another function that will display our button:

	function tweet($url, $text = '', $placeholder = 'Tweet')
	{
		$text   = urlencode($text);
		$url    = urlencode($url);
		$tweets = get_tweets($url);
		$button = sprintf('<a target="_blank" data-count="%d" title="Share on Twitter" href="http://twitter.com/share?text=%s&url=%s" class="btn btn-counter" rel="nofollow">%s</a>​​​​​', $tweets, $text, $url, $placeholder);
		echo $button;
	}

Now it's easy to display Twitter share button anywhere on website, just write `tweet('YOUR_URL', 'YOUR_TEXT')`

### Let's get it even further
Those two function doesn't look bad though it's better to store them in some class:

	class ShareButton
	{
		private static function get_tweets($url)
		{
			$api = "http://urls.api.twitter.com/1/urls/count.json?url=";

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
			curl_setopt($ch, CURLOPT_URL, $api.$url);
			$result = json_decode(curl_exec($ch));

			return $result->count;
		}
		public static function tweet($url, $text = '', $placeholder = 'Tweet')
		{
			$text   = urlencode($text);
			$url    = urlencode($url);
			$tweets = self::get_tweets($url);
			$button = sprintf('<a target="_blank" data-count="%d" title="Share on Twitter" href="http://twitter.com/share?text=%s&url=%s" class="btn btn-counter" rel="nofollow">%s</a>​​​​​', $tweets, $text, $url, $placeholder);
			return $button;
		}
	}

Using this class we have to write `ShareButton::tweet('YOUR_URL', 'YOUR_TEXT')`, yeah I know it's longer than `tweet('YOUR_URL', 'YOUR_TEXT')` but wait, there are still other websites like facebook or tumblr which enables users to share, then why not add this functionality. But I'll leave this for you to play a little with this code.

For Facebook you can use:

	https://www.facebook.com/sharer/sharer.php?u=YOUR_URL

and for Tumblr:

	http://www.tumblr.com/share/link?url=YOUR_URL&name=YOUR_TEXT

The demo is [here](http://demo.idered.pl/blog/ShareButton/) and source [here](http://demo.idered.pl/blog/ShareButton/ShareButton.zip).