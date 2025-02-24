import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAS4Qwbn7UECeIenN41u-0uWayqGMkDWzg",
  authDomain: "bancocatalogo-3a5ef.firebaseapp.com",
  projectId: "bancocatalogo-3a5ef",
  storageBucket: "bancocatalogo-3a5ef.firebasestorage.app",
  messagingSenderId: "604767753747",
  appId: "1:604767753747:web:7fb94058496da8dcfa91e6",
  measurementId: "G-VL0MSDF5ER",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variável para armazenar o produto atual (usado no modal do carrinho)
let currentProduct = {};

// Função para carregar e renderizar os produtos
async function carregarProdutos() {
  const produtosContainer = document.querySelector(".produtos");
  const querySnapshot = await getDocs(collection(db, "produtos"));

  produtosContainer.innerHTML = ""; // Limpa o conteúdo atual

  querySnapshot.forEach((doc) => {
    const produto = doc.data();

    // Garantir que o preço seja um número
    const preco = parseFloat(produto.preco);

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
        <p>Preço: R$ <span class="preco">${preco.toFixed(2)}</span></p>
        <select class="subcategoria-select">
          <option value="">Escolha uma opção</option>
          ${produto.subcategoria.split(",").map(opcao => `
            <option value="${opcao.trim()}">${opcao.trim()}</option>
          `).join("")}
        </select>
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
        price: parseFloat(produtoElement.querySelector(".preco").textContent.replace("Preço: R$ ", ""))
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
const barraPesquisa = document.getElementById("pesquisa");
const botoesCategorias = document.querySelectorAll(".categoria-btn");
const subcategoriaSelect = document.getElementById("subcategoria");
const mensagemSemResultados = document.createElement("p");
mensagemSemResultados.textContent = "Nenhum produto encontrado.";
mensagemSemResultados.style.display = "none";
mensagemSemResultados.style.textAlign = "center";
mensagemSemResultados.style.marginTop = "20px";
document.querySelector("main").appendChild(mensagemSemResultados);

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