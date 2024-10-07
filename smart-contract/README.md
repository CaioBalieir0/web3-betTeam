# BetTeam Smart Contract

Este é um contrato inteligente escrito em Solidity que permite aos usuários apostar em uma disputa entre dois times e posteriormente reivindicar seus prêmios. O contrato inclui uma taxa de comissão para o criador da aposta e distribui os prêmios com base na proporção das apostas dos vencedores.

## Funcionalidades

* **Apostas** : Usuários podem apostar em um dos dois times de uma disputa.
* **Finalização da Disputa** : O criador da disputa pode definir o vencedor e calcular o valor do prêmio líquido.
* **Reivindicação de Prêmios** : Usuários podem reivindicar seus prêmios se apostarem no time vencedor.

## Como Funciona

1. O contrato é inicializado com dois times em uma disputa (`team1` e `team2`), junto com os valores totais apostados.
2. Usuários podem apostar uma quantia em ETH no time de sua escolha.
3. Após a finalização da disputa, os usuários que apostaram no time vencedor podem reivindicar seus prêmios, que são distribuídos proporcionalmente à quantia apostada.

## Funções

### `bet(uint team)`

Permite que um usuário faça uma aposta em um dos dois times.

* `team`: O número do time (1 ou 2).
* `msg.value`: A quantia de ETH a ser apostada.

### `finish(uint winner)`

Finaliza a disputa e define o time vencedor.

* Somente o proprietário do contrato pode chamar essa função.
* `winner`: O time vencedor (1 ou 2).

### `claim()`

Permite que os usuários reivindiquem seus prêmios se tiverem apostado no time vencedor.


## Como utilizar o código

Siga os passos abaixo para compilar e implantar o contrato `BetTeam` no Remix IDE:

1. **Abra o Remix IDE** : Acesse o [Remix](https://remix.ethereum.org) diretamente no seu navegador.
2. **Crie um novo arquivo** : No Remix, crie um novo arquivo chamado `BetTeam.sol`.
3. **Copie o código** : Copie o conteúdo do arquivo `BetTeam.sol` deste repositório e cole no arquivo criado no Remix.
4. **Compile e dê deploy** no arquivo.
