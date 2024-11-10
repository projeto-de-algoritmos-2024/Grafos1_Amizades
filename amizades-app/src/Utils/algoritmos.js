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
      return gerarGrafoCaminho(pessoas, arvore, idInicial, idDestino);
    }
    pessoaAtual.relacoes.forEach(relacao => {
      if (!visitados.has(relacao.id)) {
        pilha.push(pessoas[relacao.id]);
        arvore[relacao.id] = {
          id: pessoaAtual.id, 
          parentesco: relacao.parentesco 
        };
      }
    });
  }
  return null;
}

// recebe uma árvore e gera um grafo de caminho entre duas pessoas
const gerarGrafoCaminho = (pessoas, arvore, idInicial, idDestino) => {
  let grafo = {
    nodes: [],
    edges: []
  }

  let idAtual = idDestino;
  let relacaoPai = arvore[idAtual];
  let pessoaAtual = pessoas[idAtual];

  // adiciona a primeira pessoa
  grafo.nodes.push({ id: idAtual, label: pessoaAtual.nome });
  grafo.edges.push({ from: relacaoPai.id, to: idAtual, label: relacaoPai.parentesco });

  while (idAtual !== idInicial) {
    idAtual = arvore[idAtual].id;
    relacaoPai = arvore[idAtual];
    pessoaAtual = pessoas[idAtual];
    grafo.nodes.push({ id: idAtual, label: pessoaAtual.nome });
    if (relacaoPai) {
      grafo.edges.push({ from: relacaoPai.id, to: idAtual, label: relacaoPai.parentesco });  
    }
  }

  return grafo;
}
