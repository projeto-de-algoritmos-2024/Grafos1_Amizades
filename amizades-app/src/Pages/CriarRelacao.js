import '../Styles/relacao.css';
import { useEffect, useState } from "react";

function CriarRelacao() {

  const [pessoas, setPessoas] = useState([]);
  const [primeiraPessoa, setPrimeiraPessoa] = useState("");
  const [segundaPessoa, setSegundaPessoa] = useState("");

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(primeiraPessoa, segundaPessoa);
  }
  
  return (
    <div className="relacao-container">
      <form className="relacao-form" onSubmit={handleSubmit}>
        <h2>Criar Relação</h2>
        <label>Pessoa 1:</label>
        <input list="pessoa1" onChange={(e) => setPrimeiraPessoa(e.target.value)}/>
          <datalist id="pessoa1">
            {pessoas?.map((pessoa) => (
              <option key={pessoa.nome} value={pessoa.nome}/>
            ))}
          </datalist>
        <label>Pessoa 2:</label>
        <input list="pessoa2" onChange={(e) => setSegundaPessoa(e.target.value)}/>
          <datalist id='pessoa2'>
            {pessoas?.map((pessoa) => (
              <option key={pessoa.nome} value={pessoa.nome}/>
            ))}
          </datalist>
        <label>Parentesco</label>
        <input list="parentesco"/>
          <datalist id="parentesco">
            <option value="Amigo"/>
            <option value="Pai"/>
            <option value="Mae"/>
            <option value="Irmã/Irmão"/>
            <option value="Filho/Filha"/>
            <option value="Avô/Avó"/>
            <option value="Primo/Prima"/>
            <option value="Tio/Tia"/>
            <option value="Marido"/>
            <option value="Esposa"/>
          </datalist>
        <button>Confirmar</button>
      </form>
    </div>
  );
}

export default CriarRelacao;