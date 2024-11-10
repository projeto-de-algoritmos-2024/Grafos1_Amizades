// objeto de lookup para as direções de relação
export const relacoesLookUp = {
  "Amigo": "Amigo",
  "Pai/Mãe": "Filho/Filha",
  "Irmã/Irmão": "Irmã/Irmão",
  "Filho/Filha": "Pai/Mãe",
  "Avô/Avó": "Neta/Neto",
  "Primo/Prima": "Primo/Prima",
  "Tio/Tia": "Sobrinho/Sobrinha",
  "Marido/Esposa": "Marido/Esposa"
}

// retorna um caminho de conexão entre duas pessoas usando (depth first search).
export const mostrarConexao = (pessoas, idInicial, idDestino) => {
  const pilha = [pessoas[idInicial]];
  const visitados = new Set();
  // arvore implementada como vetor pai.
  const arvore = {};
  arvore[idInicial] = null;

  while (pilha.length) {
    const pessoaAtual = pilha.pop();
    visitados.add(pessoaAtual.id);
    if (pessoaAtual.id === idDestino) {
      return gerarCaminho(pessoas, arvore, idInicial, idDestino);
    } 
    pessoaAtual.relacoes.forEach(relacao => {
      if (!visitados.has(relacao.id)) {
        pilha.push(pessoas[relacao.id]);
        arvore[relacao.id] = pessoaAtual.id;
      }
    });
  }
  return null;
}

// recebe uma árvore e gera uma lista de caminho entre duas pessoas
const gerarCaminho = (pessoas, arvore, idInicial, idDestino) => {
  console.log(arvore);
  let idAtual = idDestino;
  let idPai = arvore[idAtual];
  let relacao = pessoas[idAtual].relacoes.find((relacao => relacao.id === idPai)) 
  const caminho = [];
  caminho.unshift({
    pessoa: pessoas[idAtual],
    relacao: pessoas[idAtual].relacoes.find((relacao => relacao.id === idPai))
  });

  while (idAtual !== idInicial) {
    idAtual = idPai;
    idPai = arvore[idAtual];
    caminho.unshift({
      pessoa: pessoas[idAtual],
      relacao: pessoas[idAtual].relacoes.find((relacao => relacao.id === idPai))
    });
  }

  console.log(caminho);

  return caminho;
}
