function renderizarEventos(dados) {
    let section = document.getElementById("resultados-pesquisa-eventos");
    let resultados = "";

    for (let dado of dadosEventos) {
        resultados += `
        <div class="container-catalogo">
            <h2><a href="#" target="_blank">${dado.titulo}</a></h2>
            <p class="descricao-meta">${dado.data}</p>
            <p class="descricao-meta">${dado.pesqueiro}</p>
        </div>`;
    }
    
    section.innerHTML = resultados;
}

function pesquisarEventos() {

    let section = document.getElementById("resultados-pesquisa-eventos")
    console.log(section)
    
    let campoPesquisa = document.getElementById("campo-pesquisa").value
    
    campoPesquisa = campoPesquisa.toLowerCase()
    
    let resultados = ""
    let titulo = ""
    let data = ""
    let pesqueiro = ""

    
    for (let dado of dadosEventos) {
        titulo = dado.titulo.toLowerCase()
        data = dado.data.toLowerCase()
        pesqueiro = dado.pesqueiro.toLowerCase()

        if(nome.includes(campoPesquisa) || descricao.includes(campoPesquisa) || endereco.includes(campoPesquisa) || peixesDisponiveis.includes(campoPesquisa) || especificidades.includes(campoPesquisa)){
            resultados += `
            <div class="container-catalogo">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.data}</p>
                <p class="descricao-meta">${dado.pesqueiro}</p>
            </div>`
        }
    }
    
    if (!resultados){
        resultados = '<p class="nenhum-resultado">Nada foi encontrado.</p>'
    }
    
    section.innerHTML = resultados
}
window.onload = function() {
    renderizarEventos(dados);
}