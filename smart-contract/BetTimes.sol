//SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

// Struct são estruturas de dados em Solidity
struct Bet {
    uint amount;
    uint team;
    uint timestamp;
    uint claimed;
}

struct Dispute {
    string team1;
    string team2;
    string img1;
    string img2;
    uint total1;
    uint total2;
    uint winner;
}

// Botões amarelos significam "deploy", azuis significam "visualizar", vermelho são funções que enviam pagamento
contract BetTeam {

    Dispute public dispute; // Como a variável é publica, em deploy, aparece um botão azul "dispute" para exibir os dados
    mapping(address => Bet) public allBets; // (Para cada endereço de carteira, vou ter uma aposta(Bet) associada a ela.

    // addres é uma variável que representa o endereço da carteira do dono
    address owner; // Owner vai ser quem inicializar o contrato, quem fizer o Deploy.

    // unit é uma variável que apresenta inteiros somente positivos
    uint fee = 1000; // (10%) escala de 4 zeros
    uint public netPrize;

    constructor() {
        owner = msg.sender; // Msg é um objeto sobre os usuários da blockchain atual
        dispute = Dispute({
            team1: "Santos",
            team2: "Corinthians",
            img1: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png",
            img2: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
            total1: 0,
            total2: 0,
            winner: 0 
        });
    }

    //Function external para a função poder ser chamada fora do contrato
    //Payable: espera o pagamento em cryptomoedas, usada para as funções fazerem transações 
    function bet(uint team) external payable {
        require(team == 1 || team == 2, "Time Invalido"); // Require funciona como se fosse um IF, sendo usado para validações, com o primeiro parâmetro sendo true e o segundo false
        require(msg.value > 0, "Valor invalido");
        require(dispute.winner == 0, "Disputa fechada");

        // Memory significa que é um tipo de dado temporário
        Bet memory newBet;
        newBet.amount = msg.value;
        newBet.team = team;
        newBet.timestamp = block.timestamp; // block é um objeto com informações do bloco atual da blockchain

        allBets[msg.sender] = newBet;

        if (team == 1)
            dispute.total1 += msg.value;
        else 
            dispute.total2 += msg.value;
    }


    function finish(uint winner) external {
        require(msg.sender == owner, "Conta invalida");
        require(winner == 1 || winner == 2, "Time invalido");
        require(dispute.winner == 0, "Disputa fechada");

        dispute.winner = winner;

        uint grossPrize = dispute.total1 + dispute.total2;
        uint commission = (grossPrize * fee) / 1e4; // 1e4 = 1 * 10^4 = 10000
        netPrize = grossPrize - commission;


        payable(owner).transfer(commission);
    }

    function claim() external {
        Bet memory userBet = allBets[msg.sender];
        require(dispute.winner > 0 && dispute.winner == userBet.team && userBet.claimed == 0, "Requisicao invalida");
        
        uint winnerAmount = dispute.winner == 1 ? dispute.total1 : dispute.total2;
        uint ratio = (userBet.amount * 1e4) / winnerAmount;
        uint individualPrize = netPrize * ratio / 1e4;

        allBets[msg.sender].claimed = individualPrize;
        payable(msg.sender).transfer(individualPrize);
    }
}