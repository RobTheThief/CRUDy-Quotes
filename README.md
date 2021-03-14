# CRUDy-Quotes
CRUD API for quotes!

## Code Examples
To generate lorem ipsum use special shortcode: `put-your-code-here`

EXAMPLE PUT FUNCTION IN FRONTEND

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
    .then(response => {
      printQuotesFunc();
    })
})
