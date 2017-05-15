(function() {

	var fetchButton = document.querySelector('button');
	var article = document.querySelector('article');	
	var httpRequest;

	var languages = {
		'English': 'en',
		'中文': 'zh',
		'Español': 'es',
		'हिन्दी': 'hi',
		'اللغة العربية': 'ar',
		'Português': 'pt',
		'বাংলা': 'bn',
		'Русский': 'ru',
		'日本語': 'ja',
		'Français': 'fr'
	}

	fetchButton.addEventListener('click', function() { fetchContent() })

	function fetchContent() {

		// Get search query
		var search = {
			'query': document.getElementById('article-query').value,
			'lang': document.getElementById('article-lang').value
		}
		var endpoint = 'https://' + languages[search['lang']] + '.wikipedia.org/api/rest_v1/page/summary/' + search['query'];

		httpRequest = new XMLHttpRequest();	
		if (!httpRequest) {
	      console.error('Cannot create an XMLHTTP instance');
	      return false;
	    }

		httpRequest.onreadystatechange = parseRequest
		httpRequest.open('GET', endpoint);
		httpRequest.send();
	}

	function parseRequest() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText)
				insertContent(data)
			} else {
				insertError()
			}
		}
	}

	function insertContent(content) {
		article.innerHTML = '<p>' + content['extract'] + '</p>';
		document.getElementById('article-query').value = '';
		document.querySelector('h1').innerHTML = content['displayTitle'];
	}

	function insertError() {
		article.innerHTML = '<p>Sorry your search returned no results</p>';
		document.querySelector('h1').innerHTML = 'Try again!';
	}

})()