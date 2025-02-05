document.addEventListener("DOMContentLoaded", function () {
    const barraPesquisa = document.getElementById("pesquisa");
    const botoesCategorias = document.querySelectorAll(".categoria-btn");
    const produtos = document.querySelectorAll(".produto");

    // Função para filtrar produtos pela pesquisa
    barraPesquisa.addEventListener("input", function () {
        const termo = barraPesquisa.value.toLowerCase();

        produtos.forEach(produto => {
            const nomeProduto = produto.querySelector("h2").textContent.toLowerCase();
            if (nomeProduto.includes(termo)) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    });

    // Função para filtrar produtos por categoria
    botoesCategorias.forEach(botao => {
        botao.addEventListener("click", function () {
            const categoria = botao.getAttribute("data-categoria");

            // Remove a classe "ativo" de todos os botões e adiciona ao clicado
            botoesCategorias.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

            // Filtra os produtos
            produtos.forEach(produto => {
                const categoriaProduto = produto.getAttribute("data-categoria");
                if (categoria === "todos" || categoriaProduto === categoria) {
                    produto.style.display = "block";
                } else {
                    produto.style.display = "none";
                }
            });
        });
    });
});