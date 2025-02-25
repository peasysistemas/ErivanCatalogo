// Variável para armazenar o produto atual (usado no modal do carrinho)
let currentProduct = {};

// Selecionar elementos do modal do carrinho
const cartModal = document.getElementById("cartModal");
const cartProductImage = document.getElementById("cartProductImage");
const cartProductName = document.getElementById("cartProductName");
const quantityInput = document.getElementById("quantity");
const confirmCart = document.getElementById("confirmCart");
const cancelCart = document.getElementById("cancelCart");

// Selecionar elementos do modal de visualização do carrinho
const cartViewModal = document.getElementById("cartViewModal");
const cartItemsContainer = document.getElementById("cartItems");
const finalizePurchase = document.getElementById("finalizePurchase");
const closeCartView = document.getElementById("closeCartView");

// Função para aplicar event listeners aos botões de adicionar ao carrinho
function aplicarEventListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const produtoElement = this.closest(".produto");
      const productImgSrc = produtoElement.querySelector("img").src;
      const productName = produtoElement.querySelector("h2").textContent;
      const productCode = produtoElement.getAttribute("data-codigo");
      const productPrice = parseFloat(
        produtoElement.querySelector(".preco").textContent.replace("Preço: R$ ", "")
      );
      const subcategoriaSelecionada = produtoElement.querySelector(".subcategoria-select").value;

      // Armazena os dados do produto atual
      currentProduct = {
        code: productCode,
        name: productName,
        image: productImgSrc,
        price: productPrice,
        subcategoria: subcategoriaSelecionada,
      };

      // Exibe o modal para definir a quantidade
      cartProductImage.src = productImgSrc;
      cartProductName.textContent = productName;
      quantityInput.value = 1;
      cartModal.style.display = "flex";
    });
  });
}

// Event listener para confirmar a adição ao carrinho
confirmCart.addEventListener("click", function () {
  const quantidade = parseInt(quantityInput.value);
  if (quantidade < 1) {
    alert("A quantidade deve ser pelo menos 1.");
    return;
  }

  // Recupera o carrinho do localStorage (se houver)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se o produto já existe no carrinho (pelo código e subcategoria)
  const index = cart.findIndex(
    (item) => item.code === currentProduct.code && item.subcategoria === currentProduct.subcategoria
  );
  if (index > -1) {
    // Atualiza a quantidade do produto existente
    cart[index].quantity += quantidade;
  } else {
    // Adiciona novo produto ao carrinho
    cart.push({ ...currentProduct, quantity: quantidade });
  }

  // Salva o carrinho atualizado
  localStorage.setItem("cart", JSON.stringify(cart));

  // Atualiza o contador do carrinho
  updateCartCount();
  cartModal.style.display = "none";

  // Feedback visual
  alert("Produto adicionado ao carrinho!");
});

// Event listener para cancelar a adição ao carrinho
cancelCart.addEventListener("click", function () {
  cartModal.style.display = "none";
});

// Função para atualizar o contador de itens no carrinho
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = total;
}

// Função para renderizar os itens do carrinho no modal
function renderCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.textContent = "Seu carrinho está vazio.";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50">
      <div>
        <span>Código: ${item.code} | ${item.name} (Qtd: ${item.quantity}) - Subcategoria: ${item.subcategoria}</span>
      </div>
      <button onclick="removerItem(${index})">Remover</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
}

// Função para remover um item do carrinho
window.removerItem = function (index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
};

// Event listener para visualizar o carrinho
document.getElementById("viewCart").addEventListener("click", function () {
  renderCartItems();
  cartViewModal.style.display = "flex";
});

// Event listener para fechar o modal do carrinho
closeCartView.addEventListener("click", function () {
  cartViewModal.style.display = "none";
});

// Event listener para finalizar a compra e enviar pedido para o WhatsApp
finalizePurchase.addEventListener("click", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // Constrói a mensagem do pedido
  let mensagem = "Olá, gostaria de fazer o pedido:\n";
  cart.forEach((item) => {
    mensagem += `\nCódigo: ${item.code} - *${item.name}* - Quantidade: ${item.quantity} - Subcategoria: ${item.subcategoria}`;
  });

  // Número do WhatsApp do administrador (altere conforme necessário)
  const adminWhatsApp = "5584981331401"; // Substitua pelo número correto
  const url = `https://api.whatsapp.com/send?phone=${adminWhatsApp}&text=${encodeURIComponent(mensagem)}`;

  // Limpa o carrinho após finalizar o pedido
  localStorage.removeItem("cart");
  updateCartCount();
  cartViewModal.style.display = "none";

  // Abre o WhatsApp com a mensagem
  window.open(url, "_blank");
});

// Aplicar event listeners ao carregar a página
aplicarEventListeners();