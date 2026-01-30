fetch("dados/questoes.csv")
  .then(response => response.text())
  .then(texto => {
    const linhas = texto.split("\n");
    const cabecalho = linhas.shift().split(",");

    const questoes = linhas.map(linha => {
      const valores = linha.split(",");
      return {
        ano: Number(valores[0]),
        numero: Number(valores[1]),
        conteudos: valores[2].replace(/"/g, "").split(";"),
        alternativa: valores[3],
        imagem: valores[4]
      };
    });

    window.questoes = questoes;
    carregarAnos();
    exibirQuestoes(questoes);
  });
