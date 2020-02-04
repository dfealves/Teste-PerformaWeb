// map
// filter
// find
// reduce
// forEach

// curry: uma função que retorna uma nova função

const addOptionsIntoSelect = select => (value, label) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerHTML = label;

  select.appendChild(option);
};

window.onload = () => {
  const formData = new FormData();

  const auth = {
    user: "performaweb",
    token: "pTspjI1jYxQngonfgbSPa"
  };

  const url = "https://www.api.performaweb.com.br/teste/";

  const body = new FormData();

  body.append("user", auth.user);
  body.append("token", auth.token);
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.send(body);

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      const responseJSON = JSON.parse(request.response);

      const { estados } = responseJSON;

      console.log(estados);

      const selectEstados = document.querySelector("#estados");
      selectEstados.disabled = false;

      const selectCidades = document.querySelector("#cidades");
      const imagemCidades = document.querySelector("#imagemCidade");

      if (request.response && request.response.estados) {
        request.response.estados.map(estado => {
          console.log(estado);
        });
      }

      selectEstados.addEventListener("change", function(ev) {
        selectCidades.disabled = true;
        const { value: sigla } = ev.target;

        const { cidades, imagem } = estados.find(
          estado => estado.sigla === sigla
        );

        if (cidades) {
          const arraySelectCidades = Array.from(selectCidades.children);
          const labelSelectCidades = arraySelectCidades.filter(
            option => option.disabled
          );

          selectCidades.innerHTML = "";
          selectCidades.appendChild(labelSelectCidades[0]);

          cidades.forEach(cidade => {
            addOptionsIntoSelect(selectCidades)(cidade, cidade);
            imagemCidades.setAttribute("src", imagem);
          });
          selectCidades.disabled = false;
        }
      });

      estados.forEach(estado => {
        addOptionsIntoSelect(selectEstados)(estado.sigla, estado.nome);
      });
    }
  };
};

const botao = document.querySelector("#btn-comprar");
botao.addEventListener("click", adicionaCarrinho);
const countCarrinho = document.querySelector(".countCart");

function adicionaCarrinho() {
  const STORAGE_KEY = "CARRINHO";
  const carrinho = localStorage.getItem(STORAGE_KEY);

  if (carrinho) {
    localStorage.setItem(STORAGE_KEY, parseInt(carrinho) + 1);
    countCarrinho.style.display = "block";
    countCarrinho.innerHTML = parseInt(carrinho);
  } else {
    localStorage.setItem(STORAGE_KEY, 0);
  }
}
