let questoes = [];

fetch("dados/questoes.json")
    .then(response => response.json())
    .then(data => {
        questoes = data;
        carregarAnos();
        exibirQuestoes(questoes);
    });

function carregarAnos() {
    const anos = [...new Set(questoes.map(q => q.ano))].sort();
    const selectAno = document.getElementById("filtroAno");

    anos.forEach(ano => {
        const option = document.createElement("option");
        option.value = ano;
        option.textContent = ano;
        selectAno.appendChild(option);
    });
}

function aplicarFiltros() {
    const ano = document.getElementById("filtroAno").value;
    const conteudo = document.getElementById("filtroConteudo").value.toLowerCase();
    const alternativa = document.getElementById("filtroAlternativa").value;

    let filtradas = questoes;

    if (ano) {
        filtradas = filtradas.filter(q => q.ano == ano);
    }

    if (conteudo) {
        filtradas = filtradas.filter(q =>
            q.conteudos.some(c => c.toLowerCase().includes(conteudo))
        );
    }

    if (alternativa) {
        filtradas = filtradas.filter(q => q.alternativa === alternativa);
    }

    exibirQuestoes(filtradas);
}

function exibirQuestoes(lista) {
    const div = document.getElementById("resultado");
    div.innerHTML = "";

    lista.forEach(q => {
        const bloco = document.createElement("div");
        bloco.className = "questao";

        const info = document.createElement("p");
        info.innerHTML = `<strong>${q.ano} – Questão ${q.numero}</strong><br>
                          Conteúdos: ${q.conteudos.join(", ")}<br>
                          Alternativa correta: ${q.alternativa}`;

        const img = document.createElement("img");
        img.src = "imagens/" + q.imagem;

        bloco.appendChild(info);
        bloco.appendChild(img);
        div.appendChild(bloco);
    });
}
