var search = document.getElementById('search');
    searchError = document.getElementById('searchError');
    methods = document.getElementById('methods');
    links = document.getElementById('links');
    errors = document.getElementById('errors');
    errorLinks = document.getElementById('errorLinks');
    methodsContainer = document.getElementById('methodsContainer');
    errorsContainer = document.getElementById('errorsContainer');


if (errorsContainer != null) {
    errorsContainer.style.display = 'none';
    searchError.addEventListener('input', () => {
        let searched = searchError.value.toLowerCase();
        if (errors == null || errorLinks == null)
            return;
        displayStyle(errors);
        displayStyle(errorLinks);
    });
}


search.addEventListener('input', () => {
    let searched = search.value.toLowerCase();
    if (methods == null || links == null)
        return;
    displayStyle(methods);
    displayStyle(links);
});


function displayStyle(elementContainer) {
    [...elementContainer.children].forEach(e =>  {
        if (e.outerHTML.toLowerCase().includes(searched))
            e.style.display = 'flex';
        else
            e.style.display = 'none';
    });
}


function toggleSearchHeader(headerName) {
    const searchHeaders = document.getElementsByClassName('search-header');
    [...searchHeaders].forEach(e => {
        console.log(e.href);
        console.log(headerName);
        if (e.href.includes(headerName)) {
            if (e.style.display != null || e.style.display == 'flex')
                e.style.display = 'none';
            else
                e.style.display = 'flex';
            console.log(e);
        }
    });
}


function goTo(container) {
    switch (container) {
        case 'errors':
            errorsContainer.style.display = 'flex';
            methodsContainer.style.display = 'none';
            break;
        case 'methods':
            errorsContainer.style.display = 'none';
            methodsContainer.style.display = 'flex';
            break;
    }
}

async function sendReq(urlParams, jsonBody, id, method, apiUrl) {
  var path = method.split(' ')[1]

  for (key in urlParams) {
    console.log(key)
    if (path.includes(`{${key}}`)) {
        path = path.replace(`{${key}}`, urlParams[key])
        delete urlParams[key]
    }
  }
  if (!apiUrl.endsWith('/') && !path.starsWith('/'))
      apiUrl += '/';

  const response = await fetch(
    `${apiUrl}${path}?` + new URLSearchParams(urlParams), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method.split(' ')[0],
      json: jsonBody
    }
  )
  var elem = document.getElementById(id)
  elem.innerHTML = method + '\n\n' + JSON.stringify(await response.json(), null, 2)
  hljs.highlightElement(elem)
}
