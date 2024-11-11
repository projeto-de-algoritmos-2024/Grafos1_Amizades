import '../Styles/relacao.css';
import { useEffect, useState } from "react";
import { relacoesLookUp } from '../Utils/algoritmos';

function CriarRelacao() {

  const [pessoas, setPessoas] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [idPrimeira, setIdPrimeira] = useState(0);
  const [idSegunda, setIdSegunda] = useState(0);
  const [parentesco, setParentesco] = useState("Amigo/Amiga");

  const parentescos = [
    "Amigo/Amiga",
    "Pai/Mãe",
    "Irmã/Irmão",
    "Filho/Filha",
    "Avô/Avó",
    "Neta/Neto",
    "Primo/Prima",
    "Tio/Tia",
    "Marido/Esposa",
  ]

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    // não permitir relacionamento com a mesma pessoa
    if (idPrimeira === idSegunda) {
      setErrMsg("Não é possível criar relação com a mesma pessoa")
      return;
    }

    // cria os objetos das relações
    const relacaoPessoa1 = {
      id: idSegunda,
      parentesco: parentesco
    }
    const relacaoPessoa2 = {
      id: idPrimeira,
      parentesco: relacoesLookUp[parentesco]
    }

    // não permitir duas relações das mesmas pessoas.
    if (pessoas[idPrimeira].relacoes.find(relacao => relacao.id === idSegunda) 
        || pessoas[idSegunda].relacoes.find(relacao => relacao.id === idPrimeira)) {
      setErrMsg("As duas pessoas já estão relacionadas");
      return;
    }

    // salvar relações 
    pessoas[idPrimeira].relacoes.push(relacaoPessoa1);
    pessoas[idSegunda].relacoes.push(relacaoPessoa2);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    // limpa seleções
    setIdPrimeira(0);
    setIdSegunda(0);
    setParentesco("Amigo/Amiga");
  }
  
  return (
    <div className="relacao-container">
      <form className="relacao-form" onSubmit={handleSubmit}>
        <h2>Criar Relação</h2>
        <p className="erro">{errMsg}</p>
        <label>Pessoa 1:</label>
        <select 
          onChange={(e) => setIdPrimeira(Number(e.target.value))}
          value={idPrimeira}
          required
        >
          {pessoas?.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <label>Pessoa 2:</label>
        <select
          onChange={(e) => setIdSegunda(Number(e.target.value))}
          value={idSegunda}
          required
        >
          {pessoas?.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <label>Parentesco</label>
        <select 
          onChange={(e) => setParentesco(e.target.value)}
          value={parentesco}
          required
        >
          {parentescos.map((opcao) => (
            <option value={opcao}>{opcao}</option>
          ))}
        </select>
        <button>Confirmar</button>
      </form>
    </div>
  );
}

export default CriarRelacao;