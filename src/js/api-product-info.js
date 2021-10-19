//Criação do arquivo JS para comunicação de api, referente a requisição das informações dos produtos.


function getUrl(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false )
    request.send()
    return request.responseText
}


function createProducts(products, elementHTML){
    let grid_product = document.createElement("div")
    let box_product = document.createElement("div")
    grid_product.classList.add("col" , "box-product")
    elementHTML.appendChild(grid_product)

    let img = document.createElement("img")
    img.src = products.image
    img.classList.add("img-product")
    

    let flex_block = document.createElement("div")
    flex_block.classList.add("flex-block")
    let name = document.createElement("h4")
    name.classList.add("name-product")
    name.innerHTML = products.name
    flex_block.appendChild(name)
    grid_product.appendChild(flex_block)   
   
    let description = document.createElement("p")
    description.classList.add("descript-product")
    description.innerHTML = products.description

    let old_price = document.createElement("p")
    old_price.classList.add("previous-value-product")
    old_price.innerHTML = "De: R$" + products.oldPrice

    let price = document.createElement("p")
    price.classList.add("later-value-product")
    price.innerHTML = "Por: R$"+ products.price

    let count = products?.installments.count
    let value = products?.installments.value

    let installments = document.createElement("p")
    installments.classList.add("credit-value-product")
    installments.innerHTML = "ou " + count + "x " + "de R$" + value
   
    let btn_buy = document.createElement("button")
    btn_buy.classList.add("btn-buy")
    btn_buy.innerHTML = "Comprar"
    
    flex_block.appendChild(name)
    flex_block.appendChild(description)
    flex_block.appendChild(old_price)
    flex_block.appendChild(price)
    flex_block.appendChild(installments)
    flex_block.appendChild(btn_buy)
    
    grid_product.appendChild(img)
    grid_product.appendChild(flex_block)

    return box_product
}

function products(){
    let data_products = getUrl("https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1") 
    let products = JSON.parse(data_products)

    let box_products = document.getElementById("grid-product")
    products?.products.forEach(element => {
        console.log(element)
        let product = createProducts(element, box_products)
    });

    let div_btn = document.createElement("div")
    div_btn.classList.add("col-sm-12", "col-xl-12", "text-center")

    let btn_see_more = document.createElement("button")
    btn_see_more.classList.add("btn-see-more")
    btn_see_more.innerHTML = "Ainda mais produtos aqui"

    div_btn.appendChild(btn_see_more)
    box_products.appendChild(div_btn)
}

products()

