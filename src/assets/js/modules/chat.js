/*
* Chat
*/
import { $window, $document, $body } from '../utils/globals.js';

const $array = $('.js-messages span');
const $chat = $('.js-chat');
const $bubble = $('.js-bubble');
let current = 0;
let isMouseOver = false;

function message() {
	$bubble.removeClass('is-active');
	setTimeout(function() {
		$bubble.removeClass('alt');
	}, 300);
	$chat.append($array[current]);

	const bottom = $('.js-chat')[0].scrollHeight + 500;

	if (canScroll()) {
		setTimeout(function() {
			$chat.stop().animate({
				scrollTop: bottom
			}, 600);
		}, 300);
	}

	current += 1;

	setTimeout(function() {
		chat();
	}, 2000);
}

function type(alt) {
	alt && $bubble.addClass('alt');
	$bubble.addClass('is-active');
}

function chat() {
	if (current >= $array.length) {
		return
	}

	if ($array[current].classList.contains('alt')) {
		type(true);
	} else {
		type();
	}

	setTimeout(function() {
		message();
	}, 1000);
}

$document.on('click', function(e) {
	if (e.target == '.js-chat' || e.target.closest('.js-chat')) {
		isMouseOver = true;
	} else {
		isMouseOver = false;
	}
});

function canScroll() {
	return ! isMouseOver
}

setTimeout(function() {
	chat();
}, 500);
