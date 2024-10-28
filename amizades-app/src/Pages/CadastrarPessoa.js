import { useState } from "react";
import '../Styles/pessoa.css';

function CadastrarPessoa() {

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [ocupacao, setOcupacao] = useState("");

  return (
    <div className="pessoa-container">
      <form className="pessoa-form">
        <h2>Cadastrar pessoa</h2>
        <label>
          Nome:
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </label>
        <label>
          Idade:
          <input
            type="text"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </label>
        <label>
          Ocupação:
          <input 
            type="text"
            value={ocupacao}
            onChange={(e) => setOcupacao(e.target.value)}
          />
        </label>
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarPessoa;
