let breedData = ["Chow", "Dalmatian", "Husky"]
breedData = breedData.map(breed => breed.toLowerCase())
let ul = document.querySelector(".matches")
let currentBreed;

function matchingBreeds(userInput){
    let result = []

    if(userInput != ""){
        for(let breed of breedData){
            if(breed.startsWith(userInput)){
                result.push(breed)
            }
        }
    }
    return result
}

function createDropdown(list){
    for(let breed of list){
        let li = document.createElement("li")
        li.innerText = breed
        ul.append(li)
    }
}

function clearDropdown(){
    let matchingBreeds = document.querySelectorAll("body > ul > li")
    for(let li of matchingBreeds){
        li.remove()
    }
}

async function getData(dogBreed){
    let link = await fetch('https://dog.ceo/api/breed/' + dogBreed + '/images/random')
    let convert = await link.json()
    return convert.message
}

let input = document.querySelector("input")
input.addEventListener("keyup", function(){
    clearDropdown()
    let matching = matchingBreeds(input.value)
    createDropdown(matching)
})

// let sup = false
input.addEventListener("keyup", async function(event){
    if(event.keyCode === 13){
        let container = document.querySelector(".puppy-container")
        let dogBreed = document.querySelector("body > ul > li:nth-child(1)").innerText
        if(container.classList.contains("hidden")){
            let imageContainer = document.querySelector(".hidden")
            imageContainer.classList.remove("hidden")

            let result = await getData(dogBreed)
            document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"

        }else{
            let result = await getData(dogBreed)
            document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"
        }
        currentBreed = dogBreed
    }
})

let button = document.querySelector("button")
button.addEventListener("click", async function(){
    let result = await getData(currentBreed)
    document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"
})