
  //List quotes helper function
export function listQuotes (array) {
    document.getElementById("listQuotes").innerHTML = '';
    for(var i = 0; i < array.length; i++) {
      document.getElementById("listQuotes").innerHTML += '\u2022' + array[i].name + ': ' + array[i].quote + '<br></br>';
    }
  }

  // Generates a full list of quotes available
  export async function printQuotesFunc() {
    deleteMessage.textContent = '';
    try{
      const response =  await fetch('https://crudy-quotes.herokuapp.com/quotes');
      if(response.ok){
        let jsonResponse = await response.json();
          listQuotes(jsonResponse.quotes);
      }
    }
    catch(error){
      console.log(error);
    }
  }
