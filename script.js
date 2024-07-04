'use strict';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    addEventListeners();
    showSlides();
});

function addEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
}

function addToCart(event) {
    const productElement = event.target.closest('.pro');
    const product = {
        id: productElement.querySelector('a').href,
        image: productElement.querySelector('img').src,
        title: productElement.querySelector('.des h5').innerText,
        price: productElement.querySelector('.des h4').innerText,
        quantity: 1
    };

    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (!cartItemsContainer || !cartTotalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(product => {
        const productSubtotal = product.quantity * parseFloat(product.price.replace('$', ''));
        totalPrice += productSubtotal;

        const productElement = document.createElement('tr');
        productElement.innerHTML = `
      <td><img src="${product.image}" alt=""><span>${product.title}</span></td>
      <td>${product.price}</td>
      <td><input type="number" value="${product.quantity}" min="1" onchange="changeQuantity('${product.id}', this.value)"></td>
      <td>$${productSubtotal.toFixed(2)}</td>
      <td><button onclick="removeFromCart('${product.id}')">Remove</button></td>
    `;
        cartItemsContainer.appendChild(productElement);
    });

    cartTotalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function changeQuantity(productId, quantity) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        if (product.quantity <= 0) {
            cart = cart.filter(p => p.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function submitContactForm(event) {
    event.preventDefault();
    alert('Message sent successfully!');
    event.target.reset();
}

let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
