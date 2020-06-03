import {listQuotes, printQuotesFunc} from './helper_functions.js';

const delete1       = document.querySelector('#delete')
const submit        = document.querySelector('#submit')
const update1       = document.querySelector('#update1')
const listQuotesBtn = document.querySelector('#listQuotesBtn')

//add https://crudy-quotes.herokuapp.com to url when deploying to Heroku

//Lists quotes on load
printQuotesFunc();

//lists quotes when button clicked
listQuotesBtn.addEventListener('click', () => {
  printQuotesFunc();
});

//updates the first quote by that name
update1.addEventListener('click', _ => {
  fetch('https://crudy-quotes.herokuapp.com/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${document.querySelector("#name").value}`,
      quote: `${document.querySelector("#quote").value}`
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      printQuotesFunc();
    })
})

submit.addEventListener('click', _ => {
  fetch('https://crudy-quotes.herokuapp.com/quotes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${document.querySelector("#name").value}`,
      quote: `${document.querySelector("#quote").value}`
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      printQuotesFunc();
    })
})

//Deletes specific quote if both fields are entered correctly
  delete1.addEventListener('click', _ => {
  fetch('https://crudy-quotes.herokuapp.com/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${document.querySelector("#name").value}`,
      quote: `${document.querySelector("#quote").value}`
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No quote to delete') {
        deleteMessage.textContent = '**No such quote to delete'
      } else {
        printQuotesFunc();
      }
    })
    .catch(console.error)
  })
