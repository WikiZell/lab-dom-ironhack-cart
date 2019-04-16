function addNewItem(elTrigger) {
  let productName = document.querySelector(".new-prod-name").value;
  let unitCost = document.querySelector(".new-prod-price").value;

  let id = document.querySelectorAll(".item").length;
  //send Data to createNewItem function
  let itemData = {
    id: id,
    productName: productName,
    unitCost: unitCost,
    qty: 1,
    totalPrice: null
  };

  createNewItem(itemData);  
  //Reset Form
  let createItemButton = document.getElementById("new-item-create");
  let btn = document.getElementById("new-item-create");

  createItemButton.onclick = false;
  createItemButton.removeEventListener("click", createItemButton);
  btn.classList.remove("cart");
  btn.classList.add("cart-disabled");
  document.querySelector(".new-prod-price").value = "";
  document.querySelector(".new-prod-name").value = "";
}

function updatePrices() {
  //Start iteration from item elements
   var totalCartPrice = [];
  
  document.querySelectorAll("[item]").forEach(element => {
    //for each element "item" do:
    var id, productName, unitCost, qty, totalPrice;

    id = element.getAttribute("item");
    productName = element.querySelector(".product-name").innerHTML;
    unitCost = parseFloat(element.querySelector(".cost-unit").innerHTML).toFixed("2");
    qty = parseInt(element.querySelector("#qty-input").value);
    if(isNaN(qty)){
      qty = parseInt(0);
    }
    totalPrice = parseFloat(unitCost * qty).toFixed("2");
    totalCartPrice.push(totalPrice)
    document.querySelector(".id" + id + " .total-ammount").innerHTML = totalPrice;
  });


  //add to total cart ammount
  document.querySelector("#total-cart-ammount").innerHTML = parseFloat( totalCartPrice.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0) ).toFixed("2");
}

function createNewItem(itemData) {
  //create default item
  itemHTML = itemTemplate(itemData); //generate item from template
  document.querySelector("#item-container").appendChild(itemHTML);
  updatePrices(); //Update prices
}

function deleteItem(elementToRemove) {
  elementToRemove.path[2].remove();
  updatePrices();
}

document.addEventListener("DOMContentLoaded", function(event) {
  var calculatePriceButton = document.getElementById("calc-prices-button");
  var createItemButton = document.getElementById("new-item-create");

  calculatePriceButton.onclick = updatePrices; //update prices of all items

  //Delegate eventListener to dinamically added button
  var itemContainer = document.getElementById("item-container");
  var itemQuantity = document.getElementById("qty-input");

  itemContainer.addEventListener("click", function(e) {
    if (e.target && e.target.matches(".btn-delete")) {
      deleteItem(e);
    }
  });

  itemContainer.addEventListener("keyup", function(e) {
    if (e.target && e.target.matches('input[type="number"]')) {
      updatePrices();
    }
  });

  itemContainer.addEventListener("change", function(e) {
    if (e.target && e.target.matches('input[type="number"]')) {
      updatePrices();
    }
  });

  //create first item
  var firstItem = {
    id: 1,
    productName: "IronHack Gold Water",
    unitCost: 7,
    qty: 3,
    totalPrice: "null"
  };

  createNewItem(firstItem);

  //Validate item fields and Enable add item button [New Item]
  (function() {
    let inputAddItem = document.querySelectorAll(".add-prod-box");
    inputAddItem.forEach(function(elem) {
      elem.addEventListener("keyup", function() {
        let productName = document.querySelector(".new-prod-name").value;
        let unitCost = document.querySelector(".new-prod-price").value;
        

        //Validate data
        if (!productName || !unitCost || isNaN(unitCost)) {
          createItemButton.onclick = false;
          createItemButton.removeEventListener("click", createItemButton);
          document.getElementById("new-item-create").classList.remove("cart");
          document
            .getElementById("new-item-create")
            .classList.add("cart-disabled");
        } else {
          document
            .getElementById("new-item-create")
            .classList.remove("cart-disabled");
          document.getElementById("new-item-create").classList.add("cart");
          createItemButton.onclick = addNewItem;          
        }
      });
    });
  })();

});


//My Functions
var itemTemplate = function(itemData) {
  var htmlItem = document.querySelector("#itemTemplate .item").cloneNode(true);
  Object.keys(itemData).forEach(function(key) {
    switch (key) {
      case "id":
        //create item attribute
        var att = document.createAttribute("item");
        att.value = itemData.id;
        htmlItem.setAttributeNode(att); //attach item attribute to itemTemplate
        htmlItem.classList.add("id" + itemData.id); //add class id
        break;
      case "productName":
        htmlItem.querySelector(".product-name").innerHTML =
          itemData.productName; //Set product name
        break;
      case "unitCost":
        htmlItem.querySelector(".cost-unit").innerHTML = parseFloat(
          itemData.unitCost
        ).toFixed("2"); //Set cost per unit
        break;
      case "qty":
        htmlItem.querySelector(".product-quantity input").value = itemData.qty; //Set qty
        break;
      case "totalPrice":
        htmlItem.querySelector(".total-ammount").innerHTML = parseFloat(
          itemData.unitCost * itemData.qty
        ).toFixed("2"); //Set qty
        break;
      default:
        break;
    }
  });

  return htmlItem;
};
