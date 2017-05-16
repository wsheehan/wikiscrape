(function() {

	// global declarations
	var fetchButton = document.querySelector('button');
	var article = document.querySelector('article');
	var form = document.querySelector('form');
	var articleWrapper = document.getElementById('article-wrapper');	
	var httpRequest;

	// All of our languages
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

	    // perform ajax request
		httpRequest.onreadystatechange = parseRequest
		httpRequest.open('GET', endpoint);
		httpRequest.send();
	}

	// parse request success
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

	// Handle successful request
	function insertContent(content) {
		article.innerHTML = '<p>' + content['extract'] + '</p>';
		document.getElementById('article-query').value = '';
		document.querySelector('h1').innerHTML = content['displaytitle'];

		// clear error
		document.getElementById('fetch-error').style.display = 'none';
		fetchButton.style.border = 'none';

		// close menu on success
		if (window.innerWidth < 700) {
			closeMenu();
		}
	}

	// Handle unsuccessful request
	function insertError() {
		fetchButton.style.border = '1px solid red';
		document.getElementById('fetch-error').style.display = 'inline-block';
	}

	// Mobile Menu config
	var menu = document.getElementById('hamburger-menu');
	var open = true;
	var cancelUrl = 'https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_close-128.png';
	var hamburgerUrl = 'https://cdn2.iconfinder.com/data/icons/ios-tab-bar/25/Hamburger_Round-128.png';

	if (window.innerWidth < 700) {
		menu.src = cancelUrl;
	}

	menu.addEventListener('click', function() {
		open ? closeMenu() : openMenu();
	});

	function openMenu() {
		form.style.display = 'inline-block';
		open = true;
		menu.src = cancelUrl;
		articleWrapper.style.backgroundColor = 'silver';
	}

	function closeMenu() {
		form.style.display = 'none';
		open = false;
		menu.src = hamburgerUrl
		articleWrapper.style.backgroundColor = 'white';
	}

})()