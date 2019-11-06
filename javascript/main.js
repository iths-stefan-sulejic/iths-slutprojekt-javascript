let breedData = ["Chow", "Dalmatian", "Husky"]
breedData = breedData.map(breed => breed.toLowerCase())

let ul = document.querySelector(".matches")

function matchingBreeds(userInput){
    let result = []

    if(userInput != ""){
        for(let breed of breedData){
            if(breed.includes(userInput)){
                result.push(breed)
            }
        }
    }
    return result
}

function createList(list){
    for(let breed of list){
        let li = document.createElement("li")
        li.innerText = breed
        ul.append(li)
    }
}

function clearList(){
    let matchingBreeds = document.querySelectorAll("body > ul > li")
    for(let li of matchingBreeds){
        li.remove()
    }
}

let input = document.querySelector("input")
input.addEventListener("keyup", function(){
    clearList()
    let matching = matchingBreeds(input.value)
    createList(matching)
})

input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        let button = document.createElement("button")
        button.innerText = "Fetch"
        document.body.append(button)
        let image = document.createElement("img")
        document.body.append(image)
    }
})