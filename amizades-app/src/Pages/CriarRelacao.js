import '../Styles/relacao.css';
import { useEffect, useState } from "react";

const relacoesLookUp = {
  "Amigo": "Amigo",
  "Pai/Mãe": "Filho/Filha",
  "Irmã/Irmão": "Irmã/Irmão",
  "Filho/Filha": "Pai/Mãe",
  "Avô/Avó": "Neta/Neto",
  "Primo/Prima": "Primo/Prima",
  "Tio/Tia": "Sobrinho/Sobrinha",
  "Marido/Esposa": "Marido/Esposa"
}

function CriarRelacao() {

  const [pessoas, setPessoas] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [primeiraPessoa, setPrimeiraPessoa] = useState("");
  const [segundaPessoa, setSegundaPessoa] = useState("");
  const [parentesco, setParentesco] = useState("");

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
    if (primeiraPessoa === segundaPessoa) {
      setErrMsg("Não é possível criar relação com a mesma pessoa")
      return;
    }

    // primeira e segunda pessoa estão no formato "1 - nome"
    const idPrimeira = primeiraPessoa.split(" - ")[0];
    const idSegunda = segundaPessoa.split(" - ")[0];

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

    console.log(pessoas[idPrimeira]);
    console.log(primeiraPessoa, segundaPessoa, parentesco);
  }
  
  return (
    <div className="relacao-container">
      <form className="relacao-form" onSubmit={handleSubmit}>
        <h2>Criar Relação</h2>
        <p className="relacao-erro">{errMsg}</p>
        <label>Pessoa 1:</label>
        <input 
          list="pessoa1"
          onChange={(e) => setPrimeiraPessoa(e.target.value)}
          required
        />
          <datalist id="pessoa1">
            {pessoas?.map((pessoa) => (
              <option key={pessoa.id} value={`${pessoa.id} - ${pessoa.nome}`}/>
            ))}
          </datalist>
        <label>Pessoa 2:</label>
        <input
          list="pessoa2"
          onChange={(e) => setSegundaPessoa(e.target.value)}
          required
        />
          <datalist id='pessoa2'>
            {pessoas?.map((pessoa) => (
              <option key={pessoa.id} value={`${pessoa.id} - ${pessoa.nome}`}/>
            ))}
          </datalist>
        <label>Parentesco</label>
        <input 
          list="parentesco"
          onChange={(e) => setParentesco(e.target.value)}
          required
        />
          <datalist id="parentesco">
            <option value="Amigo"/>
            <option value="Pai/Mãe"/>
            <option value="Irmã/Irmão"/>
            <option value="Filho/Filha"/>
            <option value="Avô/Avó"/>
            <option value="Neta/Neto"/>
            <option value="Primo/Prima"/>
            <option value="Tio/Tia"/>
            <option value="Marido/Esposa"/>
          </datalist>
        <button>Confirmar</button>
      </form>
    </div>
  );
}

export default CriarRelacao;