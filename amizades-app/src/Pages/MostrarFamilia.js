import '../Styles/familia.css';
import { useEffect, useState } from "react";
import { mostrarFamilia } from '../Utils/algoritmos';
import Grafo from '../Components/Grafo';

function MostrarFamilia() {

  const [pessoas, setPessoas] = useState([]);
  const [idPessoa, setIdPessoa] = useState(0);
  const [grafo, setGrafo] = useState();

  useEffect(() => {
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoas")) || [];
    if (pessoasCadastradas) {
      setPessoas(pessoasCadastradas);      
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const grafo = mostrarFamilia(pessoas, idPessoa);
    setGrafo(grafo);
    console.log(grafo);
  }

  return (
    <div className="familia-container">
      <form className="familia-form" onSubmit={handleSubmit}>
        <h2>Mostrar Familia</h2>
        <label>Pessoa 1:</label>
        <select value={idPessoa} onChange={(e) => setIdPessoa(Number(e.target.value))}>
          {pessoas?.map((pessoa) => (
            <option key={pessoa.nome} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <button>Confirmar</button>
      </form>
      
      <div className="familia-grafo">
        {grafo && (
          <Grafo grafo={grafo}/>
        )}
      </div>
    </div>
  );
}

export default MostrarFamilia;