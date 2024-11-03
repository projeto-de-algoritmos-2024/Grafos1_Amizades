import '../Styles/relacao.css';
import { useState } from "react";

function CriarRelacao() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>Escolha</div>
      <div className={`dropdown-content ${isActive ? "active" : ""}`}>
        <div className="dropdown-item">Felipe</div>
        <div className="dropdown-item">João</div>
      </div>
    </div>
  );
}

export default CriarRelacao;