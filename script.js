const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
const name = document.querySelector('#name')
const valut = document.querySelector('#valut')
const symbol = document.querySelector('#symbol')
const flag = document.querySelector('#flag')
const language = document.querySelector('#language')
const capital = document.querySelector('#capital')
const region = document.querySelector('#region')
const text=document.querySelector('#text')
const maps = document.querySelector('#maps')

const handleGetCountries = ()=>{
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
        <div class = "col-4"> 
        <div class="card">
        <img src="${country.flags.png}" alt="" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${country.translations.rus.official}</h5>
        <p class="card-text">${country.capital}</p>
</div>
</div>
        </div>>
        `
            })
        })
}

handleGetCountries()

all.addEventListener('click',()=>{
    if(all.checked){
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }

})

search.addEventListener('click',()=>{
    if(search.checked){
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
        text.classList.add('hidden')
    }
})

searchBtn.addEventListener('click', () => {
    let value = searchInput.value
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            valut.innerHTML = Object.values(json[0].currencies).map(el => el.name)
            name.innerHTML = json[0].translations.rus.common
            capital.innerHTML=json[0].capital
            symbol.innerHTML = Object.values(json[0].currencies).map(el => el.symbol)
            flag.src = json[0].flags.png
            language.innerHTML=Object.values(json[0].languages).map(el=>el)
region.innerHTML=json[0].region
maps.innerHTML=json[0].maps.googleMaps
        })
})