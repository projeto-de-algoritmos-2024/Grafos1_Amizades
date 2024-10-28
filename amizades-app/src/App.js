import { Route, Routes } from "react-router-dom";
import CadastrarPessoa from "./Pages/CadastrarPessoa";
import CriarRelacao from "./Pages/CriarRelacao";
import GrauParentesco from "./Pages/GrauParentesco";
import MostrarConexao from "./Pages/MostrarConexao";
import MostrarFamilia from "./Pages/MostrarFamilia";
import Navbar from "./Components/Navbar";
import './Styles/app.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CadastrarPessoa />} />
        <Route path="/criar-relacao" element={<CriarRelacao />} />
        <Route path="/mostrar-conexao" element={<MostrarConexao />} />
        <Route path="/mostrar-familia" element={<MostrarFamilia />} />
        <Route path="/grau-parentesco" element={<GrauParentesco />} />
      </Routes>
    </div>
  );
}

export default App;
