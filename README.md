# Plataforma de Estudos Inteligente - MentorIA 🚀

Uma aplicação Full-Stack desenvolvida em React e Node.js que utiliza a API do Google Gemini para criar trilhas de aprendizagem personalizadas baseadas em avaliações diagnósticas e oferece um chat inteligente com histórico persistido.

## 🛠️ Tecnologias Utilizadas

### Front-end
- React.js (com hooks e componentização)
- React Router Dom (Navegação estruturada)
- React Markdown (Renderização de respostas da IA)

### Back-end
- Node.js & Express
- Sequelize (ORM) & SQLite (Banco de dados relacional)
- SDK Google Gen AI (`@google/genai`)
- JWT (JsonWebToken) & Bcryptjs (Criptografia de senhas)

## 📦 Como Executar o Projeto

### 1. Configurar o Back-end
1. Navegue até a pasta do servidor: `cd backend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do backend e adicione sua chave da API:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   JWT_SECRET=sua_chave_secreta_jwt