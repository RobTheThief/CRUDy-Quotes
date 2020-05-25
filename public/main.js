const delete1       = document.querySelector('#delete')
const submit        = document.querySelector('#submit')
const update1       = document.querySelector('#update1')
const listQuotesBtn = document.querySelector('#listQuotesBtn')

//updates the first quote by that name
update1.addEventListener('click', _ => {
  fetch('/quotes', {
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
      window.location.reload(true)
    })
})

// Generates a full list of quotes available
listQuotesBtn.addEventListener('click', async _ => {
  try{
    const response =  await fetch('/quotes');
    if(response.ok){
      let jsonResponse = await response.json();
        printQuotes(jsonResponse.quotes);
    }
  }
  catch(error){
    console.log(error);
  }
})

//List quotes helper function
function printQuotes(array) {
  document.getElementById("listQuotes").innerHTML = '';
  for(var i = 0; i < array.length; i++) {
    document.getElementById("listQuotes").innerHTML += '<br></br>' + '\u2022 ' + array[i].name + ': ' + array[i].quote;
  }
}

//Deletes the first quote by that name if only name is specified. Will delete specific quote if both fields are entered
  delete1.addEventListener('click', _ => {
  fetch('/quotes', {
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
        deleteMessage.textContent = 'No such quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
  })
