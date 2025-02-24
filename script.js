import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const produtosContainer = document.querySelector(".produtos");

  // Função para carregar e renderizar os produtos
  async function carregarProdutos() {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    produtosContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const produto = doc.data();
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
          <p>Preço: R$ <span class="preco">${produto.preco.toFixed(2)}</span></p>
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

  // Carregar produtos ao iniciar a página
  carregarProdutos();
});