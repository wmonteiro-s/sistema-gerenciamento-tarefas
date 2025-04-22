# 📝 Gerenciador de Tarefas (CLI)

Um sistema de gerenciamento de tarefas via terminal, desenvolvido em Node.js. Permite criar, visualizar e concluir tarefas de forma simples e eficiente.

## 🚀 Funcionalidades

- Criar novas tarefas com título e descrição.
- Listar todas as tarefas.
- Visualizar tarefas concluídas ou pendentes.
- Marcar tarefas como concluídas.
- Persistência de dados em arquivo JSON.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) versão 14 ou superior

## ⚙️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/gerenciador-tarefas-cli.git
   cd gerenciador-tarefas-cli
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## 🧑‍💻 Uso

Execute o programa com o seguinte comando:

```bash
node main.js
```

Siga as instruções no terminal para interagir com o gerenciador de tarefas.

## 📁 Estrutura do Projeto

```
├── auxiliary_functions.js    // Funções auxiliares para manipulação de tarefas
├── main.js                   // Ponto de entrada da aplicação
├── tasks.json                // Armazenamento das tarefas
├── package.json              // Informações e dependências do projeto
├── package-lock.json         // Versão exata das dependências instaladas
├── .gitignore                // Arquivos e pastas ignorados pelo Git
├── LICENSE                   // Licença do projeto (MIT)
└── README.md                 // Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- Node.js
- prompt-sync
- fs/promises

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).