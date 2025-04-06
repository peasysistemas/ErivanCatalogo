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

// Variável para armazenar a categoria ativa
let categoriaAtiva = "todos";

// Selecionar elementos dos filtros
const pesquisaInput = document.getElementById("pesquisa");
const botoesCategoria = document.querySelectorAll(".categoria-btn");

// Função principal de filtro
function filtrarProdutos() {
  const termoPesquisa = pesquisaInput.value.toLowerCase();
  const produtos = document.querySelectorAll(".produto");
  
  produtos.forEach(produto => {
    const nome = produto.querySelector("h2").textContent.toLowerCase();
    const descricao = produto.querySelector("p").textContent.toLowerCase();
    const codigo = produto.querySelector(".codigo").textContent.toLowerCase();
    const categoriasProduto = produto.getAttribute("data-categoria").split(" ");

    // Verifica correspondência com a pesquisa
    const correspondePesquisa = termoPesquisa === "" || 
                             nome.includes(termoPesquisa) || 
                             descricao.includes(termoPesquisa) || 
                             codigo.includes(termoPesquisa);
    
    // Verifica correspondência com a categoria
    const correspondeCategoria = categoriaAtiva === "todos" || 
                              categoriasProduto.includes(categoriaAtiva);

    // Aplica os filtros combinados
    produto.style.display = (correspondePesquisa && correspondeCategoria) 
                          ? "block" 
                          : "none";
  });
}

// Evento para pesquisa por texto
pesquisaInput.addEventListener("input", filtrarProdutos);

// Eventos para filtro por categoria
botoesCategoria.forEach(botao => {
  botao.addEventListener("click", function() {
    // Atualiza categoria ativa
    categoriaAtiva = this.getAttribute("data-categoria");
    
    // Atualiza classe ativa visual
    botoesCategoria.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    
    // Aplica filtros
    filtrarProdutos();
  });
});

// Inicializa com "Todos" ativo
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.categoria-btn[data-categoria="todos"]').classList.add("active");
});




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
// Objeto com as fotos das subcategorias

const fotosSubcategorias = {
  "001": {
    Metal: "Image/product/canivetemetal.jpg",
  },
  "002": {
    Vermelho: "Image/product/fotorede.jpg",
    Azulmarrom: "Image/product/redebucho2.jpg",
    Begepreto : "Image/product/redebuchobege.jpg",
    Azulbranco: "Image/product/redebuchoazul.jpg",
    Branco: "Image/product/redebuchobranca.jpg",
    Cinza: "Image/product/redebuchocinza.jpg",
    Marrom: "Image/product/redebuchomarrom.jpg",
    Vermelha: "Image/product/redebuchovermelha.jpg",
    Vermelhabranco: "Image/product/redebuchovermelhabranco.jpg",
    Vinho: "Image/product/redebuchovinho.jpg",
    XadrezMarrom: "Image/product/redebuchoxaderzmarrom.jpg",
  },
  "003": {
    Sortido: "Image/product/kit talher de plasticocozinha.jpg",
  },
  "004": {
    Sortidos: "Image/product/kit10vasilhas.jpg",
    Roxo: "Image/product/kit10vasilhasroxo.jpg",
    Vermelho: "Image/product/kit10vasilhasverm.jpg",
    Preto: "Image/product/kit10vaspret.jpg",
  },
  "005": {
    Sortidos: "Image/product/kit10.jpg",
    Sortidos2: "Image/product/kitcozinhasort10.jpg",
  },
  "006": {
    Kit1: "Image/product/kitcozinha5vazilhas.jpg",
    Kit2: "Image/product/kitcozinha5vazsort.jpg",
    Kit3: "Image/product/potecoz5pcs.jpg",
    Kit4: "Image/product/kitcozinhavazipreto.jpg",
    Kit5: "Image/product/kitcozinhvazilhapreta.jpg",
  },
  "007": {
    Kitcom3: "Image/product/kitvazilhacom3und.jpg",
    Kitcom2: "Image/product/kit2vasilhas.jpg",
  },
  "008": {
    Sortido: "Image/product/variasredes.jpg",
  },
  "009": {
    Simples: "Image/product/capadecelular de couro.jpg",
    Bainha: "Image/product/capadecelcombainha.jpg",
    Bainha2: "Image/product/capadecelularcomcanivete.jpg",
  },
};

// Função para renderizar os produtos
function renderizarProdutos() {
  const produtos = [
    {
      codigo: "001",
      nome: "Canivete Metal",
      descricao: "Canivete Metalico",
      preco: "Consultar",
      imagem: "Image/product/canivetemetal.jpg",
      categorias: ["Ultensilios"],
      subcategorias: ["Metal"],
    },
    {
      codigo: "002",
      nome: "Rede bucho de boi",
      descricao: "Rede bucho de boi cores variadas",
      preco: "Consultar",
      imagem: "Image/product/redebuchodeboititle.jpg",
      categorias: ["Redes"],
      subcategorias: ["Vermelho", "Azulmarrom", "Begepreto", "Azulbranco", "Branco","Cinza","Marrom","Vermelha","Vermelhabranco","Vinho","XadrezMarrom"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "004",
      nome: "Kit 10 vasilhas",
      descricao: "Kit com 10 vasilhas em cores variadas",
      preco: "Consultar",
      imagem: "Image/product/kit10vasilhas.jpg",
      categorias: ["redes"],
      subcategorias: ["Sortidos", "Roxo", "Vermelho", "Preto"],
    },
    {
      codigo: "005",
      nome: "Kit cozinha com 10 vasilhas",
      descricao: "Kit cozinha com 10 vasilhas",
      preco: "Consultar",
      imagem: "Image/product/kit10.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortidos", "Sortidos2"],
    },
    {
      codigo: "006",
      nome: "Kit cozinha",
      descricao: "Kit cozinha 5 peças",
      preco: "Consultar",
      imagem: "Image/product/kitcozinha5vazilhas.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Kit1", "Kit2", "Kit3", "Kit4", "Kit5"],
    },
    {
      codigo: "007",
      nome: "Kit vasilhas uso geral",
      descricao: "Kit vasilha uso geral",
      preco: "Consultar",
      imagem: "Image/product/kitvazilhacom3und.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Kitcom3", "Kitcom2",],
    },
    {
      codigo: "008",
      nome: "Redes Sortidas varias cores",
      descricao: "Redes de cores variadas",
      preco: "Consultar",
      imagem: "Image/product/variasredes.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "009",
      nome: "Capa para Celular de couro",
      descricao: "Capa para celular de couro com e sem a bainha de canivete",
      preco: "Consultar",
      imagem: "Image/product/capadecelularcomcanivete.jpg",
      categorias: ["Ultensilios"],
      subcategorias: ["Simples", "Bainha", "Bainha2"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["Cozinha"],
      subcategorias: ["Sortido"],
    },
    // Adicione mais produtos aqui
  ];

  const produtosContainer = document.querySelector(".produtos");
  produtosContainer.innerHTML = ""; // Limpa o conteúdo atual

  produtos.forEach(produto => {
    const produtoDiv = document.createElement("div");
    produtoDiv.classList.add("produto");
    produtoDiv.setAttribute("data-codigo", produto.codigo);
    produtoDiv.setAttribute("data-categoria", produto.categorias.join(" "));

    let subcategoriaButtons = produto.subcategorias.map(subcategoria => {
      return `<button class="subcategoria-btn" data-subcategoria="${subcategoria}">${subcategoria}</button>`;
    }).join("");

    produtoDiv.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
      <div class="descricao">
        <h2>${produto.nome}</h2>
        <p>Código: <span class="codigo">${produto.codigo}</span></p>
        <p>${produto.descricao}</p>
        <p>Preço: <span class="preco">${produto.preco}</span></p>
        <div class="subcategorias">
          ${subcategoriaButtons}
        </div>
      </div>
    `;

    produtosContainer.appendChild(produtoDiv);
  });

  // Adicionar o evento de click nos botões de subcategoria
  document.querySelectorAll(".subcategoria-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const produtoElement = this.closest(".produto");
      const subcategoria = this.getAttribute("data-subcategoria");
      abrirModalSubcategoria(produtoElement, subcategoria);
    });
  });
}

// Chama a função para renderizar os produtos quando a página carrega
renderizarProdutos();

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

// Função para fechar o modal ao clicar fora da área do conteúdo
function fecharModalAoCliqueFora(event, modal) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Adiciona o evento de clique para fechar o modal quando clicar fora da área do conteúdo
subcategoriaModal.addEventListener("click", function (event) {
  fecharModalAoCliqueFora(event, subcategoriaModal);
});

cartViewModal.addEventListener("click", function (event) {
  fecharModalAoCliqueFora(event, cartViewModal);
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
  window.open(url, "_blank");

  // Limpa o carrinho após a compra
  localStorage.removeItem("cart");
  updateCartCount();
  showFeedbackMessage("Pedido enviado com sucesso! Você será redirecionado ao WhatsApp.");
});

// Event listener para adicionar ao carrinho a partir do modal
addToCartFromModal.addEventListener("click", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productInCart = cart.find(item => item.code === currentProduct.code && item.subcategoria === currentProduct.subcategoria);

  if (productInCart) {
    productInCart.quantity += parseInt(modalQuantity.value);
  } else {
    cart.push({
      ...currentProduct,
      quantity: parseInt(modalQuantity.value)
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  cartViewModal.style.display = "none";
  showFeedbackMessage("Produto adicionado ao carrinho.");
});

// Event listener para fechar o modal de subcategoria
closeModal.addEventListener("click", function () {
  subcategoriaModal.style.display = "none";
});

// Atualiza o contador de itens no carrinho assim que a página carregar
updateCartCount();
