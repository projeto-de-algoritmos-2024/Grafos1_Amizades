import '../Styles/navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul className="navbar-container">
      <Link to="/"><li>Cadastrar Pessoa</li></Link>
      <Link to="/criar-relacao"><li>Criar Relação</li></Link>
      <Link to="/grau-parentesco"><li>Grau Parentesco</li></Link>
      <Link to="/mostrar-conexao"><li>Mostrar Conexão</li></Link>
      <Link to="/mostrar-familia"><li>Mostrar Família</li></Link>
    </ul>
  );
}

export default Navbar;
