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
    grid_product.classList.add("col-12", "col-sm-12", "col-xl-3" , "box-product")
    elementHTML.appendChild(grid_product)

    box_product.classList.add("img-product")
    let img = document.createElement("img")
    img.src = products.image
    box_product.appendChild(img)

    grid_product.appendChild(box_product)

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
    old_price.innerHTML = products.oldPrice

    let price = document.createElement("p")
    price.classList.add("later-value-product")
    price.innerHTML = products.price

    let count = products?.installments.count
    let value = products?.installments.value

    let installments = document.createElement("p")
    installments.innerHTML = "ou" + count + "x" + "de R$" + value
   
    let btn_buy = document.createElement("button")
    btn_buy.classList.add("btn-buy")
    btn_buy.innerHTML = "Comprar"
    
    flex_block.appendChild(name)
    flex_block.appendChild(description)
    flex_block.appendChild(old_price)
    flex_block.appendChild(installments)
    flex_block.appendChild(btn_buy)
    
    grid_product.appendChild(box_product)
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
        box_products.appendChild(product)
    });
}

products()

