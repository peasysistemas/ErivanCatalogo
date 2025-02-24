document.addEventListener("DOMContentLoaded", function () {
    const produtoForm = document.getElementById("produtoForm");
    const produtosList = document.getElementById("produtosList");
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  
    // Função para renderizar a lista de produtos
    function renderizarProdutos() {
      produtosList.innerHTML = "";
      produtos.forEach((produto, index) => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto-item");
        produtoDiv.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" width="50">
          <div>
            <h3>${produto.nome}</h3>
            <p>Código: ${produto.codigo} | Categoria: ${produto.categoria} | Subcategoria: ${produto.subcategoria}</p>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          </div>
          <button onclick="editarProduto(${index})">Editar</button>
          <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        produtosList.appendChild(produtoDiv);
      });
    }
  
    // Função para salvar/editar produto
    produtoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const produtoId = document.getElementById("produtoId").value;
      const produto = {
        id: produtoId || Date.now().toString(),
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        codigo: document.getElementById("codigo").value,
        categoria: document.getElementById("categoria").value,
        subcategoria: document.getElementById("subcategoria").value,
        preco: parseFloat(document.getElementById("preco").value),
        imagem: document.getElementById("imagem").value,
      };
  
      if (produtoId) {
        // Editar produto existente
        const index = produtos.findIndex(p => p.id === produtoId);
        produtos[index] = produto;
      } else {
        // Adicionar novo produto
        produtos.push(produto);
      }
  
      localStorage.setItem("produtos", JSON.stringify(produtos));
      renderizarProdutos();
      produtoForm.reset();
    });
  
    // Função para editar produto
    window.editarProduto = function (index) {
      const produto = produtos[index];
      document.getElementById("produtoId").value = produto.id;
      document.getElementById("nome").value = produto.nome;
      document.getElementById("descricao").value = produto.descricao;
      document.getElementById("codigo").value = produto.codigo;
      document.getElementById("categoria").value = produto.categoria;
      document.getElementById("subcategoria").value = produto.subcategoria;
      document.getElementById("preco").value = produto.preco;
      document.getElementById("imagem").value = produto.imagem;
    };
  
    // Função para excluir produto
    window.excluirProduto = function (index) {
      produtos.splice(index, 1);
      localStorage.setItem("produtos", JSON.stringify(produtos));
      renderizarProdutos();
    };
  
    // Renderizar produtos ao carregar a página
    renderizarProdutos();
  });