const form = document.querySelector(".form")
const wordInput = document.getElementById("wordInput")
const translateButton = document.querySelector("button")
const translateDiv = document.getElementById("translateDiv")
const word = document.getElementById("word")
const meaning = document.getElementById("meaning")
const audio = document.querySelector("audio")


async function api(){
  translateDiv.style.display = "none";

  const wordValue = wordInput.value
  const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordValue}`)
  .then((response)=>{
    if(response.status==200){
      return response.json()
    }
    else{
      alert("Wrong word!")
    }
  })
  if(data){
    translateDiv.style.display = "block"
    word.textContent = data[0].word
    console.log(data)
    meaning.textContent = data[0].meanings[0].definitions[0].definition
    audio.src=data[0].phonetics[0].audio
  }else{
    console.log("Hata!")
    wordInput.value=" "
  }
  
}
form.addEventListener("submit",e=>{
  e.preventDefault()
  api();
})
translateButton.addEventListener("click",api)