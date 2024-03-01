const URL = "https://striveschool-api.herokuapp.com/api/product/";


//--------------FETCH----------------------------------------------------
const fetchData = function  () {
    isLoading(true);
    fetch(URL, {
        headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJhODRjNTllYzAwMTk5MGQ2ZjQiLCJpYXQiOjE3MDkyODQyNjQsImV4cCI6MTcxMDQ5Mzg2NH0.eZYrsGTF0lWoxG3yqv1DH17o8B3X3jnWm6XrVa8H17w",
        },
    })
    .then((response) => {
        if (response.status === 404) {
            console.error("Resource not found");
            } else if (response.status >= 400 && response.status < 500) {
            console.error("Client-side error");
            } else if (response.status >= 500 && response.status < 600) {
            console.error("Server-side error");
            } else {
            console.error("Error retrieving data");
            }
            return response.json();
    })

    .then((products) => {
        products.forEach((product) => {
            let pImg = product.imageUrl;
            let pName = product.name;
            let pBrand = product.brand;
            let pPrice = product.price;
            let pId = product._id;
            let pDesc = product.description;
            
            createCardProduct(pImg, pName, pBrand , pPrice, pId, pDesc);
        });
    })
    .finally(() => isLoading(false));
};
//------------------------------CARD------------------------------------------------------------
const createCardProduct = function (img, name, brand, price, id, description) {
    let productContainer = document.getElementById("productsContainer");
    let product = document.createElement("div");
    product.classList.add(
        "card",
        "border",
        "border-4",
        "border-2",
        "rounded-4",
        "mx-1",
        "p-2",
        "d-flex",
        "flex-column",
        "justify-content-between"
    );
    product.style.width = "18rem";
    let prodContent = `            
    <div>
        <img
    src="${img}"
    class="card-img-top cardImg"
    alt="prod-img"
        />
    </div>
    <div class="card-body">
        <h4 class="card-title mb-3">${name}</h4>
        <h5 id="brand">Brand<span class="badge bg-4 p-2 fs-6 ms-2">${brand}</span></h5>
        <h5 id="price">Price<span class="badge bg-3 p-2 fs-6 ms-3">${price}€</span></h5>
        <p class="card-text">${description}</p>
    </div>
    <div class="d-flex justify-content-evenly">
        <a href="#"  class="btn btn-1">Buy<i class="bi bi-cart-check-fill ps-2"></i></a>
        <a href="./info.html?resourceId=${id}" class="btn btn-2">Details<i class="bi bi-zoom-in ps-2"></i></a>
    </div>`;

    product.innerHTML = prodContent;
    productContainer.appendChild(product);
};
//-------------------------------------------------------------------------------

//---------------------SEARCH----------------------------------------------------------------
let searchEngine = function () {
    let serchName = document.getElementById("searchInput");
    let h4Collection = document.querySelectorAll("h4");
  
    h4Collection.forEach((i) => {
        if (!i.innerText.toLowerCase().includes(serchName.value)) {
            i.parentNode.parentNode.classList.add("d-none");
        }
    });
};
  
    let btnSerch = document.getElementById("src");
    btnSerch.addEventListener("click", searchEngine);
    
    let showAll = function () {
        let h4Collection = document.querySelectorAll("h4");
        h4Collection.forEach((i) => {
            if (i.classList.contains("d-none")) {
                i.classList.remove("d-none");
                i.classList.add("d-inline-block");
            }
    });
};
//-------------------------------------------------------------------------------------------   
// -------------------SPINNER----------------------------------------------------------------
const isLoading = (x) => {
    const spinner = document.querySelector(".spinner-border");
    const blur = document.getElementById("blur");

    if (x) {
        spinner.classList.remove("d-none");
        blur.classList.remove("d-none");
        blur.classList.add("blur");
    }  else {
        spinner.classList.add("d-none");
        spinner.classList.add("d-none");  /*  blur.classList.add("d-none"); */
        blur.classList.remove("blur");
    }    
};
//----------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
    fetchData();
    showAll();
});


