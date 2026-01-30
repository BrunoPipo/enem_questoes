fetch("dados/questoes.csv")
  .then(response => response.text())
  .then(texto => {
    const linhas = texto.trim().split("\n");
    linhas.shift(); // remove cabeçalho

    const container = document.getElementById("questoes");

    linhas.forEach(linha => {
      const colunas = linha.split(",");

      const ano = colunas[0];
      const numero = colunas[1];
      const conteudos = colunas[2].replace(/"/g, "").replace(/;/g, ", ");
      const alternativa = colunas[3];
      const imagem = colunas[4];

      const bloco = document.createElement("div");
      bloco.style.marginBottom = "40px";

      bloco.innerHTML = `
        <h3>${ano} — Questão ${numero}</h3>
        <p><strong>Conteúdos:</strong> ${conteudos}</p>
        <p><strong>Gabarito:</strong> ${alternativa}</p>
        <img src="imagens/${imagem}" style="max-width: 900px;">
        <hr>
      `;

      container.appendChild(bloco);
    });
  });
