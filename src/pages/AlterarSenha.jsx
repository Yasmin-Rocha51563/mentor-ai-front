import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function AlterarSenha() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || 1;
  const token = localStorage.getItem("token");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const handleAtualizarSenha = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    if (novaSenha !== confirmarSenha) {
      return setMensagem({ tipo: "erro", texto: "A nova senha e a confirmação não coincidem." });
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ senha: novaSenha }) 
      });

      if (response.ok) {
        setMensagem({ tipo: "sucesso", texto: "Senha alterada com sucesso!" });
        setTimeout(() => navigate("/perfil"), 1500);
      } else {
        const dados = await response.json();
        setMensagem({ tipo: "erro", texto: dados.mensagem || "Erro ao atualizar senha." });
      }
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro na conexão com o servidor." });
    }
  };

  return (
    <div className="perfilPageLayout">
      <Sidebar />
      <main className="perfilMainContent">
        <Header />
        <div className="perfilCardContainer">
          <div className="perfilMainCard">
            
            <div className="perfilBackHeader" onClick={() => navigate("/perfil")}>
              <ChevronLeft size={22} />
              <h2>Alterar Senha de Acesso</h2>
            </div>
            
            <hr className="perfilDivider" />

            <form onSubmit={handleAtualizarSenha} className="perfilSubCardForm" style={{ maxWidth: "100%" }}>
              {mensagem.texto && (
                <div className={`perfilAlert ${mensagem.tipo}`}>{mensagem.texto}</div>
              )}

              <div className="perfilInputGroup">
                <label>Senha Atual</label>
                <input 
                  type="password" 
                  value={senhaAtual} 
                  onChange={(e) => setSenhaAtual(e.target.value)} 
                  required
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px" }}
                />
              </div>

              <div className="perfilInputGroup">
                <label>Nova Senha</label>
                <input 
                  type="password" 
                  value={novaSenha} 
                  onChange={(e) => setNovaSenha(e.target.value)} 
                  required
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px" }}
                />
              </div>

              <div className="perfilInputGroup">
                <label>Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  value={confirmarSenha} 
                  onChange={(e) => setConfirmarSenha(e.target.value)} 
                  required
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px" }}
                />
              </div>

              <div className="perfilFormActions" style={{ marginTop: "24px" }}>
                <button type="button" className="perfilBtnCancel" onClick={() => navigate("/perfil")}>
                  Cancelar
                </button>
                <button type="submit" className="perfilBtnSave">
                  Atualizar Senha
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}