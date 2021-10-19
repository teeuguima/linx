//Criação do arquivo JS para comunicação de api, referente a requisição das informações dos produtos.

let url = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"
let prox_url

//Função para validação do email
function validateEmail(email){
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if( email == '' || !er.test(email) ) { 
        alert('Preencha o campo email corretamente'); 
        return false; 
    }
    // Se passou por essas validações exibe um alert
    alert( 'Formulário enviado com sucesso!');
}

//Função que impede o recarregamento da página
function noReload(form_submit){
    const form = form_submit
    form.addEventListener("submit", e =>{
        e.preventDefault();
    })
}

//Função para captura dos campos do formulário de cadastramento de recomendações
function submitFormAlgorithm(){
   
    noReload(document.getElementById("form-algorithm"))

    var name = document.getElementById("form-name").value
    var email = document.getElementById("form-email").value
    var cpf = document.getElementById("form-cpf").value
    var radio = document.querySelector('input[name="radio-genre"]:checked').value;
    
    validateEmail(email)
        
    
    
}

//Função para captura dos campos do formulário de newsletter 
function submitFormNewsLetter(){
    noReload(document.getElementById("form-newsletter")) //Chamada da função para evitar o carregamento
    var name = document.getElementById("form-name-friend").value
    var email = document.getElementById("form-email-friend").value
    
    validateEmail(email)
    
}

//Função para comunicação com API via Http.
function getUrl(url){ 
    let request = new XMLHttpRequest()
    request.open("GET", url, false )
    request.send()
    return request.responseText
}

//Função que cria os elementos em HTML atráves do DOM.
function createProducts(products, elementHTML){ 
    let grid_product = document.createElement("div") //Container que irá conter os cards do produto
    grid_product.classList.add("col", "col-sm-12", "col-md-6" , "box-product") //Adicionando as classes ajustes do container
    elementHTML.appendChild(grid_product) //Inserindo no container pai
    
    let flex_block = document.createElement("div") //Container para formartar as informações abaixo da imagem
    flex_block.classList.add("flex-block")
    grid_product.appendChild(flex_block)  //Inserindo o container de informações no container principal dos cards
    
    let img = document.createElement("img") //Imagem do produto
    img.src = products.image
    img.classList.add("img-product")

    let name = document.createElement("h4") //Nome do produto
    name.classList.add("name-product")
    name.innerHTML = products.name
   
    let description = document.createElement("p") //Descrição
    description.classList.add("descript-product")
    description.innerHTML = products.description

    let old_price = document.createElement("p") //Preço anterior
    old_price.classList.add("previous-value-product")
    old_price.innerHTML = "De: R$" + products.oldPrice

    let price = document.createElement("p") //Preço atual a vista
    price.classList.add("later-value-product")
    price.innerHTML = "Por: R$"+ products.price

    let count = products?.installments.count //Número de parcelas limite no Crédito
    let value = products?.installments.value //Preço de cada parcela no crédito 

    let installments = document.createElement("p") //Inserindo as informações de parcelas
    installments.classList.add("credit-value-product")
    installments.innerHTML = "ou " + count + "x " + "de R$" + value
   
    let btn_buy = document.createElement("button") //Botão para realizar compra
    btn_buy.classList.add("btn-buy")
    btn_buy.innerHTML = "Comprar"
    
    /* Adicionando as informações coletadas 
    no container de Informações Flex_Block */
    flex_block.appendChild(name)
    flex_block.appendChild(description)
    flex_block.appendChild(old_price)
    flex_block.appendChild(price)
    flex_block.appendChild(installments)
    flex_block.appendChild(btn_buy)
    
    /* Adicionando a imagem acima do 
    Flex_Block no container de card do produto */ 
    grid_product.appendChild(img)
    grid_product.appendChild(flex_block)
}


/*
    Função principal que executa a chamada da função de requisição e ao obter resposta, 
    chama a função de criação dos elementos no DOM. Por fim, os insere no container responsável
    pela grade de produtos. 
*/
function products(url_product){ 
    let data_products = getUrl(url_product) //Recebendo os dados da API
    let products = JSON.parse(data_products) //Convertendo os dados em JSON
    prox_url ="https://"+ products?.nextPage //Um Setter para a próxima URL de consulta
 
    let box_products = document.getElementById("grid-product") //Buscando o container pai, onde o container filho com os cards será inserido
    products?.products.forEach(element => { //Percorre o Array de JSON produtos, inserido no JSON
        createProducts(element, box_products) 
    });

    let div_btn = document.createElement("div") //Criando o container que ficará abaixo do container de produtos, para centralizar o button
    div_btn.classList.add("col-sm-12", "col-xl-12", "text-center")

    let btn_see_more = document.createElement("button") //Button para gerar novas consultas de produtos
    btn_see_more.classList.add("btn-see-more")
    btn_see_more.setAttribute("onclick", "searchNewProduct()")
    btn_see_more.setAttribute("id", "button-see-more")
    btn_see_more.innerHTML = "Ainda mais produtos aqui"

    div_btn.appendChild(btn_see_more) //Adição do button no container 
    box_products.appendChild(div_btn) //Adição do container do button, no container da grade de produtos
}

function searchNewProduct(){
    let btn_see_more = document.getElementById("button-see-more") //Buscando o button no DOM pelo ID 
    btn_see_more.parentNode.removeChild(btn_see_more) //Excluindo o button do DOM
    products(prox_url) //Nova consulta será realizada
}


products(url) //Chamada da função a ser executada.

