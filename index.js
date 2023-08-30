const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = []; //será usado pra gerenciar a situação do tabuleiro

let turnPlayer = ""; //vai servir pra alternar de jogador

function updateTitle() {
  //vai mostrar o jogador da vez
  const playerInput = document.getElementById(turnPlayer); //input de onde o jogador digita seu nome
  document.getElementById("turnPlayer").innerText = playerInput.value;
  //o que faz até agora: peguei o valor do input digitado no nome do jogador (bota o nome na tela)
}

function initializeGame() {
  //inicializar o jogo (preparação pro jogo começar)
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]; //isso vai mostrar no console a situação do tabuleiro, exibindo uma tabela como se fosse um jogo da velha, além de ser possivel fazer as verificações
  turnPlayer = "player1"; //porque o jogador 1 que vai começar
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>'; //quando o jogo terminar, o html dentro dele vai ser modificado, pra mostrar a mensagem de vencedor.
  //após isso, quando o jogo reiniciar, ele vai setar esse valor como inicial novamente, pra tudo ficar em ordem
  updateTitle(); //vai pegar o "player1" e exibir na tela
  boardRegions.forEach(function (element) {
    //"element" seria os próprios quadrados
    element.classList.remove("win"); //caso tenha algum quadrado verde, ao retirar essa classe, eles voltam ao normal
    element.innerText = ""; //caso tenha algum X ou O nos quadrados
    element.addEventListener("click", handleBoardClick); //serve para ter um evento quando clicar nos quadrados
  });
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableRegion(element) {
  //element seria o próprio quadrado
  element.style.cursor = "default";
  element.removeEventListener("click", handleBoardClick);
}

function handleBoardClick(ev) {
  //ev seria o próprio quadrado
  const span = ev.currentTarget; //pega qual quadrado
  //obtem a região que foi clicada
  const region = ev.currentTarget.dataset.region; //pega o valor da região ex: 0.1 obs: tem como separar os numeros
  const rowColumnPair = region.split(".");
  //split divide uma string e transforma em um array
  //nesse caso selecionamos o ".", então ficaria assim: ["0", "1"] pois ele tirou o "." e fez um array
  const row = rowColumnPair[0];
  //"0" seria porque NA POSIÇÃO 0 DO ARRAY sempre será uma linha EX: ["1", "2"] "1" está NA POSIÇÃO 0
  const column = rowColumnPair[1];
  //"1" seria porque NA POSIÇÃO 1 DO ARRAY sempre será uma coluna EX: ["1", "2"] "2" está NA POSIÇÃO 1
  if (turnPlayer === "player1") {
    //SE for a vez do JOGADOR 1
    span.innerText = "X"; //pega qual quadrado foi clicado e adiciona um X
    vBoard[row][column] = "X";
    //pega a posição 1 e 2 dos arrays
    //ou seja: o jogador1 clicou no quadrado 1.2
    //o split vai fazer um array = ["1", "2"] "1" = posição 0 / "2" = posição 1
    //row vai pegar o valor da posição 0, ou seja row = "1"
    //column vai pegar o valor da posição 1, ou seja row = "2"
    //então no vBoard na posição 1.2 adicionará um "X", mapeando ele.
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear(); //quando chegar nessa linha, ele limpa o console
  console.table(vBoard); //pega algo e mostra no console uma tabela
  disableRegion(span); //vai tirar o EventListener que permite clicar no quadrado selecionado na primeira jogada
  const winRegions = getWinRegions(); //vai verificar se o jogador venceu baseado no estado atual do vBoard
  if (winRegions.length > 0) {
    //se a length for maior que zero, significa que essa função retornou algo, ou seja ele venceu.
    console.log("Venceu");
  }
}

document.getElementById("start").addEventListener("click", initializeGame); //pega o button start e adiciona a função de inicializar o jogo
