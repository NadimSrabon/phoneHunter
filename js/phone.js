
function loadPhone(searchResult) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchResult}`)
        .then(response => response.json())
        .then(data => displayPhones(data.data))
}



function displayPhones(phones) {

    console.log(phones.data);
    const phoneContainer = document.getElementById("phone-container");
    
    const hideShow = document.getElementById("btn-container");

    if(phones.length >9){
        hideShow.classList.remove("hidden")
    }else{
        hideShow.classList.add("hidden")
    }
    phones = phones.slice(0,10)
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="showDetails('${phone.slug}');show_details_modal.showModal()"class="btn bg-blue-300">Show Details</button>
        </div>
        </div>`

        phoneContainer.appendChild(div)


    });
}


function showDetails(id){
    console.log('clicked',id)
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        const phoneName = document.getElementById("details-container");
        phoneName.innerHTML=`
        <p>${data.data.name}</p>
        <img src='${data.data.image}' />
        <p>Display: ${data.data.mainFeatures.displaySize}</p>
        <p>ChipSet: ${data.data.mainFeatures.chipSet}</p>
        <p>Memory: ${data.data.mainFeatures.memory}</p>
        <p>Storage: ${data.data.mainFeatures.storage}</p>
        <p>ReleaseDate: ${data?.data?.releaseDate ? data?.data?.releaseDate:'not found'}</p>

        `
      });
    
}


function searchHandler(){

    const searchField = document.getElementById("search-field");
    searchField.textContent= '';
    const searchResult = searchField.value;
    loadPhone(searchResult);
}

loadPhone(searchResult);
