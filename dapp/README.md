# BetTeam DApp (Decentralized Application)

Este é um DApp (Aplicativo Descentralizado) construído com **Next.js** que permite aos usuários apostar em uma disputa entre dois times e reivindicar prêmios com base no resultado. O DApp se conecta a um contrato inteligente em Ethereum.

## Tecnologias Utilizadas

* **Solidity** : Para o smart contract.
* **Next.js** : Para o front-end.
* **Web3.js** : Para interagir com o contrato inteligente no Ethereum.
* **MetaMask** : Para integração com carteiras Ethereum.

## Funcionalidades do DApp

* Apostar em um dos times da disputa.
* Visualizar o total apostado em cada time.
* Usuários podem reivindicar seus prêmios caso tenham apostado no time vencedor.

## Pré-requisitos

Antes de rodar o projeto, você precisará ter os seguintes requisitos:

* [Node.js]() instalado
* Uma carteira Ethereum (como [MetaMask](https://metamask.io/))

## Como rodar localmente

1. **Clone o repositório:**
   ```
   git clone https://github.com/CaioBalieir0/web3-betTeam
   ```
2. **Instale as dependências:**
   ```
   npm install
   ```
3. **Inicie a aplicação:**
   ```
   npm run dev
   ```
4. **Configure o endereço do contrato e o ABI**

Se você já implantou seu contrato em uma rede como [Remix](https://remix.ethereum.org), altere o endereço do contrato e o arquivo ABI:

* No arquivo `services/Web3Service.js`, atualize o endereço do contrato:

```
const contractAddress = "0xSeuContratoAddress"; // Substitua pelo endereço do seu contrato implantado
```

* Substitua o arquivo `ABI.json` pela versão correta do ABI do seu contrato.
