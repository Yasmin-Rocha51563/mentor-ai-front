import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { ChevronLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("userId") || 1;
  const token = localStorage.getItem("token");

  const [fotoUrl, setFotoUrl] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosUsuario() {
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
        console.error("Erro ao carregar dados do perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDadosUsuario();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="perfilPageLayout">
        <Sidebar />
        <main className="perfilMainContent">
          <Header />
          <div className="perfilCardContainer">Carregando dados...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="perfilPageLayout">
      <Sidebar />
      
      <main className="perfilMainContent">
        <Header />
        
        <div className="perfilCardContainer">
          <div className="perfilMainCard">
            
            <div className="perfilBackHeader" onClick={() => navigate("/home")}>
              <ChevronLeft size={22} />
              <h2>Meu Perfil</h2>
            </div>
            
            <hr className="perfilDivider" />
            <div className="perfilAvatarRow">
              <div className="perfilAvatarWrapper">
               <img 
                src={fotoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"} 
                alt="Foto do usuário" 
                className="perfilUserAvatar"
                />
                <button 
                  type="button" 
                  className="perfilEditAvatarBadge" 
                  onClick={() => navigate("/editar-perfil")}
                >
                  <Pencil size={12} color="#fff" />
                </button>
              </div>
              <div className="perfilAvatarInfo">
                <h3>{nome || "Nome do Usuário"}</h3>
                <p>{email || "usuario@email.com"}</p>
              </div>
            </div>
            <div className="perfilSubCardForm" style={{ maxWidth: "100%" }}>
              <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: 0 }}>Visualizar Cadastro</h3>
              </div>
              
              <div className="perfilInputGroup">
                <label>Nome</label>
                <span style={{ fontSize: "14px", color: "#2d3748" }}>{nome}</span>
              </div>

              <div className="perfilInputGroup">
                <label>E-mail</label>
                <span style={{ fontSize: "14px", color: "#2d3748" }}>{email}</span>
              </div>

              <div className="perfilInputGroup perfilSenhaRow">
                <label>Senha</label>
                <span 
                  onClick={() => navigate("/alterar-senha")} 
                  className="perfilLinkAlterarSenha"
                >
                  Alterar Senha
                </span>
              </div>
              <div className="perfilFormActions" style={{ marginTop: "20px" }}>
                <button 
                  type="button" 
                  className="perfilBtnSave" 
                  onClick={() => navigate("/editar-perfil")}
                >
                  Editar Informações
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}