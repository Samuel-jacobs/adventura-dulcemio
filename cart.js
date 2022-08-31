/*open cart function */
function openCart() {
	let cart = document.getElementById("cart");
  cart.style.display = "block"
  
}

function closeCart() {
	let cart = document.getElementById("cart");
	cart.style.display = "none";
	
}

//getting all the items from the DOM
let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
	productsInCart = [];
}
const parentElement = document.querySelector("#buyItems");
const cartNotification = document.querySelector('#cart-notification');
const sumTotal = document.querySelector("#sumTotal");
const products = document.querySelectorAll(".product-item");

const addCount = function() {
	let countNum = 1;
	productsInCart.forEach(product => {
		countNum += product.count;
	});
	cartNotification.innerHTML = "(" + countNum + ")";
	return countNum;
	
}

//count the sum of each product
const countTheSumPrice = function() {
	let sumPrice = 0;
	productsInCart.forEach(product => {
		sumPrice += product.price;
	});
	return sumPrice;
}


//add product and its item to cart
const updateShoppingCartHTML = function() {
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
	let result = productsInCart.map(product => {
		
	return `
		<div class="buyItem">
			<div class="product-cart-image"> 
				<img src="${product.image}" class="shadow-sm" alt="">
			</div>
		
			<div class="product-summary">
				<h5 class="pb-1"><strong>${product.name}</strong></h5>
				<p><strong>Quantity:</strong> ${product.count} </p>
				<p><strong>Price:</strong> &#x20A6;${product.price}</p>
			</div>
			<div class="product-extra">
				
				<div class="quantity-wrapper">
					<button id="addQty" class="addQty change-qty" data-id='${product.id}'>+</button>
					<p class="product-quantity" id="qty"> ${product.count}</p>
					<button id="reduceQty" class="reduceQty change-qty" data-id='${product.id}'>-</button>
				</div>
				<div class="deleteItem">
					<button class="deleteBtn" title="delete item"><i data-id='${product.id}'  class="fas fa-trash"></i></button>
				</div>
			</div>
	</div>`
});
	parentElement.innerHTML = result.join('');
	document.querySelector('.checkout').classList.remove('hidden');
	
	document.querySelector(".total-wrapper").classList.remove('hidden');
	sumTotal.innerHTML = "&#x20A6;" + countTheSumPrice();

	} else {
			document.querySelector('.checkout').classList.add('hidden');
			document.querySelector('.total-wrapper').classList.add('hidden');
			parentElement.innerHTML = '<h4 class="empty">Your cart is empty</h4>';
			
		}
	};
//end of updatecartHtml function	


//increase count and change price 
function updateProductsInCart(product) {
	for (i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;	
		} 
	}
	productsInCart.push(product);
	
}


//get product items 
products.forEach(product => {
	product.addEventListener('click', (e) => {
		if(e.target.classList.contains('add-btn')) {
			const productID = e.target.dataset.productId;
			const productName = product.querySelector('.productName').innerHTML;
			const productPrice = product.querySelector('.price-value').innerHTML;
			const productImage = product.querySelector('img').src;

			let productToCart = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice
			};
			
			
			addCount();
			updateProductsInCart(productToCart);
			updateShoppingCartHTML();
			
			console.log(productToCart.name, productToCart.id, productToCart.price);
		};
	});
});


//increase or reduce count 
parentElement.addEventListener('click', (e) => {
	const isPlusButton = e.target.classList.contains('addQty');
	const isMinusButton = e.target.classList.contains('reduceQty');
	
	if (isPlusButton || isMinusButton ) {
		for (i=0; i < productsInCart.length; i++) {
			if (productsInCart[i].id === e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1;
				} else if (isMinusButton) {
					productsInCart[i].count -= 1;
				}
				countNum = productsInCart[i].count;	
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
				
			}	
			if(productsInCart[i].count <= 0 ){
				productsInCart.splice(i, 1);
			}
		}
		addCount();
		updateShoppingCartHTML();
		//deleteBtnFunc();
	}
});



//delete item from cart
parentElement.addEventListener('click', (e) => {
	const isDeleteBtn = e.target.classList.contains('fa-trash');

	console.log(isDeleteBtn);
	if (isDeleteBtn) {
		for (i=0; i < productsInCart.length; i++) { 
			if (productsInCart[i].id === e.target.dataset.id) {
				if (isDeleteBtn) {
					productsInCart.splice(i, 1);
					console.log("delete" + e.target.dataset.id);
				}
				
			}
		}

		addCount();
		updateShoppingCartHTML();
		console.log("delete");
	}	
		//console.log("delete");
});

	document.querySelector('.checkout').addEventListener('click', 
	function checkOut() {
		alert("Your order has been received thank you for purchasing");
		parentElement.innerHTML = '<h4 class="empty">Your cart is empty</h4>';
		document.querySelector('.checkout').classList.add('hidden');
		document.querySelector('.total-wrapper').classList.add('hidden');
		productsInCart = [];
		closeCart();
		addCount();
		updateShoppingCartHTML(); 
});


//addCount();
updateShoppingCartHTML();