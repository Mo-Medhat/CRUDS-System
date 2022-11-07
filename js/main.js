var pn = document.getElementById("productName");
var pp = document.getElementById("productPrice");
var pr = document.getElementById("productRate");
var pd = document.getElementById("productDesc");
var updateProductDisabled = document.getElementById("updateProduct");
var showAlert = document.getElementById("showAlert");
var globalVar;
var allProducts;

if (localStorage.getItem("All Products") == null) {
  allProducts = [];
} else {
  allProducts = JSON.parse(localStorage.getItem("All Products"));
  displayProducts();
}

// add new product
function addProduct() {
  var product = {
    productName: pn.value,
    productPrice: Number(pp.value),
    productRate: pr.value,
    productDesc: pd.value,
  };

  allProducts.push(product);

  localStorage.setItem("All Products", JSON.stringify(allProducts));
  displayProducts();
  clearInputs();
}
// display product
function displayProducts() {
  var html = "";

  for (let i = 0; i < allProducts.length; i++) {
    html += ` <tr>
        <td>${i + 1}</td>
        <td>${allProducts[i].productName}</td>
        <td>${allProducts[i].productPrice}</td>
        <td>${allProducts[i].productRate}</td>
        <td>${allProducts[i].productDesc}</td>
        <td>
        <button onclick="updateProduct(${i})" class="btn btn-warning"><i class="fas fa-edit fa-fw"></i></button>
        </td>
        <td>
        <button onclick="removeProduct(${i})" class="btn btn-danger"><i class="fas fa-trash-alt fa-fw"></i></button>
        </td>
    </tr> `;
  }

  document.getElementById("contentArea").innerHTML = html;
}
// Search product
function searchProduct(term) {
  var html = "";

  for (let i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].productName.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      html += ` <tr>
      <td>${i + 1}</td>
      <td>${allProducts[i].productName}</td>
      <td>${allProducts[i].productPrice}</td>
      <td>${allProducts[i].productRate}</td>
      <td>${allProducts[i].productDesc}</td>
      <td>
      <button onclick="updateProduct(${i})" class="btn btn-warning"><i class="fas fa-edit fa-fw"></i></button>
      </td>
      <td>
      <button onclick="removeProduct(${i})" class="btn btn-danger"><i class="fas fa-trash-alt fa-fw"></i></button>
      </td>
  </tr> `;
    }
  }

  document.getElementById("contentArea").innerHTML = html;
}

function clearInputs() {
  pn.value = "";
  pp.value = "";
  pr.value = "";
  pd.value = "";
}
// Remove single product
function removeProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("All Products", JSON.stringify(allProducts));
  displayProducts();
}
// Remove all products
function showAlertMsg() {
  showAlert.style.display = "block";
}
function removeProducts() {
  localStorage.removeItem("All Products");
  showAlert.style.display = "none";
  allProducts = [];
  displayProducts();
}
function cancelRemove() {
  showAlert.style.display = "none";
}
// Update product
function updateValues() {
  allProducts[globalVar].productName = pn.value;
  allProducts[globalVar].productPrice = pp.value;
  allProducts[globalVar].productRate = pr.value;
  allProducts[globalVar].productDesc = pd.value;

  localStorage.setItem("All Products", JSON.stringify(allProducts));
  displayProducts();
  clearInputs();
  updateProductDisabled.setAttribute("disabled", "disabled");
}
function updateProduct(idx) {
  updateProductDisabled.removeAttribute("disabled");
  pn.value = allProducts[idx].productName;
  pp.value = allProducts[idx].productPrice;
  pr.value = allProducts[idx].productRate;
  pd.value = allProducts[idx].productDesc;
  globalVar = idx;
}
