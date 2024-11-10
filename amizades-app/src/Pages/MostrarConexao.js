import '../Styles/conexao.css';
import { useEffect, useState } from "react";
import { mostrarConexao, relacoesLookUp } from '../Utils/grafos';

function MostrarConexao() {

  const [pessoas, setPessoas] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [idInicial, setIdInicial] = useState(0);
  const [idDestino, setIdDestino] = useState(0);
  const [caminho, setCaminho] = useState();

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    // não permitir mostrar relacionamento com a mesma pessoa
    if (idInicial === idDestino) {
      setErrMsg("Não é possível mostrar relação com a mesma pessoa")
      return;
    }

    const caminhoGerado = mostrarConexao(pessoas, idInicial, idDestino);
    setCaminho(caminhoGerado);
    console.log(caminho);
  }

  return (
    <div className="conexao-container">
      <form className="conexao-form" onSubmit={handleSubmit}>
        <h2>Mostrar Conexão</h2>
        <p className='erro'>{errMsg}</p>
        <label>Pessoa Inicial:</label>
        <select onChange={(e) => setIdInicial(Number(e.target.value))}>
          {pessoas?.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <label>Pessoa Destino:</label>  
        <select list="pessoa2" onChange={(e) => setIdDestino(Number(e.target.value))}>
          {pessoas?.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <button>Confirmar</button>
      </form>

      <div className="conexao-caminho">
        {caminho?.map((conexao, index) => (
          <div key={index} className="conexao-item">
            {conexao.relacao && (
              <div className="conexao-relacao">
                <p>|</p>
                <p>({relacoesLookUp[conexao.relacao.parentesco]})</p>
                <p>v</p>
              </div>
            )}
            <p className="conexao-pessoa">{conexao.pessoa.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostrarConexao;
