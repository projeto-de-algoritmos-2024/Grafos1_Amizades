import '../Styles/familia.css';
import { useEffect, useState } from "react";

function MostrarFamilia() {

  const [pessoas, setPessoas] = useState([]);
  const [primeiraPessoa, setPrimeiraPessoa] = useState("");

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(primeiraPessoa);
  }

  return (
    <div className="familia-container">
      <form className="familia-form" onSubmit={handleSubmit}>
        <h2>Mostrar Familia</h2>
        <label>Pessoa 1:</label>
        <input list="pessoa1" onChange={(e) => setPrimeiraPessoa(e.target.value)}/>
          <datalist id="pessoa1">
            {pessoas?.map((pessoa) => (
              <option key={pessoa.nome} value={pessoa.nome}/>
            ))}
          </datalist>
        <button>Confirmar</button>
      </form>
      
    </div>
  );
}

export default MostrarFamilia;