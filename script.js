document.addEventListener("DOMContentLoaded", function () {
  const produtosContainer = document.querySelector(".produtos");
  const barraPesquisa = document.getElementById("pesquisa");
  const botoesCategorias = document.querySelectorAll(".categoria-btn");
  const subcategoriaSelect = document.getElementById("subcategoria");
  const mensagemSemResultados = document.createElement("p");
  mensagemSemResultados.textContent = "Nenhum produto encontrado.";
  mensagemSemResultados.style.display = "none";
  mensagemSemResultados.style.textAlign = "center";
  mensagemSemResultados.style.marginTop = "20px";
  document.querySelector("main").appendChild(mensagemSemResultados);

  // Função para carregar e renderizar os produtos
  function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtosContainer.innerHTML = ""; // Limpa o conteúdo atual

    produtos.forEach(produto => {
      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");
      produtoDiv.setAttribute("data-categoria", produto.categoria);
      produtoDiv.setAttribute("data-subcategoria", produto.subcategoria || "");
      produtoDiv.setAttribute("data-codigo", produto.codigo);

      produtoDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="descricao">
          <h2>${produto.nome}</h2>
          <p>Código: <span class="codigo">${produto.codigo}</span></p>
          <p>${produto.descricao}</p>
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          <button class="add-to-cart">Adicionar ao Carrinho</button>
        </div>
      `;

      produtosContainer.appendChild(produtoDiv);
    });

    // Reaplica os event listeners para os botões de adicionar ao carrinho
    aplicarEventListeners();
  }

  // Função para aplicar event listeners aos botões de adicionar ao carrinho
  function aplicarEventListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const produtoElement = this.closest(".produto");
        const productImgSrc = produtoElement.querySelector("img").src;
        const productName = produtoElement.querySelector("h2").textContent;
        const productCode = produtoElement.getAttribute("data-codigo");

        // Armazena os dados do produto atual
        currentProduct = {
          code: productCode,
          name: productName,
          image: productImgSrc
        };

        // Exibe o modal para definir a quantidade
        cartProductImage.src = productImgSrc;
        cartProductName.textContent = productName;
        quantityInput.value = 1;
        cartModal.style.display = "flex";
      });
    });
  }

  // Função de filtro de produtos
  function filtrarProdutos() {
    const termo = barraPesquisa.value.toLowerCase();
    const categoriaAtiva = document.querySelector(".categoria-btn.ativo")?.getAttribute("data-categoria") || "todos";
    const subcategoriaAtiva = subcategoriaSelect.value.toLowerCase();
    const produtos = document.querySelectorAll(".produto");

    let produtosVisiveis = 0;

    produtos.forEach(produto => {
      const nomeProduto = produto.querySelector("h2").textContent.toLowerCase();
      const codigoProduto = produto.getAttribute("data-codigo").toLowerCase();
      const categoriaProduto = produto.getAttribute("data-categoria");
      const subcategoriaProduto = produto.getAttribute("data-subcategoria")?.toLowerCase() || "";

      const correspondePesquisa = nomeProduto.includes(termo) || codigoProduto.includes(termo);
      const correspondeCategoria = categoriaAtiva === "todos" || categoriaProduto === categoriaAtiva;
      const correspondeSubcategoria = !subcategoriaAtiva || subcategoriaProduto === subcategoriaAtiva;

      if (correspondePesquisa && correspondeCategoria && correspondeSubcategoria) {
        produto.style.display = "block";
        produtosVisiveis++;
      } else {
        produto.style.display = "none";
      }
    });

    mensagemSemResultados.style.display = produtosVisiveis === 0 ? "block" : "none";
  }

  // Event listeners para filtros
  barraPesquisa.addEventListener("input", filtrarProdutos);
  botoesCategorias.forEach(botao => {
    botao.addEventListener("click", function () {
      botoesCategorias.forEach(btn => btn.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtrarProdutos();
    });
  });
  subcategoriaSelect.addEventListener("change", filtrarProdutos);

  // Carregar produtos ao iniciar a página
  carregarProdutos();
});

document.addEventListener("DOMContentLoaded", function () {
  const produtosContainer = document.querySelector(".produtos");
  const barraPesquisa = document.getElementById("pesquisa");
  const botoesCategorias = document.querySelectorAll(".categoria-btn");
  const subcategoriaSelect = document.getElementById("subcategoria");
  const mensagemSemResultados = document.createElement("p");
  mensagemSemResultados.textContent = "Nenhum produto encontrado.";
  mensagemSemResultados.style.display = "none";
  mensagemSemResultados.style.textAlign = "center";
  mensagemSemResultados.style.marginTop = "20px";
  document.querySelector("main").appendChild(mensagemSemResultados);

  // Variável para armazenar o produto atual (usado no modal do carrinho)
  let currentProduct = {};

  // Função para carregar e renderizar os produtos
  function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtosContainer.innerHTML = ""; // Limpa o conteúdo atual

    produtos.forEach(produto => {
      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");
      produtoDiv.setAttribute("data-categoria", produto.categoria);
      produtoDiv.setAttribute("data-subcategoria", produto.subcategoria || "");
      produtoDiv.setAttribute("data-codigo", produto.codigo);

      produtoDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="descricao">
          <h2>${produto.nome}</h2>
          <p>Código: <span class="codigo">${produto.codigo}</span></p>
          <p>${produto.descricao}</p>
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          <button class="add-to-cart">Adicionar ao Carrinho</button>
        </div>
      `;

      produtosContainer.appendChild(produtoDiv);
    });

    // Reaplica os event listeners para os botões de adicionar ao carrinho
    aplicarEventListeners();
  }

  // Função para aplicar event listeners aos botões de adicionar ao carrinho
  function aplicarEventListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const produtoElement = this.closest(".produto");
        const productImgSrc = produtoElement.querySelector("img").src;
        const productName = produtoElement.querySelector("h2").textContent;
        const productCode = produtoElement.getAttribute("data-codigo");

        // Armazena os dados do produto atual
        currentProduct = {
          code: productCode,
          name: productName,
          image: productImgSrc,
          price: parseFloat(produtoElement.querySelector(".descricao p").textContent.replace("Preço: R$ ", ""))
        };

        // Exibe o modal para definir a quantidade
        cartProductImage.src = productImgSrc;
        cartProductName.textContent = productName;
        quantityInput.value = 1;
        cartModal.style.display = "flex";
      });
    });
  }

  // Função de filtro de produtos
  function filtrarProdutos() {
    const termo = barraPesquisa.value.toLowerCase();
    const categoriaAtiva = document.querySelector(".categoria-btn.ativo")?.getAttribute("data-categoria") || "todos";
    const subcategoriaAtiva = subcategoriaSelect.value.toLowerCase();
    const produtos = document.querySelectorAll(".produto");

    let produtosVisiveis = 0;

    produtos.forEach(produto => {
      const nomeProduto = produto.querySelector("h2").textContent.toLowerCase();
      const codigoProduto = produto.getAttribute("data-codigo").toLowerCase();
      const categoriaProduto = produto.getAttribute("data-categoria");
      const subcategoriaProduto = produto.getAttribute("data-subcategoria")?.toLowerCase() || "";

      const correspondePesquisa = nomeProduto.includes(termo) || codigoProduto.includes(termo);
      const correspondeCategoria = categoriaAtiva === "todos" || categoriaProduto === categoriaAtiva;
      const correspondeSubcategoria = !subcategoriaAtiva || subcategoriaProduto === subcategoriaAtiva;

      if (correspondePesquisa && correspondeCategoria && correspondeSubcategoria) {
        produto.style.display = "block";
        produtosVisiveis++;
      } else {
        produto.style.display = "none";
      }
    });

    mensagemSemResultados.style.display = produtosVisiveis === 0 ? "block" : "none";
  }

  // Event listeners para filtros
  barraPesquisa.addEventListener("input", filtrarProdutos);
  botoesCategorias.forEach(botao => {
    botao.addEventListener("click", function () {
      botoesCategorias.forEach(btn => btn.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtrarProdutos();
    });
  });
  subcategoriaSelect.addEventListener("change", filtrarProdutos);

  // ---------- Código do Carrinho ----------
  const cartModal = document.getElementById("cartModal");
  const cartProductImage = document.getElementById("cartProductImage");
  const cartProductName = document.getElementById("cartProductName");
  const quantityInput = document.getElementById("quantity");
  const confirmCart = document.getElementById("confirmCart");
  const cancelCart = document.getElementById("cancelCart");
  const viewCartButton = document.getElementById("viewCart");
  const cartViewModal = document.getElementById("cartViewModal");
  const cartItemsContainer = document.getElementById("cartItems");
  const finalizePurchase = document.getElementById("finalizePurchase");
  const closeCartView = document.getElementById("closeCartView");
  const cartCountSpan = document.getElementById("cartCount");

  // Função para atualizar o contador de itens no carrinho
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = total;
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
        <span>Código: ${item.code} | ${item.name} (Qtd: ${item.quantity})</span>
        <button data-index="${index}" class="remove-item">Remover</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    // Adiciona funcionalidade para remover item
    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
      });
    });
  }

  // Adicionar produto ao carrinho
  confirmCart.addEventListener("click", function () {
    const quantidade = parseInt(quantityInput.value);
    if (quantidade < 1) return; // Validação mínima

    // Recupera o carrinho do localStorage (se houver)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verifica se o produto já existe no carrinho (pelo código)
    const index = cart.findIndex(item => item.code === currentProduct.code);
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
  });

  // Cancelar adição ao carrinho
  cancelCart.addEventListener("click", function () {
    cartModal.style.display = "none";
  });

  // Visualizar carrinho
  viewCartButton.addEventListener("click", function () {
    renderCartItems();
    cartViewModal.style.display = "flex";
  });

  // Fechar modal do carrinho
  closeCartView.addEventListener("click", function () {
    cartViewModal.style.display = "none";
  });

  // Finalizar compra e enviar pedido para WhatsApp
  finalizePurchase.addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    // Constrói a mensagem do pedido
    let mensagem = "Olá, gostaria de fazer o pedido:\n";
    cart.forEach(item => {
      mensagem += `\nCódigo: ${item.code} - *${item.name}* - Quantidade: ${item.quantity}`;
    });
    // Exemplo de número do WhatsApp do administrador (altere conforme necessário)
    const adminWhatsApp = "5584981331401";
    const url = `https://api.whatsapp.com/send?phone=${adminWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    // Limpa o carrinho após finalizar o pedido
    localStorage.removeItem("cart");
    updateCartCount();
    cartViewModal.style.display = "none";

    // Abre o WhatsApp com a mensagem
    window.open(url, "_blank");
  });

  // Atualiza o contador do carrinho ao carregar a página
  updateCartCount();

  // Carregar produtos ao iniciar a página
  carregarProdutos();
});