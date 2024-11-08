import '../Styles/conexao.css';
import { useEffect, useState } from "react";

function MostrarConexao() {

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
    <div className="conexao-container">
      <form className="conexao-form" onSubmit={handleSubmit}>
        <h2>Mostrar Conexão</h2>
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
        <button>Confirmar</button>
      </form>
    </div>
  );
}

export default MostrarConexao;
