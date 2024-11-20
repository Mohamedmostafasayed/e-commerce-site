// AJAX -> async js and xml
// https://dummyjson.com/products


//=======================
//1- create request
//2- define callback function
//3- open
//4- send 

{
    products: [
        {
            title: ''
        },
        {
            title: ''
        },
    ]
}

//====================
//ready state: 
//0- unsend
//1- opened
//2- header recieved
//3- loading
//4- done
//=====================
//status: 200-> ok  || 404-> error
//=====================
let container= document.querySelector(".products")
let r = new XMLHttpRequest();
r.onload = function () {
    if (r.readyState == 4) {
        if (r.status === 200) {
            let response = JSON.parse(r.responseText);
            let products = response.products;
            products.map(function(element){
                container.innerHTML +=`
                    <div class="product-card">
                    <img src=${element.thumbnail}>
                    <h4>${element.title}</h4>
                    <p class="price">price: <span>${element.price}</span>$</p>
                    </div>
                `
            })
        } else {
            console.log("there is some problem...")
        }
    } else {
        console.log("error in request..")
    }
}

r.open("GET", "https://dummyjson.com/products", true);//1
r.send()//2

async function main() {
    try {
        const response = await fetch('https://dummyjson.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: ''
            })
        })
        if (response.status == 200) {
            // const text = await response.text();
            // const json = JSON.parse(text);
            const json = await response.json();
            const products = json.products;
            products.map((element => {}))
        }
    }catch(error) {

    }
}

main()

//get by caytegory===============================
function showCategory(url){
    container.innerHTML=''
    r.open("GET",url, true);
    r.send()

}
//categories=========================
let categoriesLink= "https://dummyjson.com/products/categories";
function getCategories(link){
    let categoryRq =new XMLHttpRequest();
    categoryRq.onload = function(){
    if(categoryRq.status==200 && categoryRq.readyState==4){
        let categories = JSON.parse(categoryRq.responseText);
        console.log(categories);
        let categoriesContainer = document.querySelector(".categories")
        categories.map(function(c){
            categoriesContainer.innerHTML+=`
            <span class="category" onclick="showCategory('${c.url}')"> ${c.name} </span>
            `
        }) 
    }
}
categoryRq.open("GET",link,true)
categoryRq.send()
}
getCategories(categoriesLink);


//search===============================
//https://dummyjson.com/products/search?q=phone
function search(word){
    r.open("GET",`https://dummyjson.com/products/search?q=${word}`, true);
    r.send()
}

let searchInput= document.querySelector(".search")
searchInput.addEventListener("keyup",()=>{
    container.innerHTML='';
    search(searchInput.value);

})

