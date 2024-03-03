const URL = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(window.location.search);
const productId = params.get("resourceId");

//--------------------------------FETCH----------------------------------------------

const fetchDataProduct =  () => {
    isLoading(true);
    fetch(URL + productId, {
        headers: { 
            Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDE5NTYwMTIsImV4cCI6MTcwMzE2NTYxMn0.9jdY2QHE5tyB7MCfefphT5CfhoAxtZJ0SXHJPMRU9dk",
        },
    })
        .then(productNjs => productNjs.json ())
        .then((product) => {
            const {name, description, brand, imageUrl, price} = product;
            fillFields(name, description, brand, imageUrl, price);
        })

        .finally(() => isLoading(false));
};

//----------------------------------------------------------------

let createSheet = (pName,pDescription,pBrand,pImgUrl,pPrice) => {
    let imgContainerSm = document.querySelector('.imgContainerSm');
    let imgContainerSmContent = `
    <img 
    class="img"
    src="${pImgUrl}"
    style="height:60vh"
    alt="phone-img"
    />`;
    imgContainerSm.innerHTML = imgContainerSmContent;
    
    let imgContainerMd = document.querySelector(".imgContainerMd");
    let imgContainerMdContent = `
    <img 
    class="img"
    src="${pImgUrl}"
    alt="phone-img"
    />`;
    imgContainerMd.innerHTML = imgContainerMdContent;

    let brandName = document.getElementById('brandName');
    let price = document.getElementById('price');
    let description = document.getElementById('description');

    brandName.innerHTML = `<span class="badge bg-1 me-3">${pBrand}</span>${pName}`;
    price.innerText = `Prezzo: ${pPrice} €`;
    description.innerText = `${pDescription}`;
    console.log("Hello");
}

const isLoading = (x) => {
    const spinner = document.querySelector(".spinner-border");
    const blur = document.getElementById("blur");

    if (x) {
        spinner.classList.remove("d-none");
        blur.classList.remove("d-none");
        blur.classList.add("blur");
    } else {
        spinner.classList.add("d-none");
        blur.classList.remove("blur");
        spinner.classList.add("d-none");
    }
};

window.onload = () => {
    fetchDataProduct();
};