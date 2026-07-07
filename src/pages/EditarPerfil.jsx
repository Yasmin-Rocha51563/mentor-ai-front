import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css"; 

export default function EditarPerfil() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || 1;
  const token = localStorage.getItem("token");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch(`http://localhost:3000/usuarios`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const usuarios = await response.json();
          const usuarioAtual = usuarios.find(u => Number(u.id) === Number(userId));
          if (usuarioAtual) {
            setNome(usuarioAtual.nome || "");
            setEmail(usuarioAtual.email || "");
            setFotoUrl(usuarioAtual.fotoUrl || "");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } {
        setLoading(false);
      }
    }
    carregarDados();
  }, [userId, token]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, fotoUrl })
      });

      if (response.ok) {
        setMensagem({ tipo: "sucesso", texto: "Informações atualizadas com sucesso!" });
        setTimeout(() => navigate("/perfil"), 1500); 
      } else {
        const dados = await response.json();
        setMensagem({ tipo: "erro", texto: dados.mensagem || "Erro ao atualizar." });
      }
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro na conexão com o servidor." });
    }
  };

  if (loading) return <div className="perfilPageLayout"><Sidebar /><main className="perfilMainContent"><Header /><div className="perfilCardContainer">Carregando...</div></main></div>;

  return (
    <div className="perfilPageLayout">
      <Sidebar />
      <main className="perfilMainContent">
        <Header />
        <div className="perfilCardContainer">
          <div className="perfilMainCard">
            
            <div className="perfilBackHeader" onClick={() => navigate("/perfil")}>
              <ChevronLeft size={22} />
              <h2>Editar Informações</h2>
            </div>
            
            <hr className="perfilDivider" />

            <form onSubmit={handleSalvar} className="perfilSubCardForm" style={{ maxWidth: "100%" }}>
              {mensagem.texto && (
                <div className={`perfilAlert ${mensagem.tipo}`}>{mensagem.texto}</div>
              )}

              <div className="perfilInputGroup">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px", textAlign: "left" }}
                />
              </div>

              <div className="perfilInputGroup">
                <label>E-mail Corporativo</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px", textAlign: "left" }}
                />
              </div>
            
              <div className="perfilInputGroup">
  <label>Link da Foto (URL)</label>
  <input 
    type="text" 
    value={fotoUrl} 
    onChange={(e) => setFotoUrl(e.target.value)} 
    placeholder="https://media.tenor.com/92MplgQwb80AAAAe/cat-meme-wave-emoji.png"
    style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px", textAlign: "left" }}
  />
</div>

              <div className="perfilFormActions" style={{ marginTop: "24px" }}>
                <button type="button" className="perfilBtnCancel" onClick={() => navigate("/perfil")}>
                  Cancelar
                </button>
                <button type="submit" className="perfilBtnSave">
                  Salvar Alterações
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}