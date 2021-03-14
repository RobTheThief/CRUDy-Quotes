# CRUDy-Quotes
CRUD API for quotes!

## EXAMPLE PUT FUNCTION IN FRONTEND
```javascript
const update1Quote  = document.querySelector('#update_one_quote')

update1Quote.addEventListener('click', _ => {
  fetch('https://crudy-quotes.herokuapp.com/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${document.querySelector("#quote_name").value}`,
      quote: `${document.querySelector("#quote").value}`
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .catch(console.error)
})
```
