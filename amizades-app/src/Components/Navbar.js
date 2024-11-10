  import '../Styles/navbar.css'
  import { Link } from 'react-router-dom';

  function Navbar() {

    const clearLocalStorage = () => {
      localStorage.clear();
    }

    return (
      <ul className="navbar-container">
        <Link to="/"><li>Cadastrar Pessoa</li></Link>
        <Link to="/criar-relacao"><li>Criar Relação</li></Link>
        <Link to="/grau-relacao"><li>Grau Relação</li></Link>
        <Link to="/mostrar-conexao"><li>Mostrar Conexão</li></Link>
        <Link to="/mostrar-familia"><li>Mostrar Família</li></Link>
        <li onClick={() => clearLocalStorage()}>Limpar</li>
      </ul>
    );
  }

  export default Navbar;
