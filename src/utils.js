/*
 * This function makes use of promises instead of callbacks
 */
export function sendXHRPromise(verb, resource, body, sendToken) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    if (sendToken !== false) xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    // Response received from server. It could be a failure, though!
    xhr.addEventListener('load', function() {
      var statusCode = xhr.status;
      var statusText = xhr.statusText;
      if (statusCode >= 200 && statusCode < 300) {
        // Success: Status code is in the [200, 300) range.
        // Call the callback with the final XHR object.
        resolve(JSON.parse(xhr.responseText));
      } else {
        // Client or server error.
        // The server may have included some response text with details concerning
        // the error.
        var responseText = xhr.responseText;
        let error = `Could not ${verb} ${resource}: Received ${statusCode} ${statusText}: ${responseText}`;

        reject(error);
        //ErrorBanner(error);
      }
    });

    // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
    xhr.timeout = 60000;

    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
      let error = `Could not ${verb} ${resource}: Could not connect to the server.`;
      //ErrorBanner(error); // This is in the global namespace.
      logger(error);
      reject(error);
    });

    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
      let error = `Could not ${verb} ${resource}: Request timed out.`;
      //ErrorBanner(error);
      logger(error);
      reject(error);
    });

    switch (typeof(body)) {
      case 'undefined':
        // No body to send.
        xhr.send();
        break;
      case 'string':
        // Tell the server we are sending text.
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.send(body);
        break;
      case 'object':
        // Tell the server we are sending JSON.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Convert body into a JSON string.
        xhr.send(JSON.stringify(body));
        break;
      default:
        throw new Error('Unknown body type: ' + typeof(body));
    }
  });
}
