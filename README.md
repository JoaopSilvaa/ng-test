# Boas vindas ao NG.CASH Aplication!

# O que é o NG.CASH Aplication?

É uma plataforma financeira com o propósito de auxiliar na sua relação com o seu dinheiro.

## Técnologias usadas

Back-end:
> Desenvolvido usando: TypeScript, API, Sequelize, PostgreSQL, Node.Js

Front-end:
> Desenvolvido usando: TypeScript, React, CSS3


Para executar o projeto corretamente, atente-se a cada passo descrito a seguir.

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Contém um container docker PostgreSQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;

3️⃣ **Front-end:**
  - Deve rodar na porta `3001`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints contruídos.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;
  - Cada serviço tem sua `Dockerfile` corretamente configurada em suas raízes (`front-end` e `back-end`), tornando possível a inicializar a aplicação;

</details>

</details>

<details id='Criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs).

</details>

<details id='sequelize'>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

  ⚠️ O `package.json` do diretório `app/backend` contém um script `db:reset` que é responsável por "dropar" o banco, recriar e executar as _migrations_ . Você pode executá-lo com o commando `npm run db:reset` se por algum motivo precisar recriar a base de dados;


  ⚠️ Quaisquer execução referente ao sequelize-cli deve ser realizada dentro do diretório `app/backend`. Certifique-se de que antes de rodar comandos do sequelize já exista uma versão compilada do back-end (diretório `app/build`), caso contrário basta executar `npm run build` para compilar. O sequelize só funcionará corretamente se o projeto estiver compilado.

  ⚠️ **O sequelize já foi inicializado, portanto NÃO é necessário executar o `sequelize init` novamente**

</details>

<details>
  <summary><strong> 👀 Comandos úteis </strong></summary><br />

  - Assim que você baixar o projeto rode o comando `npm install` na pasta raiz do projeto para **instalar as dependências gerais do projeto**;
  - Após a instalação, você pode executar `npm run compose:up` para subir os containers da aplicação e abrir o endereço `localhost:3000` no seu navegador para utilizar das suas funcionalidades.
  - Você pode **subir ou descer uma aplicação do compose**, utilizando `npm run` com os scripts `compose:up`, `compose:down`;
  - Os comando de _compose_ anteriores estão configurados para executar o _docker-compose_ com o terminal desanexado (detached mode `-d`). Caso queira acompanhar os logs de um serviço em tempo real pelo terminal, basta executar `npm run logs [nome_do_servico]` onde _nome_do_servico_ é opcional e pode receber os serviços _backend_, _frontend_ ou _db_
</details>

<details>
  <summary><strong> 👨‍💻 Informações Importantes </strong></summary><br />

  - Para conseguir criar um usuário você precisa:
    * Colocar um username com pelo menos 3 caracteres;
    * Um password com pelo menos 8 caracteres, um número e uma letra maiúscula;
  - Para realizar Transações:
    * Você precisa ter saldo suficiente na sua conta;
    * Colocar um username válido para transferir;
    * Não transferir para seu próprio username
</details>

Projeto Desenvolvido por [João Antônio](https://github.com/JoaopSilvaa)
