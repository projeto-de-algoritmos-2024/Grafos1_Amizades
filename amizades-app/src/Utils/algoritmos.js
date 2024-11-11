// objeto de lookup para as direções de relação
export const relacoesLookUp = {
  "Amigo/Amiga": "Amigo/Amiga",
  "Pai/Mãe": "Filho/Filha",
  "Irmã/Irmão": "Irmã/Irmão",
  "Filho/Filha": "Pai/Mãe",
  "Avô/Avó": "Neta/Neto",
  "Primo/Prima": "Primo/Prima",
  "Tio/Tia": "Sobrinho/Sobrinha",
  "Marido/Esposa": "Marido/Esposa"
}

const relacoesFamilia = [
  "Pai/Mãe",
  "Irmã/Irmão",
  "Filho/Filha",
  "Avô/Avó",
  "Primo/Prima",
  "Tio/Tia",
  "Marido/Esposa"
]

// retorna um grafo de conexão entre duas pessoas usando (depth first search).
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
  console.log(arvore);

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

  console.log(grafo);
  return grafo;
}

// retorna um grafo com todas as pessoas até um certo grau de relação da inicial (breadth first search)
export const mostrarGrauRelacao = (pessoas, idInicial, grau) => {
  let fila = []
  let visitados = new Set();
  let grafo = {
    nodes: [],
    edges: []
  }

  fila.unshift(idInicial);
  visitados.add(idInicial);

  let camada = 0;
  while (fila.length && camada <= grau) {
    const tamanhoCamada = fila.length;
    for (let i = 0; i < tamanhoCamada; i++) {
      const idAtual = fila.shift();
      grafo.nodes.push({ id: idAtual, label: pessoas[idAtual].nome });
      pessoas[idAtual].relacoes.forEach(relacao => {
        if (!visitados.has(relacao.id)) {
          fila.unshift(relacao.id);
          visitados.add(relacao.id);
        }
        if (!grafo.edges.find(conexao =>
            (conexao.from === idAtual && conexao.to === relacao.id) ||
            (conexao.from === relacao.id && conexao.to === idAtual))) {
          grafo.edges.push({ from: idAtual, to: relacao.id, label: relacao.parentesco });
        }
      })
    }
    camada++;
  }
  return grafo;
}

// retorna um grafo com todos os membros da família de um membro (flood fill)
export const mostrarFamilia = (pessoas, idPessoa) => {
  const fila = [];
  const visitados = new Set();
  const grafo = {
    nodes: [],
    edges: []
  }

  fila.unshift(idPessoa);
  visitados.add(idPessoa);

  while (fila.length) {
    let idAtual = fila.pop();
    let pessoaAtual = pessoas[idAtual];
    grafo.nodes.push({ id: idAtual, label: pessoas[idAtual].nome });
    pessoaAtual.relacoes.forEach(relacao => {
      if (!relacoesFamilia.includes(relacao.parentesco)) {
        return;
      }
      if (!visitados.has(relacao.id)) {
        fila.unshift(relacao.id);
        visitados.add(relacao.id)
      }
      if (!grafo.edges.find(conexao =>
        (conexao.from === idAtual && conexao.to === relacao.id) ||
        (conexao.from === relacao.id && conexao.to === idAtual))) {
        grafo.edges.push({ from: idAtual, to: relacao.id, label: relacao.parentesco });
      }
    })
  }

  return grafo;
}
