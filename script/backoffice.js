const URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJhODRjNTllYzAwMTk5MGQ2ZjQiLCJpYXQiOjE3MDkyODQyNjQsImV4cCI6MTcxMDQ5Mzg2NH0.eZYrsGTF0lWoxG3yqv1DH17o8B3X3jnWm6XrVa8H17w";
const params = new URLSearchParams(window.location.search);
const productId = params.get("resourceId");
let redirectToIndex = function () {
    window.location.assign("./index.html");
};
//--------------FETCH----------------------------------------------------
const fetchDataProduct = () => {
    isLoading(true);
    fetch(URL + productId, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            Authorization: API_KEY,
        },
    })
    .then((productNjs) => productNjs.json())
    .then((product) => {
            const {name, description, brand, imageUrl, price, _id } = product;
            fillFields(name, description, brand, imageUrl, price, _id);
    })

    .finally(() => isLoading(false));
};

const fillFields = (pName, pDescription, pBrand, pImageUrl, pPrice, pId) => {
    let nomeProdotto = document.getElementById("nomeProdotto");
    let brand = document.getElementById("brand");
    let prezzo = document.getElementById("prezzo");
    let urlImg = document.getElementById("urlImg");
    let descrizione = document.getElementById("descrizione");
    let id = document.getElementById("id");
    
    nomeProdotto.value = pName;
    brand.value = pBrand;
    prezzo.value = pPrice;
    urlImg.value = pImageUrl;
    descrizione.value = pDescription;
    id.innerHTML = pId;
    
};

// ---------------------SELECT BUTTON------------------------

function valSelect() {
    const selectElement = document.getElementById("inputGroupSelect");
  
    const selectedOption = selectElement.options[selectElement.selectedIndex];
  
    const selectedValue = selectedOption.value;
  
    return selectedValue;
}
  
const selectButton = document.getElementById("execute");
selectButton.addEventListener("click", function () {
const caso = valSelect();

switch (caso) {
    case "1":
    pModify();
    break;

    case "2":
    pAdd();
    break;

    case "3":
    pDelete();
    break;

    default:
    break;
}
});
  
  // -----------------FUNZIONI SWITCH----------------------
  
let newProduct = function () {
    let nomeProdotto = document.getElementById("nomeProdotto");
    let brand = document.getElementById("brand");
    let prezzo = document.getElementById("prezzo");
    let urlImg = document.getElementById("urlImg");
    let descrizione = document.getElementById("descrizione");

    const product = {
    name: nomeProdotto.value,
    description: descrizione.value,
    brand: brand.value,
    imageUrl: urlImg.value,
    price: prezzo.value,
    };

    return product;
};
  
  // --------RESET--------------------------------
  
const reset = () => {
    let nomeProdotto = document.getElementById("nomeProdotto");
    let brand = document.getElementById("brand");
    let prezzo = document.getElementById("prezzo");
    let urlImg = document.getElementById("urlImg");
    let descrizione = document.getElementById("descrizione");
  
    nomeProdotto.value = "";
    brand.value = "";
    prezzo.value = "";
    urlImg.value = "";
    descrizione.value = "";
};
  
  let resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", reset);
  
  // --------MODIFY --------------------------
  let pModify = function () {
    isLoading(true);
    let product = newProduct();
    if (!product) {
      console.error("Impossibile ottenere i valori dei prodotti.");
      return;
    }
  
    fetch(URL + productId, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDE5NTYwMTIsImV4cCI6MTcwMzE2NTYxMn0.9jdY2QHE5tyB7MCfefphT5CfhoAxtZJ0SXHJPMRU9dk",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la modifica");
        }
        console.log("Prodotto modificato con successo");
      })
      .then(alert("Prodotto modificato con successo"))
  
      .finally(() => isLoading(false));
};
  
  // --------ADD ---------------------------------
let pAdd = function () {
    isLoading(true);
    let product = newProduct();
    if (!product) {
      console.error("Impossibile ottenere i valori dei prodotti.");
      return;
    }
  
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
         Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDE5NTYwMTIsImV4cCI6MTcwMzE2NTYxMn0.9jdY2QHE5tyB7MCfefphT5CfhoAxtZJ0SXHJPMRU9dk",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'aggiunta");
        }
        console.log("Prodotto aggiunto con successo");
      })
      .then(alert("Prodotto aggiunto con successo"))
      .finally(() => isLoading(false));
};
  
  // --------DELETE --------------------------------
let pDelete = function () {
    isLoading(true);
    const hasConfirmed = confirm("sei sicuro di voler eliminare il prodotto?");
  
    if (hasConfirmed) {
      fetch(URL + productId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzlhYzBkOGEyMDAwMThhNDhhM2MiLCJpYXQiOjE3MDE5NTYwMTIsImV4cCI6MTcwMzE2NTYxMn0.9jdY2QHE5tyB7MCfefphT5CfhoAxtZJ0SXHJPMRU9dk",
        },
      })
        .then(alert("Prodotto Eliminato!"))
        .finally(() => isLoading(false));
    }
  
    redirectToIndex();
};
  
  // -------------------SPINNER-----------------
  
const isLoading = (x) => {
    const spinner = document.querySelector(".spinner-border");
    const blur = document.getElementById("blur");
  
    if (x) {
      spinner.classList.remove("d-none");
      blur.classList.remove("d-none");
      blur.classList.add("blur");
    } else {
      spinner.classList.add("d-none");
      spinner.classList.add("d-none");
      blur.classList.remove("blur");
    }
};
  // -------------------------------------------
  
  // ----------------WINDOW.ONLOAD----------------------------
  
window.addEventListener("DOMContentLoaded", () => {
    if (productId) {
      fetchDataProduct();
    }
});
  