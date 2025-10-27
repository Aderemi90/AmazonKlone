// backend is another computer that manages the data of a website.
// Backend helps business owners know what we have ordered.
// Our computer sends information to the backend using HTTP(hypertext transfer protocol).
// In the http message from our computer, we can attach our information to the http message.
// now amazon will know what we have ordered.

// To send an http message, we need to use a class XMLHttpRequest provided by javascript

// Types of Requests//
// GET
// POST
// PUT
// DELETE

// when we send a message,its a request , when backend receives the request,
// they send send an http which is called a response. Its a request-response cycle

// GET is used with a URL(Uniform Resource locator)
// URL is the domain name of the backend.
const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
console.log(xhr.response)
})
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();