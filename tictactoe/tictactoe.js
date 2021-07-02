const $score = document.getElementById('score');
const $newGameButton = document.getElementById('newGameBtn');
const $resetGameButton = document.getElementById('resetGameBtn');
const $table = document.getElementById('table');
const $tbody = $table.children;

let turn = 0; // 0 : o  1 : x
let oScore = 0;
let xScore = 0;

// 이미 채워져있는 칸인지 검사
function checkFill(target) {
  if (target.textContent) {
    return true;
  } else {
    return false;
  }
}

// 칸 채우기
function fillSpace(target) {
  if (turn === 0) {
    target.innerHTML = 'O';
    target.style.color = 'white';
    turn = 1;
  } else {
    target.innerHTML = 'X';
    target.style.color = 'black';
    turn = 0;
  }
}

function selectTurn() {
  if (
    confirm(
      '턴을 선택해 주세요.\n o플레이어가 먼저 플레이하려면 확인,\n x 플레이어가 먼저 플레이하려면 취소를 눌러주세요.'
    )
  ) {
    turn = 0;
  } else {
    turn = 1;
  }
}

// 틱택토 판 초기화
function initializer() {
  const trs = $tbody[0].children;
  for (let i = 0; i < trs.length; i++) {
    const tds = trs[i].children;
    for (let j = 0; j < tds.length; j++) {
      tds[j].textContent = '';
    }
  }

  selectTurn();
}

// 게임 끝
function gameEnd(xCount, oCount) {
  if (oCount === 3) {
    oScore += 1;
    $score.textContent = `${oScore} : ${xScore}`;
    alert('게임이 끝났습니다.');
    initializer();
  } else if (xCount === 3) {
    xScore += 1;
    $score.textContent = `${oScore} : ${xScore}`;
    alert('게임이 끝났습니다.');
    initializer();
  } else {
    alert('승자가 없습니다.');
    initializer();
  }
}

// 빙고인지 확인
function checkBingo() {
  const tdsArray = [];
  const trs = $tbody[0].children;
  for (let i = 0; i < trs.length; i++) {
    const tds = trs[i].children;
    for (let j = 0; j < tds.length; j++) {
      tdsArray.push(tds[j].textContent);
    }
  }
  console.log(tdsArray);

  // 가로빙고 확인
  for (let i = 0; i < 3; i++) {
    let xCount = 0;
    let oCount = 0;
    for (j = 0; j < 3; j++) {
      if (tdsArray[3 * i + j] === 'X') xCount += 1;
      else if (tdsArray[3 * i + j] === 'O') oCount += 1;
    }
    console.log(xCount, oCount);
    if (xCount === 3 || oCount === 3) {
      gameEnd(xCount, oCount);
      return;
    }
  }

  // 세로빙고 확인
  for (let i = 0; i < 3; i++) {
    let xCount = 0;
    let oCount = 0;
    for (j = 0; j < 3; j++) {
      if (tdsArray[3 * j + i] === 'X') xCount += 1;
      else if (tdsArray[3 * j + i] === 'O') oCount += 1;
    }
    if (xCount === 3 || oCount === 3) {
      gameEnd(xCount, oCount);
      return;
    }
  }

  // 대각선 빙고 확인
  const idx = [0, 4, 8, 2, 4, 6];
  for (let i = 0; i < 2; i++) {
    let xCount = 0;
    let oCount = 0;
    for (let j = 0; j < 3; j++) {
      if (tdsArray[idx[3 * i + j]] === 'X') xCount += 1;
      else if (tdsArray[idx[3 * i + j]] === 'O') oCount += 1;
    }
    if (xCount === 3 || oCount === 3) {
      gameEnd(xCount, oCount);
      return;
    }
  }

  // 승자가 없는지 확인
  for (let i = 0; i < tdsArray.length; i++) {
    if (tdsArray[i] === '') return;
  }
  gameEnd(0, 0);
}

$table.addEventListener('click', (e) => {
  if (checkFill(e.target)) {
    alert('이미 채워진 칸은 놓을 수 없습니다.');
    return;
  }
  fillSpace(e.target);
  checkBingo();
});

$newGameButton.addEventListener('click', () => {
  if (confirm('게임을 다시 시작하시겠습니까?')) initializer();
});

$resetGameButton.addEventListener('click', () => {
  if (confirm('점수를 초기화하고 게임을 다시 시작하시겠습니까?')) {
    initializer();
    xScore = 0;
    oScore = 0;
    $score.textContent = `${oScore} : ${xScore}`;
  }
});
