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
    Metal2:"Image/product/canivete metal 2.jpeg",
    Metal3:"Image/product/canivete metal 3.jpeg",
    Madeira: "Image/product/canivetecabomadeira.jpg",
    CaniveteFaca: "Image/product/Canivete Faca.jpeg",
    Canivetecabodecorado: "Image/product/canivete cabo decorado.jpeg",
    Canivetecabodeosso: "Image/product/canivete cabo de madeira (2).jpeg",
    Canivetecabodemadeira2: "Image/product/cabo de madeira.jpeg",
    Cutelo: "Image/product/Cutelo.jpeg",
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
    Sortido2: "Image/product/kit talher de plasticocozinha 02.jpeg",
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
    Bainha3: "Image/product/capa de couro.jpeg"
  },
  "010": {
    Sortido: "Image/product/tapetesala.jpg",
  },
  "011": {
    Sortido: "Image/product/passadeiradecozinha.jpg",
  },
  "012": {
    Bege: "Image/product/capasofabege.jpg",
    Azul: "Image/product/capasofaazul.jpg"
  },
  "013": {
    Mod1: "Image/product/cadeirinhainfantil1.jpg",
    Mod2: "Image/product/cadeirinhainfantil2.jpg",
    Mod3: "Image/product/cadeirinhainfantil3.jpg",
    Mod4: "Image/product/cadeirinhainfantil4.jpg"
  },
  "014": {
    Sortido: "Image/product/fonesdeouvidosortidos.jpg",
  },
  "015": {
    Modelo1: "Image/product/fonedeouvidosemfio.jpg",
    Modelo2: "Image/product/Fone de ouvido sem fio 2.jpeg",
  },
  "016": {
    Preto: "Image/product/bem vindo preto.jpeg",
    Vermelho: "Image/product/bem vindo vermelho.jpeg",
    Marrom:"Image/product/bem vindo marrom.jpeg",
  },
  "017":{
    Preto: "Image/product/Tapete testurizado preto.jpeg",
    Vermelho: "Image/product/Tapete testurizado vermelho.jpeg",
    Azul: "Image/product/Tapete testurizado azul.jpeg",
    vinho: "Image/product/Tapete testurizado vinho.jpeg",
  },
  "018":{
    Preto:"Image/product/tapete estreito preto.jpeg",
    Pink:"Image/product/tapete estreito pink.jpeg",
  },
  "019":{
    Mod1:"Image/product/Cadeira suspensa 01.jpeg",
    Mod2:"Image/product/cadeira suspensa 02.jpeg",
    Mod3:"Image/product/cadeira suspensa 03.jpeg",
  },
  "020":{
    Rosa:"Image/product/kit tapetes para banheiro rosa.jpeg",
    Verde:"Image/product/kittapetespara banheiroverde.jpeg",
    Vermelho:"Image/product/kit tapetes para banheiro vermelho.jpeg",
    Vermelho2:"Image/product/kit tapetes para banheiro vermelho 02.jpeg",
    Preto:"Image/product/kittapetesparabanheiropreto.jpeg",
  },
  "021":{
    AzulEscuro:"Image/product/casal azul 02.jpeg",
    Azul:"Image/product/casal azul.jpeg",
    EstampasDeBorboletas:"Image/product/casal estampas borboletas.jpeg",
    MarromEstampaFloral:"Image/product/casal marrom com estampa.jpeg",
    RosaComEstampa:"Image/product/casal rosa com estampa.jpeg",
    Rosa:"Image/product/casal rosa.jpeg",
    Verde:"Image/product/casal verde.jpeg",
  },
  "022":{
    Verde:"Image/product/Triturador verde.jpeg",
    Branco:"Image/product/triturador branco.jpeg",
  },
  "023":{
    Sortido:"Image/product/Panos de prato.jpeg"
  },
  "024":{
    Branco:"Image/product/Edredom branco.jpeg",
    Preto:"Image/product/Edredom preto.jpeg",
    Vermelho:"Image/product/Edredom Vermelho.jpeg",
  },
  "025":{
    JBLmini:"Image/product/caixa de som jbl mini.jpeg",
    Colorida:"Image/product/caixa de som colorida.jpeg",
    AProvaDágua:"Image/product/caixa de som a prova d´agua.jpeg",
    RádioClassico:"Image/product/caixa de som tipo rádio.jpeg",
    colorida02:"Image/product/caixa de som colorida2.jpeg"
  },
  "026":{
    Sortido:"Image/product/tapete para cosinha (2).jpeg"
  },
  "027":{
    AnalógicoAzul:"Image/product/Relógio analogico.jpeg",
    DigitalAzul:"Image/product/Relogio digital azul.jpeg",
    DigitalCamuflado:"Image/product/Relógio digital camuflado.jpeg",
    DigitalPrateado:"Image/product/Relógio digital prateado.jpeg",
    DgitalPreto:"Image/product/Relógiodigital preto.jpeg",
  },
  "028":{
    Branca:"Image/product/meia branca.jpeg",
    Preta:"Image/product/meia preta.jpeg",
    DiversasCanoLongo:"Image/product/meias cores variadas cano longo.jpeg",
    DiversasCores:"Image/product/meias cores variadas.jpeg",
  },
  "029":{
    Lacoste: "Image/product/cueca lacoste.jpeg",
    CalvinKlein: "Image/product/cueca ck.jpeg",
  },
  "030":{
    Maquinadenarbear:"Image/product/maquina de barbear.jpeg"
  },
  "031":{
   Azul:"Image/product/lençol azul.jpeg",
   Branco:"Image/product/lençol branco.jpeg",
   Verde:"Image/product/lençol verde.jpeg",
  },
  "032":{
    Sortido01:"Image/product/cinto 02.jpeg",
    Sortido02:"Image/product/cinto.jpeg",
   },
   "033":{
    Afiadordefacas:"Image/product/afiador.jpeg",
   },
   "034":{
      Modelo01:"Image/product/cadeira mod 1.jpeg",
      Modelo02:"Image/product/cadeira mod 2.jpeg",
      Banqueta:"Image/product/cadeira mod 3.jpeg",
   },
   "035":{
    Lanternademão:"Image/product/Lanterna de mão.jpeg",
    Lanternadecabeça:"Image/product/Lanterna de Cabeça.jpeg",
   },
   "036":{
    Aparadordepelosdonariz:"Image/product/aparador de pelos do naris.jpeg",
   },
   "037":{
    Sortido:"Image/product/cactos que dançam.jpeg",
   },
   "038":{
    Carregadorportatil:"Image/product/carregador portatil.jpeg",
   },
   "039":{
    Suporteparacelular:"Image/product/suport universal para celular.jpeg",
   },
};

// Função para renderizar os produtos
function renderizarProdutos() {
  const produtos = [
    {
      codigo: "001",
      nome: "Canivetes Variados",
      descricao: "Caniveted Variados",
      preco: "Consultar",
      imagem: "Image/product/canivetemetal.jpg",
      categorias: ["faca"],
      subcategorias: ["Metal","Metal2","Metal3", "Madeira","CaniveteFaca",
        "Canivetecabodecorado","Canivetecabodeosso","Canivetecabodemadeira2","Cutelo"],
    },
    {
      codigo: "002",
      nome: "Rede bucho de boi",
      descricao: "Rede bucho de boi cores variadas",
      preco: "Consultar",
      imagem: "Image/product/redebuchodeboititle.jpg",
      categorias: ["rede"],
      subcategorias: ["Vermelho", "Azulmarrom", "Begepreto", "Azulbranco", "Branco","Cinza","Marrom","Vermelha","Vermelhabranco","Vinho","XadrezMarrom"],
    },
    {
      codigo: "003",
      nome: "Kit talheres de cozinha de plastico",
      descricao: "Kit talheres de cozinha de Plastico sortidos.",
      preco: "Consultar",
      imagem: "Image/product/kit talher de plasticocozinha.jpg",
      categorias: ["cozinha"],
      subcategorias: ["Sortido","Sortido2"],
    },
    {
      codigo: "004",
      nome: "Kit 10 vasilhas",
      descricao: "Kit com 10 vasilhas em cores variadas",
      preco: "Consultar",
      imagem: "Image/product/kit10vasilhas.jpg",
      categorias: ["plastico"],
      subcategorias: ["Sortidos", "Roxo", "Vermelho", "Preto"],
    },
    {
      codigo: "005",
      nome: "Kit cozinha com 10 vasilhas",
      descricao: "Kit cozinha com 10 vasilhas",
      preco: "Consultar",
      imagem: "Image/product/kit10.jpg",
      categorias: ["plastico"],
      subcategorias: ["Sortidos", "Sortidos2"],
    },
    {
      codigo: "006",
      nome: "Kit cozinha",
      descricao: "Kit cozinha 5 peças",
      preco: "Consultar",
      imagem: "Image/product/kitcozinha5vazilhas.jpg",
      categorias: ["plastico"],
      subcategorias: ["Kit1", "Kit2", "Kit3", "Kit4", "Kit5"],
    },
    {
      codigo: "007",
      nome: "Kit vasilhas uso geral",
      descricao: "Kit vasilha uso geral",
      preco: "Consultar",
      imagem: "Image/product/kitvazilhacom3und.jpg",
      categorias: ["plastico"],
      subcategorias: ["Kitcom3", "Kitcom2",],
    },
    {
      codigo: "008",
      nome: "Redes Sortidas varias cores",
      descricao: "Redes de cores variadas",
      preco: "Consultar",
      imagem: "Image/product/variasredes.jpg",
      categorias: ["rede"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "009",
      nome: "Capa para Celular de couro",
      descricao: "Capa para celular de couro com e sem a bainha de canivete",
      preco: "Consultar",
      imagem: "Image/product/capadecelularcomcanivete.jpg",
      categorias: ["eletronicos"],
      subcategorias: ["Simples", "Bainha", "Bainha2","Bainha3"],
    },
    {
      codigo: "010",
      nome: "Tapete sala",
      descricao: "Tapete de sala 2,00X2,40mt",
      preco: "Consultar",
      imagem: "Image/product/tapetesala.jpg",
      categorias: ["item"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "011",
      nome: "Kit passadeira cozinha",
      descricao: "Conjunto de passadeira de cozinha",
      preco: "Consultar",
      imagem: "Image/product/passadeiradecozinha.jpg",
      categorias: ["cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "012",
      nome: "Kit Capa de sofá",
      descricao: "Kit capa de sofá com 2  e 3 lugares",
      preco: "Consultar",
      imagem: "Image/product/capasofaazul.jpg",
      categorias: ["item"],
      subcategorias: ["Bege", "Azul"],
    },
    {
      codigo: "013",
      nome: "Cadeirinha suspensa infantil",
      descricao: "Cadeirinha suspensa infantil diversas cores",
      preco: "Consultar",
      imagem: "Image/product/cadeirinhainfantil1.jpg",
      categorias: ["item"],
      subcategorias: ["Mod1", "Mod2", "Mod3", "Mod4"],
    },
    {
      codigo: "014",
      nome: "Fone de ouvido com fio",
      descricao: "Fone de ouvido com fio",
      preco: "Consultar",
      imagem: "Image/product/fonesdeouvidosortidos.jpg",
      categorias: ["eletronicos"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "015",
      nome: "Fone de ouvido sem fio",
      descricao: "Fone de ouvido sem fio",
      preco: "Consultar",
      imagem: "Image/product/fonedeouvidosemfio.jpg",
      categorias: ["eletronicos"],
      subcategorias: ["Modelo1","Modelo2"],
    },
    {
      codigo: "016",
      nome: "Tapete Bem Vindo",
      descricao: "Tapete bem vindo",
      preco: "Consultar",
      imagem: "Image/product/bem vindo vermelho.jpeg",
      categorias: ["item"],
      subcategorias: ["Preto","Vermelho","Marrom"],
    },
    {
      codigo: "017",
      nome: "Tapete sala testurizado",
      descricao: "Tapete sala testurizado",
      preco: "Consultar",
      imagem: "Image/product/Tapete testurizado preto.jpeg",
      categorias: ["item"],
      subcategorias: ["Preto","Vermelho","Azul","vinho"],
    },
    {
      codigo: "018",
      nome: "Tapete estreito felpudo",
      descricao: "Tapete estreito felpudo",
      preco: "Consultar",
      imagem: "Image/product/tapete estreito preto.jpeg",
      categorias: ["item"],
      subcategorias: ["Preto","Pink"],
    },
    {
      codigo: "019",
      nome: "Cadeira suspensa adulto",
      descricao: "Cadeira suspensa adulto",
      preco: "Consultar",
      imagem: "Image/product/Cadeira suspensa 01.jpeg",
      categorias: ["item"],
      subcategorias: ["Mod1", "Mod2", "Mod3"],
    },
    {
      codigo: "020",
      nome: "kite de tapetes para banheiro",
      descricao: "tapetes para benheiro",
      preco: "Consultar",
      imagem: "Image/product/kit tapetes para banheiro rosa.jpeg",
      categorias: ["item"],
      subcategorias: ["Rosa", "Verde", "Vermelho","Vermelho2","Preto"],
    },
    {
      codigo: "021",
      nome: "Roupa de cama (casal)",
      descricao:"Roupa de cama",
      preco: "Consultar",
      imagem: "Image/product/casal estampas borboletas.jpeg",
      categorias: ["item"],
      subcategorias: ["Azul","AzulEscuro","EstampasDeBorboletas","MarromEstampaFloral","RosaComEstampa","Rosa","Verde",],
    },
    {
      codigo: "022",
      nome: "Triturador de Verduras",
      descricao: "Triturador de Veduras",
      preco: "Consultar",
      imagem: "Image/product/triturador.jpeg",
      categorias: ["cozinha"],
      subcategorias: ["Branco", "Verde"],
    },
    {
      codigo: "023",
      nome: "Pano de prato",
      descricao: "Panode prato estampado",
      preco: "Consultar",
      imagem: "Image/product/Panos de prato.jpeg",
      categorias: ["cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "024",
      nome: "Edredom",
      descricao: "Edredom",
      preco: "Consultar",
      imagem: "Image/product/Edredom Vermelho.jpeg",
      categorias: ["item"],
      subcategorias: ["Branco","Preto","Vermelho"],
    },
    {
      codigo: "025",
      nome: "Caixinha de Som",
      descricao: "Caixinhas de som variadas",
      preco: "Consultar",
      imagem: "Image/product/caixa de som jbl mini.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["JBLmini","Colorida","AProvaDágua","RádioClassico","colorida02"],
    },
    {
      codigo: "026",
      nome: "Tapetes Para Cosinha",
      descricao: "Tapetes para cosinha",
      preco: "Consultar",
      imagem: "Image/product/tapete para cosinha.jpeg",
      categorias: ["cozinha"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "027",
      nome: "Relógios",
      descricao: "Relógios variados",
      preco: "Consultar",
      imagem: "Image/product/Relógio analogico.jpeg",
      categorias: ["item"],
      subcategorias: ["AnalógicoAzul","DigitalAzul","DigitalCamuflado","DigitalPrateado","DgitalPreto"],
    },
    {
      codigo: "028",
      nome: "Meias",
      descricao: "Meias variads",
      preco: "Consultar",
      imagem: "Image/product/meias cores variadas cano longo.jpeg",
      categorias: ["item"],
      subcategorias: ["Branca","Preta","DiversasCanoLongo","DiversasCores"],
    },
    {
      codigo: "029",
      nome: "Cuecas",
      descricao: "Cuecas Variadas",
      preco: "Consultar",
      imagem: "Image/product/cueca ck.jpeg",
      categorias: ["item"],
      subcategorias: ["Lacoste","CalvinKlein"],
    },
    {
      codigo: "030",
      nome: "Maquina de barbear",
      descricao: "Maquina de barbear",
      preco: "Consultar",
      imagem: "Image/product/maquina de barbear.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["Maquinadenarbear"],
    },
    {
      codigo: "031",
      nome: "Lençol de Cama",
      descricao: "lençol para cama",
      preco: "Consultar",
      imagem: "Image/product/lençol sortido.jpeg",
      categorias: ["item"],
      subcategorias: ["Azul","Branco","Verde"],
    },
    {
      codigo: "032",
      nome: "Cinto",
      descricao: "Cintos variados",
      preco: "Consultar",
      imagem: "Image/product/cinto.jpeg",
      categorias: ["item"],
      subcategorias: ["Sortido01","Sortido02"],
    },
    {
      codigo: "033",
      nome: "Afiador de Faca",
      descricao: "Afiador de facas",
      imagem: "Image/product/afiador 02.jpeg",
      categorias: ["cozinha"],
      subcategorias: ["Afiadordefacas"],
    },
    {
      codigo: "034",
      nome: "Cadeiras de balanço e banqueta",
      descricao: "Cadeiras de balanço e banqueta",
      imagem: "Image/product/cadeira mod 1.jpeg",
      categorias: ["item"],
      subcategorias: ["Modelo01","Modelo02","Banqueta"],
    },
    {
      codigo: "035",
      nome: "Lanterna",
      descricao: "Lanterna de mão e de cabeçao",
      imagem: "Image/product/Lanterna de mão.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["Lanternademão","Lanternadecabeça"],
    },
    {
      codigo: "036",
      nome: "Aparador de pelos do nariz",
      descricao: "Aparador de pelos do nariz",
      preco: "Consultar",
      imagem: "Image/product/aparador de pelos do naris.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["Aparadordepelosdonariz"],
    },
    {
      codigo: "037",
      nome: "Cactos que cantam e dançam",
      descricao: "Cactos que cantam e dançam",
      preco: "Consultar",
      imagem: "Image/product/cactos que dançam.jpeg",
      categorias: ["brinquedo"],
      subcategorias: ["Sortido"],
    },
    {
      codigo: "038",
      nome: "Carregador Portatil",
      descricao: "Carregador portatil 5000mAh",
      preco: "Consultar",
      imagem: "Image/product/carregador portatil.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["Carregadorportatil"],
    },
    {
      codigo: "039",
      nome: "Suporte para celular",
      descricao: "Suporte universal para celular",
      preco: "Consultar",
      imagem: "Image/product/suport universal para celular.jpeg",
      categorias: ["eletronicos"],
      subcategorias: ["Suporteparacelular"],
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
