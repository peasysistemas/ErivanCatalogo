import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

document.addEventListener("DOMContentLoaded", function () {
  const produtoForm = document.getElementById("produtoForm");
  const produtosList = document.getElementById("produtosList");

  // Função para carregar e renderizar os produtos
  async function carregarProdutos() {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    produtosList.innerHTML = ""; // Limpa o conteúdo atual

    querySnapshot.forEach((doc) => {
      const produto = doc.data();
      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto-item");
      produtoDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" width="50">
        <div>
          <h3>${produto.nome}</h3>
          <p>Código: ${produto.codigo} | Categoria: ${produto.categoria} | Subcategoria: ${produto.subcategoria}</p>
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        </div>
        <button onclick="editarProduto('${doc.id}')">Editar</button>
        <button onclick="excluirProduto('${doc.id}')">Excluir</button>
      `;
      produtosList.appendChild(produtoDiv);
    });
  }

  // Função para salvar/editar produto
  produtoForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const produtoId = document.getElementById("produtoId").value;
    const produto = {
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
      await updateDoc(doc(db, "produtos", produtoId), produto);
    } else {
      // Adicionar novo produto
      await addDoc(collection(db, "produtos"), produto);
    }

    carregarProdutos(); // Atualiza a lista de produtos
    produtoForm.reset(); // Limpa o formulário
  });

  // Função para editar produto
  window.editarProduto = async function (id) {
    const docRef = doc(db, "produtos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const produto = docSnap.data();
      document.getElementById("produtoId").value = id;
      document.getElementById("nome").value = produto.nome;
      document.getElementById("descricao").value = produto.descricao;
      document.getElementById("codigo").value = produto.codigo;
      document.getElementById("categoria").value = produto.categoria;
      document.getElementById("subcategoria").value = produto.subcategoria;
      document.getElementById("preco").value = produto.preco;
      document.getElementById("imagem").value = produto.imagem;
    }
  };

  // Função para excluir produto
  window.excluirProduto = async function (id) {
    await deleteDoc(doc(db, "produtos", id));
    carregarProdutos(); // Atualiza a lista de produtos
  };

  // Carregar produtos ao iniciar a página
  carregarProdutos();
});