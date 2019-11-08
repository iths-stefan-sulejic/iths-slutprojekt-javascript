let breedData = ["Affenpinscher", "African", "Airedale", "Akita", "Appenzeller", "Basenji", "Beagle", "Bluetick", "Borzoi", "Bouvier", "Boxer", "Brabancon", "Briard", "Cairn", "Chihuahua", "Chow", "Clumber", "Cockapoo", "coonhound", "cotondetulear", "dachshund", "dalmatian", "dhole", "dingo", "doberman", "entlebucher", "eskimo", "germanshepherd", "groenendael", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "mexicanhairless", "mix", "newfoundland", "otterhound", "papillon", "pekinese", "pembroke", "pitbull", "pomeranian", "pug", "puggle", "pyrenees", "redbone", "rottweiler", "saluki", "samoyed", "schipperke", "shiba", "shihtzu", "stbernard", "vizsla", "weimaraner", "whippet"]
breedData = breedData.map(breed => breed.toLowerCase())

let currentBreed;
let input = document.querySelector("input")
let result
let button = document.querySelector("button")
let favoriteImages = []
let addToFavorites = document.querySelector("#image > section > p")

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
    let ul = document.querySelector(".matches")
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

function favorites(event){
    let favoriteList = document.querySelector(".favorites")
    let currentImage = event.target.parentNode.parentNode.style.backgroundImage
    let x= document.createElement("div")
    if(!favoriteImages.includes(currentImage)){
        let favorite = document.createElement("section")
        favorite.classList.toggle("favorite")
        favoriteList.append(favorite)

        favorite.append(x)
        x.classList.toggle("close")

        x.addEventListener("click", function(){
            favorite.remove();
        })

        favorite.style.backgroundImage = currentImage
        
        favoriteImages.push(currentImage)
    }
}

async function enter(){
    if(event.keyCode === 13){
        let container = document.querySelector(".puppy-container")
        let dogBreed = document.querySelector("body > ul > li:nth-child(1)").innerText
        if(container.classList.contains("hidden")){
            let imageContainer = document.querySelector(".hidden")
            imageContainer.classList.remove("hidden")

            result = await getData(dogBreed)
            document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"

        }else{
            result = await getData(dogBreed)
            document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"
        }
        currentBreed = dogBreed
    }
}

async function fetchButton(){
    result = await getData(currentBreed)
    document.getElementById('image').style.backgroundImage = "url('"+[result]+"')"
}

input.addEventListener("keyup", function(){
    clearDropdown()
    let matching = matchingBreeds(input.value)
    createDropdown(matching)
})

input.addEventListener("keyup", enter)

button.addEventListener("click", fetchButton)

addToFavorites.addEventListener("click", favorites)