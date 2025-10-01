let listaPesqueiros = []; // vai guardar todos os pesqueiros carregados

// Função para buscar pesqueiros do backend
async function carregarPesqueiros() {
  try {
    const resposta = await fetch("http://localhost:3000/pesqueiros");
    if (!resposta.ok) throw new Error("Erro na requisição");

    listaPesqueiros = await resposta.json();
    renderizarPesqueiros(listaPesqueiros);

  } catch (erro) {
    console.error("Erro ao carregar pesqueiros:", erro);
    document.getElementById("catalogo").innerHTML =
      "<p style='color:red'>Não foi possível carregar os pesqueiros.</p>";
  }
}

// Função para renderizar a lista no HTML
function renderizarPesqueiros(pesqueiros) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = ""; // limpa antes de renderizar

  if (pesqueiros.length === 0) {
    catalogo.innerHTML = "<p style='color:gray'>Nenhum pesqueiro encontrado.</p>";
    return;
  }

  pesqueiros.forEach(p => {
    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
      <img class="img-pesq" src="./pesqueiro.jpeg" alt="Imagem do Pesqueiro">
      <hr>
      <h2>${p.nome}</h2>
      <ul>
        <li class="endereco">${p.endereco}</li>
        <li class="valor">Telefone: ${p.telefone}</li>
      </ul>
    `;

    catalogo.appendChild(box);
  });
}

// Função para filtrar pesqueiros
function filtrarPesqueiros(termo) {
  const filtrados = listaPesqueiros.filter(p =>
    p.nome.toLowerCase().includes(termo.toLowerCase())
  );
  renderizarPesqueiros(filtrados);
}

// Evento de pesquisa em tempo real
document.getElementById("pesquisa").addEventListener("input", e => {
  filtrarPesqueiros(e.target.value);
});

// Carregar assim que a página abrir
window.addEventListener("DOMContentLoaded", carregarPesqueiros);
