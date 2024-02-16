<div align="center">
  <h1>Sistema de Login com JWT</h1>
  <img src="./loginSystem.gif" alt="Ícone de login" >
</div>

> ## Descrição
   Este é um sistema de login com autenticação JWT (JSON Web Token) que permite aos usuários se cadastrarem, fazerem login, alterarem suas senhas e receberem emails com códigos de segurança para recuperação de senha. O backend é desenvolvido em Node.js, utilizando MongoDB como banco de dados para armazenar informações de usuários e tokens. O frontend é construído em Next.js e utiliza SCSS para estilização.

> ## Tecnologias

  - Backend: Node.js, Express.js, JWT, Nodemailer, MongoDB
  - Frontend: Next.js, React, SCSS

> ## Como usar

1. Faça o clone deste repositório: https://github.com/seu_usuario/loginSystem.git
2. Instale as dependências do backend e do frontend utilizando `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env` conforme o exemplo fornecido no arquivo `.env.example`.
4. Inicie o servidor backend com o comando `npm start` na pasta do backend.
5. Inicie o servidor frontend com o comando `npm run dev` na pasta do frontend.
6. Acesse o sistema pelo navegador utilizando o endereço fornecido durante a inicialização do servidor frontend.

> ## Funcionalidades Principais

- Autenticação de usuários utilizando JWT.
- Cadastro de novos usuários.
- Alteração de senha com envio de email com código de segurança para recuperação.
- Interface responsiva e amigável para fácil uso.

**Observação:** Certifique-se de configurar corretamente o acesso ao MongoDB e as credenciais do serviço de email no arquivo de variáveis de ambiente `.env`.

> ## Instruções para obtenção das credenciais de serviço de email
1. Crie uma conta em um serviço de email (ex: Gmail, Outlook).
2. Siga as instruções para permitir o acesso de aplicativos menos seguros à sua conta, se necessário.
3. Obtenha as credenciais (endereço de email e senha) e atualize o arquivo `.env` com essas informações.

> ## Instruções para obtenção do token JWT secreto
1. Crie uma chave secreta complexa para ser usada como segredo do token JWT.
2. Substitua a variável `JWT_SECRET` no arquivo `.env` pela sua chave secreta.

--------------------------
