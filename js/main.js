
var productNameInput = document.getElementById('productNameInput');//Input kolo
var productPriceInput = document.getElementById('productPriceInput');//Input kolo
var productCategoryInput = document.getElementById('productCategoryInput');//Input kolo
var productDescInput = document.getElementById('productDescInput');//Input kolo

var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var tableBody = document.getElementById('tableBody');
var productsContainer ;
if(localStorage.getItem('myproduct') == null ){
    productsContainer=[] ;  
}
else{
    productsContainer=JSON.parse(localStorage.getItem('myproduct'));
    displayProducts(productsContainer);
}

function addProduct() {
    if(validatiovProductName() == true){
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);//2
        console.log(productsContainer);
        localStorage.setItem('myproduct', JSON.stringify(productsContainer));
    
        clearForm();
        displayProducts(productsContainer);
    }
    else{
        alert("not validation");
    }
 
}

function  clearForm(){
        productNameInput.value= "";
        productPriceInput.value= "";
        productCategoryInput.value= "";
        productDescInput.value= "";
}
function displayProducts(productList) {

    var cartoona = ``;
    for (var i = 0; i < productList.length; i++) {
        cartoona +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>  <button onclick="updateElement(${i})" class="btn btn-sm btn-outline-warning">update</button> </td>
        <td>  <button onclick="deleteElement(${i});" class="btn btn-sm btn-outline-danger">delete</button> </td>
    </tr>`
    }
    tableBody.innerHTML = cartoona;
}
function search(term){
    // console.log(term);
    var searchprod =[];
    for( var i=0;i<productsContainer.length; i++ ){
        if( productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true ){ 
            searchprod.push(productsContainer[i]);
        }
        displayProducts(searchprod);
        
    }
        
}
function deleteElement(index){
    productsContainer.splice(index,1);
    localStorage.setItem('myproduct', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function updateElement(index){
    productNameInput.value= productsContainer[index].name;
    productPriceInput.value= productsContainer[index].price;
    productCategoryInput.value= productsContainer[index].category;
    productDescInput.value= productsContainer[index].desc;
    productsContainer.splice(index,1);
    displayProducts(productsContainer);

    updateBtn.classList.replace("d-none","d-inline-block");
    addBtn.classList.add("d-none");
}

function updateProduct(){
    addProduct();
    updateBtn.classList.replace("d-inline-block", "d-none");
    addBtn.classList.remove("d-none");
    
}
function validatiovProductName(){
    var regex =/^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value)==true){
        return true;
    }
    else{
        return false;
    }
}