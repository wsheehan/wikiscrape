(function() {

	var fetchButton = document.querySelector('button');
	var article = document.querySelector('article');	
	var httpRequest;

	fetchButton.addEventListener('click', function() { fetchContent() })

	function fetchContent() {

		// Get search query
		var query = document.getElementById('article-query').value;
		console.log("FETCH CONTENT");

		httpRequest = new XMLHttpRequest();	

		if (!httpRequest) {
	      console.error('Cannot create an XMLHTTP instance');
	      return false;
	    }

		httpRequest.onreadystatechange = parseRequest
		httpRequest.open('GET', 'https://en.wikipedia.org/api/rest_v1/page/summary/' + query, false);
		httpRequest.send();
	}

	function parseRequest() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText)
				insertContent(data)
			} else {
				// Handle error
			}
		}
	}

	function insertContent(content) {
		console.log("INSERT CONTENT");
		article.innerHTML = "<p>" + content['extract'] + "</p>";
	}

})()