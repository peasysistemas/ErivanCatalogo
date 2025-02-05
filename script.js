document.addEventListener("DOMContentLoaded", function () {
    // ---------- Função de Filtro de Produtos ----------
    const barraPesquisa = document.getElementById("pesquisa");
    const botoesCategorias = document.querySelectorAll(".categoria-btn");
    const produtos = document.querySelectorAll(".produto");
    const mensagemSemResultados = document.createElement("p");
    mensagemSemResultados.textContent = "Nenhum produto encontrado.";
    mensagemSemResultados.style.display = "none";
    mensagemSemResultados.style.textAlign = "center";
    mensagemSemResultados.style.marginTop = "20px";
    document.querySelector("main").appendChild(mensagemSemResultados);
  
    function filtrarProdutos() {
      const termo = barraPesquisa.value.toLowerCase();
      const categoriaAtiva = document.querySelector(".categoria-btn.ativo")?.getAttribute("data-categoria") || "todos";
      let produtosVisiveis = 0;
  
      produtos.forEach(produto => {
        const nomeProduto = produto.querySelector("h2").textContent.toLowerCase();
        const codigoProduto = produto.getAttribute("data-codigo").toLowerCase();
        const categoriaProduto = produto.getAttribute("data-categoria");
  
        const correspondePesquisa = nomeProduto.includes(termo) || codigoProduto.includes(termo);
        const correspondeCategoria = categoriaAtiva === "todos" || categoriaProduto === categoriaAtiva;
  
        if (correspondePesquisa && correspondeCategoria) {
          produto.style.display = "block";
          produtosVisiveis++;
        } else {
          produto.style.display = "none";
        }
      });
  
      mensagemSemResultados.style.display = produtosVisiveis === 0 ? "block" : "none";
    }
  
    barraPesquisa.addEventListener("input", filtrarProdutos);
    botoesCategorias.forEach(botao => {
      botao.addEventListener("click", function () {
        botoesCategorias.forEach(btn => btn.classList.remove("ativo"));
        botao.classList.add("ativo");
        filtrarProdutos();
      });
    });
    filtrarProdutos();
  
    // ---------- Função de Ampliação de Imagem ----------
    const imagensProdutos = document.querySelectorAll(".produto img");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
  
    imagensProdutos.forEach(img => {
      img.addEventListener("click", function () {
        modalImg.src = this.src;
        modal.style.display = "flex";
      });
    });
  
    modal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    // ---------- Função de Adicionar ao Carrinho (Definir Quantidade) ----------
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartModal = document.getElementById("cartModal");
    const cartProductImage = document.getElementById("cartProductImage");
    const cartProductName = document.getElementById("cartProductName");
    const quantityInput = document.getElementById("quantity");
    const confirmCart = document.getElementById("confirmCart");
    const cancelCart = document.getElementById("cancelCart");
  
    // Variável para armazenar o item atual (usado para confirmar a adição)
    let currentProduct = {};
  
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
  
        cartProductImage.src = productImgSrc;
        cartProductName.textContent = productName;
        quantityInput.value = 1;
        cartModal.style.display = "flex";
      });
    });
  
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
  
    cancelCart.addEventListener("click", function () {
      cartModal.style.display = "none";
    });
  
    // ---------- Funções para Visualizar e Gerenciar o Carrinho ----------
    const viewCartButton = document.getElementById("viewCart");
    const cartViewModal = document.getElementById("cartViewModal");
    const cartItemsContainer = document.getElementById("cartItems");
    const finalizePurchase = document.getElementById("finalizePurchase");
    const closeCartView = document.getElementById("closeCartView");
    const cartCountSpan = document.getElementById("cartCount");
  
    // Atualiza o contador de itens no carrinho
    function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountSpan.textContent = total;
    }
  
    // Exibe os itens do carrinho no modal de visualização
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
          <span>${item.name} (Qtd: ${item.quantity})</span>
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
  
    viewCartButton.addEventListener("click", function () {
      renderCartItems();
      cartViewModal.style.display = "flex";
    });
  
    closeCartView.addEventListener("click", function () {
      cartViewModal.style.display = "none";
    });
  
    // ---------- Finalizar Compra e Enviar Pedido para WhatsApp ----------
    finalizePurchase.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }
      // Constrói a mensagem do pedido
      let mensagem = "Olá, gostaria de fazer o pedido:\n";
      cart.forEach(item => {
        mensagem += `\n*${item.name}* - Quantidade: ${item.quantity}`;
      });
      // Exemplo de número do WhatsApp do administrador (altere conforme necessário)
      const adminWhatsApp = "5584981331401";
      const url = `https://api.whatsapp.com/send?phone=${adminWhatsApp}&text=${encodeURIComponent(mensagem)}`;
  
      // Opcional: limpar o carrinho após finalizar o pedido
      localStorage.removeItem("cart");
      updateCartCount();
      cartViewModal.style.display = "none";
  
      // Abre o WhatsApp com a mensagem
      window.open(url, "_blank");
    });
  
    // Atualiza o contador ao carregar a página
    updateCartCount();
  });
  