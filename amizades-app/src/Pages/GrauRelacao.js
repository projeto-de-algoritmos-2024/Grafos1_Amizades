import '../Styles/grauparentesco.css';
import { useEffect, useState } from "react";
import { mostrarGrauRelacao } from '../Utils/algoritmos';
import Grafo from '../Components/Grafo';

function GrauRelacao() {

  const [pessoas, setPessoas] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [idPessoa, setIdPessoa] = useState(0);
  const [grau, setGrau] = useState();
  const [grafo, setGrafo] = useState();

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (grau <= 0) {
      setErrMsg("O grau precisa no mínimo 1");
      return;
    }

    const grafoGerado = mostrarGrauRelacao(pessoas, idPessoa, grau);
    setGrafo(grafoGerado);
  }

  return (
    <div className="graurelacao-container">
      <form className="graurelacao-form" onSubmit={handleSubmit}>
        <h2>Grau Parentesco</h2>
        <p className='erro'>{errMsg}</p>
        <label>Pessoa:</label>
        <select onChange={(e) => setIdPessoa(Number(e.target.value))}>
          {pessoas?.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <label id="grau">Grau parenteco:</label>
        <input
          type="number"
          id="grau"
          required
          value={grau}
          onChange={(e) => setGrau(Number(e.target.value))}
        />
        <button>Confirmar</button>
      </form>

      <div className="graurelacao-grafo">
        {grafo && (
          <Grafo grafo={grafo}/>
        )}
      </div>
    </div>
  );
}

export default GrauRelacao;