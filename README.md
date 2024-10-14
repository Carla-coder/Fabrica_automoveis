
# Sistema de Pátio de Automóveis

Este projeto é um sistema pátio de automóveis de uma fábrica, onde os funcionários poderão clicar em uma área e visualizar os automóveis que estão atualmente alocados para ela. Também deve ser possível, através desse sistema, vender automóveis de uma área qualquer do pátio. O sistema utiliza **Prisma** como ORM e **MySQL** como banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construir aplicações web com Node.js.
- **Prisma**: ORM para facilitar a manipulação do banco de dados.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **CORS**: Middleware para habilitar o compartilhamento de recursos entre diferentes origens.
- **dotenv**: Para carregar variáveis de ambiente de um arquivo `.env`.

## Estrutura do Banco de Dados

O banco de dados é composto por cinco modelos principais:

### Modelos

1. **Automoveis**
   - `id`: Identificador único do automóvel (Int).
   - `modelo`: Nome do modelo do automóvel (String).
   - `preco`: Preço do automóvel (Float).
   - `alocacoes`: Relação com o modelo Alocacao.

2. **Clientes**
   - `id`: Identificador único do cliente (Int).
   - `nome`: Nome do cliente (String).
   - `vendas`: Relação com o modelo Vendas.

3. **Concessionaria**
   - `id`: Identificador único da concessionária (Int).
   - `nome`: Nome da concessionária (String).
   - `alocacoes`: Relação com o modelo Alocacao.
   - `venda`: Relação com o modelo Vendas.

4. **Alocacao**
   - `id`: Identificador único da alocação (Int).
   - `area`: Área da alocação (Int).
   - `automovelId`: Referência ao automóvel (Int).
   - `concessionariaId`: Referência à concessionária (Int).
   - `quantidade`: Quantidade de automóveis alocados (Int).
   - `vendas`: Relação com o modelo Vendas.

5. **Vendas**
   - `id`: Identificador único da venda (Int).
   - `clienteId`: Referência ao cliente (Int).
   - `alocacaoId`: Referência à alocação (Int).
   - `concessionariaId`: Referência à concessionária (Int).
   - `data`: Data da venda (DateTime).

## Configuração do Ambiente

### Pré-requisitos

- **Node.js** instalado na sua máquina.
- **MySQL- MariaDB** instalado e rodando.
- **Xampp** instalado na sua máquina.
- **VsCode** instalado na sua máquina.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Carla-coder/Fabrica_automoveis.git
   cd api
   ```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL="mysql://root:@localhost:3306/fab_auto"
PORT=3000
```

4. Execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev --name fab_auto inity

```

5. Popule o banco de dados com dados iniciais:

```bash
npx prisma db seed
```

6. Inicie o servidor:

```bash
node server.js
O servidor estará rodando em http://localhost:3000.
```

## Endpoints da API

### Root

- GET /: Retorna uma mensagem indicando que a API está em execução.

### Alocação

- GET /alocacao: Retorna todas as alocações com quantidade maior ou igual a 0.

- GET /alocacao/area: Agrupa alocações por área.

### Automóveis

- GET /automoveis: Retorna todos os automóveis.

- GET /automoveis/:area: Retorna automóveis alocados em uma área específica.

### Clientes

- GET /clientes: Retorna todos os clientes.

### Concessionárias

- GET /concessionarias: Retorna todas as concessionárias.

- GET /concessionarias/:automovelId: Retorna concessionárias que possuem alocações de um automóvel específico.

### Vendas

- GET /vendas: Retorna todas as vendas. 

- POST /vendas: Cria uma nova venda.

# Descrição do Projeto para Web

O Pátio de Automóveis é um sistema desenvolvido para gerenciar áreas de estacionamento e automóveis disponíveis. O projeto utiliza uma interface web onde usuários podem visualizar áreas, consultar informações sobre veículos e realizar vendas.

## Estrutura do Frontend

### HTML

O arquivo HTML principal (index.html) estrutura a interface do usuário.

### JavaScript

O arquivo JavaScript (index.js) gerencia a lógica de interação com a interface. Ele faz chamadas para a API, pinta as áreas de estacionamento e abre modais para exibir informações sobre os automóveis e realizar vendas.

### CSS

O arquivo CSS (style.css) define o estilo da interface, incluindo a disposição das áreas de estacionamento, modais e botões.

## Funcionalidades

- Visualização de áreas de estacionamento e seus status.

- Consultas sobre veículos disponíveis.

- Realização de vendas com opções de seleção de clientes e concessionárias.

- Alertas informativos sobre as áreas de estacionamento.

### Como Executar

Abra o arquivo index.html pelo LiveServer.

### Tecnologias Utilizadas

- HTML

- CSS

- JavaScript

- Fetch API para chamadas HTTP

- FreePick: vetor "free" para imagem de fundo (opcional)

- Para todos os textos a fonte que você deverá utilizar é Segoe UI.
  
- As cores que podem ser utilizadas no desenvolvimento das suas telas são:
  
RGB	         HEXADECIMAL

255, 255, 255	#FFFFFF

120, 20, 255	#7814FF

112, 112, 112	#707070

0, 0, 0	      #000000

# Print das telas

## Tela inicial

- ![tela inicial](https://github.com/user-attachments/assets/d0c4caf9-3123-486d-8584-90626b98e96a)

## Modal Venda

- ![modal1](https://github.com/user-attachments/assets/2b8c2fdd-3cd6-41a8-bd7e-27381968b527)

## Modal Confirmar

- ![modal2](https://github.com/user-attachments/assets/6a2e5689-30ac-460b-903b-60349d2933f2)




