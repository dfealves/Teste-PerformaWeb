// map
// filter
// find
// reduce
// forEach

// curry: uma função que retorna uma nova função

const addOptions = select => (value, label) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerHTML = label;

  select.appendChild(option);
};

const valueFromEvent = event => event.target.value;

const disableTag = tag => (tag.disabled = true);

const enableTag = tag => (tag.disabled = false);

const firstChild = array => array[0];

const resetChildrenTag = tag => {
  tag.innerHTML = "";
  return tag;
};

const disabledChilds = array => array.filter(child => child.disabled);

const convertArrayLikeToArray = arrayLike => Array.from(arrayLike);

const appendTagChild = node => child => node.appendChild(child);

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

      const selectEstados = document.querySelector("#estados");
      const selectCidades = document.querySelector("#cidades");

      enableTag(selectEstados);

      selectEstados.addEventListener("change", function(ev) {
        disableTag(selectCidades);

        const { cidades } = estados.find(
          estado => estado.sigla === valueFromEvent(ev)
        );

        if (cidades) {
          resetChildrenTag(selectCidades).appendChild(
            disabledChilds(convertArrayLikeToArray(selectCidades.children))
          );

          cidades.forEach(cidade => {
            addOptions(selectCidades)(cidade, cidade);
          });

          enableTag(selectCidades);
        }
      });

      estados.forEach(estado => {
        addOptions(selectEstados)(estado.sigla, estado.nome);
      });
    }
  };
};
