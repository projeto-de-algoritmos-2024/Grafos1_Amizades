import { useState } from "react";
import '../Styles/pessoa.css';

function CadastrarPessoa() {

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [ocupacao, setOcupacao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Objeto com os dados da pessoa
    const pessoa = {
      nome,
      idade,
      ocupacao,
    };

    // Recupera os dados existentes no localStorage ou cria um array vazio
    const pessoasSalvas = JSON.parse(localStorage.getItem("pessoas")) || [];

    // Adiciona a nova pessoa ao array
    pessoasSalvas.push(pessoa);

    // Salva o array atualizado no localStorage
    localStorage.setItem("pessoas", JSON.stringify(pessoasSalvas));

    // Limpa os campos do formulário
    setNome("");
    setIdade("");
    setOcupacao("");
  };

  return (
    <div className="pessoa-container">
      <form className="pessoa-form" onSubmit={handleSubmit}>
        <h2>Cadastrar pessoa</h2>
        <label id="nome">
          Nome:
        </label>
        <input 
          type="text"
          id="nome"
          required
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <label id="idade">
          Idade:
        </label>
        <input
          type="number"
          id="idade"
          required
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <label id="ocupacao">
          Ocupação:
        </label>
        <input 
          type="text"
          id="ocupacao"
          required
          value={ocupacao}
          onChange={(e) => setOcupacao(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarPessoa;
