// Variável para armazenar o produto atual (usado no modal do carrinho)
let currentProduct = {};

// Selecionar elementos do modal de subcategoria
const subcategoriaModal = document.getElementById("subcategoriaModal");
const modalSubcategoriaImage = document.getElementById("modalSubcategoriaImage");
const modalProductDescription = document.getElementById("modalProductDescription");
const closeModal = document.querySelector(".close-modal");
const addToCartFromModal = document.getElementById("addToCartFromModal");
const modalQuantity = document.getElementById("modalQuantity");

// Selecionar elementos do modal do carrinho
const cartViewModal = document.getElementById("cartViewModal");
const cartItemsContainer = document.getElementById("cartItems");
const finalizePurchase = document.getElementById("finalizePurchase");
const closeCartView = document.getElementById("closeCartView");

// Mensagem de feedback
const feedbackMessage = document.getElementById("feedbackMessage");

// Objeto com as fotos das subcategorias
const fotosSubcategorias = {
  "001": {
    sortido: "./Image/kit10vasilhassort.jpg",
    preto: "./Image/kit10vaspret.jpg",
    vermelho: "./Image/kit10vasilhasverm.jpg",
    roxo: "./Image/kit10vasilhasroxo.jpg",
    azulciano: "./Image/kit10vasilhassort.jpg",
  },
  "002": {
    cozinha: "https://via.placeholder.com/200?text=Faca+de+Cozinha",
    campo: "https://via.placeholder.com/200?text=Faca+de+Campo",
  },
  "003": {
    audio: "https://via.placeholder.com/200?text=Fone+Bluetooth",
    acessorios: "https://via.placeholder.com/200?text=Case+Fone",
  },
};

// Função para exibir mensagem de feedback
function showFeedbackMessage(message, isError = false) {
  feedbackMessage.textContent = message;
  feedbackMessage.classList.add(isError ? "error" : "success");
  feedbackMessage.style.display = "block";
  setTimeout(() => {
    feedbackMessage.style.display = "none";
    feedbackMessage.classList.remove(isError ? "error" : "success");
  }, 3000);
}

// Função para abrir o modal da subcategoria
function abrirModalSubcategoria(produtoElement, subcategoria) {
  const codigoProduto = produtoElement.getAttribute("data-codigo");

  if (fotosSubcategorias[codigoProduto] && fotosSubcategorias[codigoProduto][subcategoria]) {
    modalSubcategoriaImage.src = fotosSubcategorias[codigoProduto][subcategoria];
    modalProductDescription.textContent = produtoElement.querySelector("p").textContent;
    subcategoriaModal.style.display = "flex";

    // Armazena os dados do produto atual
    currentProduct = {
      code: codigoProduto,
      name: produtoElement.querySelector("h2").textContent,
      image: fotosSubcategorias[codigoProduto][subcategoria],
      price: parseFloat(produtoElement.querySelector(".preco").textContent.replace("Preço: R$ ", "")),
      subcategoria: subcategoria,
    };
  } else {
    showFeedbackMessage("Imagem não encontrada para esta subcategoria.", true);
  }
}

// Adicionar event listener para os botões de subcategoria
document.querySelectorAll(".subcategoria-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const produtoElement = this.closest(".produto");
    const subcategoria = this.getAttribute("data-subcategoria");
    abrirModalSubcategoria(produtoElement, subcategoria);
  });
});

// Event listener para o botão "Adicionar ao Carrinho" no modal
addToCartFromModal.addEventListener("click", function () {
  const quantidade = parseInt(modalQuantity.value);
  if (quantidade < 1) {
    showFeedbackMessage("A quantidade deve ser pelo menos 1.", true);
    return;
  }

  // Adiciona o produto ao carrinho com a quantidade selecionada
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
  subcategoriaModal.style.display = "none";

  // Feedback visual
  showFeedbackMessage("Produto adicionado ao carrinho!");
});

// Fechar o modal de subcategoria
closeModal.addEventListener("click", function () {
  subcategoriaModal.style.display = "none";
});

// Fechar o modal ao clicar fora da imagem
window.addEventListener("click", function (e) {
  if (e.target === subcategoriaModal) {
    subcategoriaModal.style.display = "none";
  }
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

// Event listener para o botão "Ver Carrinho"
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
    showFeedbackMessage("Seu carrinho está vazio!", true);
    return;
  }

  // Constrói a mensagem do pedido
  let mensagem = "Olá, gostaria de fazer o pedido:\n";
  cart.forEach((item) => {
    mensagem += `\nCódigo: ${item.code} - *${item.name}* - Quantidade: ${item.quantity} - Tipo: ${item.subcategoria}`;
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

// Função para filtrar produtos por categoria
function filtrarProdutosPorCategoria(categoria) {
  const produtos = document.querySelectorAll(".produto");

  produtos.forEach((produto) => {
    const produtoCategoria = produto.getAttribute("data-categoria");

    if (categoria === "todos") {
      produto.style.display = "block"; // Mostra todos os produtos
    } else {
      if (produtoCategoria === categoria) {
        produto.style.display = "block"; // Mostra produtos da categoria selecionada
      } else {
        produto.style.display = "none"; // Oculta produtos de outras categorias
      }
    }
  });
}

// Função para filtrar produtos por texto (nome, código ou descrição)
function filtrarProdutosPorTexto(termo) {
  const produtos = document.querySelectorAll(".produto");

  produtos.forEach((produto) => {
    const nomeProduto = produto.querySelector("h2").textContent.toLowerCase();
    const descricaoProduto = produto.querySelector("p").textContent.toLowerCase();
    const codigoProduto = produto.querySelector(".codigo").textContent.toLowerCase();

    // Verifica se o termo de pesquisa está no nome, descrição ou código
    if (
      nomeProduto.includes(termo) ||
      descricaoProduto.includes(termo) ||
      codigoProduto.includes(termo)
    ) {
      produto.style.display = "block"; // Mostra o produto
    } else {
      produto.style.display = "none"; // Oculta o produto
    }
  });
}

// Adicionar event listeners para os botões de categoria
document.querySelectorAll(".categoria-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const categoria = this.getAttribute("data-categoria");
    filtrarProdutosPorCategoria(categoria);
  });
});

// Adicionar event listener para o campo de pesquisa
document.getElementById("pesquisa").addEventListener("input", function () {
  const termoPesquisa = this.value.trim().toLowerCase();
  filtrarProdutosPorTexto(termoPesquisa);
});

// Inicialização
updateCartCount();