// Variável para armazenar o produto atual (usado no modal do carrinho)
let currentProduct = {};

// Selecionar elementos do modal de subcategoria
const subcategoriaModal = document.getElementById("subcategoriaModal");
const modalSubcategoriaImage = document.getElementById("modalSubcategoriaImage");
const modalProductDescription = document.getElementById("modalProductDescription");
const closeModal = document.querySelector(".close-modal");
const addToCartFromModal = document.getElementById("addToCartFromModal");
const modalQuantity = document.getElementById("modalQuantity");

// Mensagem de feedback
const feedbackMessage = document.getElementById("feedbackMessage");

// Objeto com as fotos das subcategorias
const fotosSubcategorias = {
  "001": {
    kitcom2: "./Image/photo_3_2025-02-25_15-21-36.jpg",
    kitcom3: "./Image/photo_4_2025-02-25_15-21-36.jpg",
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

// Inicialização
updateCartCount();