/**
 * @file
 * JS for mobile devices.
 *
 */

/*global jQuery, window, WebSocket */

/**
 * Returns a URL parameter by name.
 */
jQuery.urlParam = function (name) {

  // Get the search query.
  var urlParams = window.location.search;

  // Remove the ? if it exists on the front of the string.
  if (urlParams.indexOf('?') === 0) {
    urlParams = urlParams.substr(1);
  }

  // Split the parameters by &.
  urlParams = urlParams.split('&');

  // Loop through each parameter
  var i, param;
  for (i = 0; i < urlParams.length; i++) {

    // Split the string by =.
    param = urlParams[i].split('=');

    // If the parameter name matches the requested parameter, return the value.
    if (param[0] === name && param[1] !== undefined) {
      return param[1];
    }
  }

  // Otherwise return null.
  return null;
};

/**
 * On document ready.
 */
jQuery(document).ready(function ($) {

  // Get the domain.
  var host = window.location.hostname;

  // Create a websocket object. Do something for IE.
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  // Create a connection to the server.
  var connection = new WebSocket('ws://' + host + ':1337');

  // When a connection is opened.
  connection.onopen = function () {

    // Get the ID from the URL.
    // TODO: Do some error checking to make sure it's there.
    var uniqueID = $.urlParam('id');

    // Send the unique ID back to the client.
    var msg = JSON.stringify({ type: 'connect', data: 'mobile', uniqueID: uniqueID });
    connection.send(msg);
  };

  // When the connection errors.
  connection.onerror = function (error) {
      // TODO: Implement error notifications when sending/receiving data.
  };

  // When a message is received from the server.
  connection.onmessage = function (message) {
      // Try to decode json.
      // try {
      //   var json = JSON.parse(message.data);
      // }
      // catch (e) {
      //   console.log('This doesn\'t look like a valid JSON: ', message.data);
      //   return;
      // }
      // Handle incoming message.
  };


  // Process scroll requests and send them to the server.
  $('.scroll').bind('click', function (e) {

    e.preventDefault();

    // Send the mssage to the server.
    var msg = JSON.stringify({ type: 'scroll_request', data: $(this).prop('id') });
    connection.send(msg);
  });


});
