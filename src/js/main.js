fetch('https://pianolearn.diamankazberuk.workers.dev/')
    .then(response => response.json())
    .then(json => console.log(json))
