document.addEventListener("DOMContentLoaded", function () {
    // --- Filtro de produtos ---
    const barraPesquisa = document.getElementById("pesquisa");
    const botoesCategorias = document.querySelectorAll(".categoria-btn");
    const produtos = document.querySelectorAll(".produto");
    const mensagemSemResultados = document.createElement("p");
    mensagemSemResultados.textContent = "Nenhum produto encontrado.";
    mensagemSemResultados.style.display = "none";
    mensagemSemResultados.style.textAlign = "center";
    mensagemSemResultados.style.marginTop = "20px";
    document.querySelector("main").appendChild(mensagemSemResultados);
  
    // Função para filtrar produtos
    function filtrarProdutos() {
      const termo = barraPesquisa.value.toLowerCase();
      const categoriaAtiva =
        document.querySelector(".categoria-btn.ativo")?.getAttribute("data-categoria") || "todos";
  
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
  
    // Evento de pesquisa
    barraPesquisa.addEventListener("input", filtrarProdutos);
  
    // Evento de clique nos botões de categoria
    botoesCategorias.forEach(botao => {
      botao.addEventListener("click", function () {
        botoesCategorias.forEach(btn => btn.classList.remove("ativo"));
        botao.classList.add("ativo");
        filtrarProdutos();
      });
    });
  
    // Inicializar com todos os produtos visíveis
    filtrarProdutos();
  
    // --- Função de ampliação de imagem ---
    // Seleciona todas as imagens dos produtos
    const imagensProdutos = document.querySelectorAll(".produto img");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
  
    imagensProdutos.forEach(img => {
      img.addEventListener("click", function () {
        modalImg.src = this.src;      // Define a imagem clicada no modal
        modal.style.display = "flex"; // Exibe o modal com display flex para centralização
      });
    });
  
    // Fecha o modal ao clicar em qualquer lugar dele
    modal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });
  