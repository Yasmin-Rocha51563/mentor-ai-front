# Plataforma de Estudos Inteligente - MentorIA 

Uma aplicação Full-Stack desenvolvida em React e Node.js que utiliza a API do Google Gemini para criar trilhas de aprendizagem personalizadas baseadas em avaliações diagnósticas e oferece um chat inteligente com histórico persistido.

## Estrutura do Projeto

A arquitetura do Back-end foi desenvolvida seguindo o padrão **MVC (Model-View-Controller)** para melhor organização e separação de responsabilidades:

- `src/models/`: Definição das entidades do banco de dados (Usuário, Trilha, PlanoEstudo, HistoricoAvaliacao, HistoricoChat) e seus relacionamentos.
- `src/controllers/`: regras de negócio, validações e integração com a API do Gemini.
- `src/server.js`: Centralização e exposição das rotas HTTP da aplicação.


## Tecnologias Utilizadas

### Front-end
- React.js (com hooks e componentização)
- React Router Dom (Navegação estruturada)
- React Markdown (Renderização de respostas da IA)

### Back-end
- Node.js & Express
- Sequelize (ORM) & SQLite (Banco de dados relacional)
- SDK Google Gen AI (`@google/genai`)
- JWT (JsonWebToken) & Bcryptjs (Criptografia de senhas)


## Rotas da API

### Autenticação
- `POST /auth/registrar` - Cadastro de novos usuários
- `POST /auth/login` - Autenticação com retorno de Token JWT

### Avaliações e Trilhas
- `POST /trilhas/avaliacao` - Solicita ao Gemini a geração de perguntas diagnósticas
- `POST /trilhas/avaliacao/responder` - Envia as respostas, calcula a nota e gera a trilha automática
- `GET /trilhas` - Lista as trilhas do usuário

### Planos de Estudo
- `PUT /planos/:id` - Atualiza o status de progresso do plano de estudo (ex: PENDENTE para CONCLUIDO)

### MentorIA Chat
- `POST /chat/perguntar` - Envia uma pergunta ao chat inteligente e armazena a resposta
- `GET /chat/historico` - Retorna o histórico de conversas do usuário


## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- Uma chave de API do Google AI Studio (Gemini)

### Passo a Passo

1. **Configure o Back-end:**
   - Navegue até a pasta do back-end.
   - Crie um arquivo `.env` na raiz e adicione sua chave:
     ```env
     GEMINI_API_KEY=sua_chave_aqui
     PORT=3000
     JWT_SECRET=sua_chave_secreta_jwt
     ```
   - Instale as dependências e inicie o servidor:
     ```bash
     npm install
     node src/server.js
     ```

2. **Configure o Front-end:**
   - Navegue até a pasta do front-end.
   - Instale as dependências e inicie a aplicação:
     ```bash
     npm install
     npm run dev
     ```