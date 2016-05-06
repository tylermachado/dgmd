var days = new Date().getFullYear() % 4 == 0 ? 366 : 365;

var millisecondsInDay = 1000 * 60 * 60 * 24;

var now = new Date();

var jan1 = new Date(now.getFullYear(), 0, 1);

var soFarThisYear = now - jan1;

var dayNumber = Math.ceil(soFarThisYear / millisecondsInDay);