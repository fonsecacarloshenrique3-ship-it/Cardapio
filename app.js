// Elementos da tela
const campo = document.getElementById("campo");
const botao = document.getElementById("botao");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const btnLimpar = document.getElementById("btn-limpar"); // Nível 4

// NÍVEL 3: Atualiza a frase do contador
function atualizarContador() {
  const total = lista.children.length;
  constfeitas = document.querySelectorAll("#lista li.concluida").length;

  if (total === 0) {
    contador.textContent = "0 concluídas";
  } else {
    contador.textContent = feitas + " de " + total + " concluídas";
  }
}

// Função para adicionar nova tarefa
function adicionarTarefa() {
  const texto = campo.value.trim();
  if (texto === "") return;

  const item = document.createElement("li");

  const textoEl = document.createElement("span");
  textoEl.textContent = texto;
  item.appendChild(textoEl);

  // NÍVEL 1: Clicar para concluir
  item.addEventListener("click", function () {
    item.classList.toggle("concluida");
    atualizarContador();
  });

  // NÍVEL 2: Botão de apagar (✕)
  const btnApagar = document.createElement("button");
  btnApagar.textContent = "✕";
  btnApagar.className = "btn-apagar";

  btnApagar.addEventListener("click", function (event) {
    event.stopPropagation();
    item.remove();
    atualizarContador();
  });

  item.appendChild(btnApagar);
  lista.appendChild(item);

  campo.value = "";
  atualizarContador();
}

// Clique no botão Adicionar
botao.addEventListener("click", adicionarTarefa);

// NÍVEL 4 (Extra 1): Pressionar "Enter" para adicionar
campo.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

// NÍVEL 4 (Extra 2): Botão "Limpar concluídas"
btnLimpar.addEventListener("click", function () {
  const concluidas = document.querySelectorAll("#lista li.concluida");
  concluidas.forEach(function (item) {
    item.remove();
  });
  atualizarContador();
});

// Inicializa contador
atualizarContador();