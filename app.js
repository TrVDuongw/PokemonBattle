// Simple JS implementation of the battle logic and UI interactions
const pokemons = [
  { name: "Charmander", type: "Fire", hp: 100, attack: 25 },
  { name: "Squirtle", type: "Water", hp: 110, attack: 20 },
  { name: "Bulbasaur", type: "Grass", hp: 105, attack: 22 }
];

const playerSelect = document.getElementById('playerSelect');
const enemySelect = document.getElementById('enemySelect');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const logArea = document.getElementById('logArea');

const playerName = document.getElementById('playerName');
const enemyName = document.getElementById('enemyName');
const playerHpBar = document.getElementById('playerHp');
const enemyHpBar = document.getElementById('enemyHp');
const playerHpText = document.getElementById('playerHpText');
const enemyHpText = document.getElementById('enemyHpText');
const playerSprite = document.getElementById('playerSprite');
const enemySprite = document.getElementById('enemySprite');

function populateSelects(){
  pokemons.forEach((p, i) => {
    const o1 = document.createElement('option');
    o1.value = i; o1.textContent = p.name + ' ('+p.type+')';
    playerSelect.appendChild(o1);
    const o2 = document.createElement('option');
    o2.value = i; o2.textContent = p.name + ' ('+p.type+')';
    enemySelect.appendChild(o2);
  });
  enemySelect.selectedIndex = 1;
}

function typeClass(type){
  return (type||'').toLowerCase();
}

function setSprite(el, type, name){
  el.className = 'sprite ' + typeClass(type);
  el.textContent = name;
}

function resetUI(state){
  logArea.innerHTML = '';
  const p = state.player;
  const e = state.enemy;
  playerName.textContent = p.name + ' ('+p.type+')';
  enemyName.textContent = e.name + ' ('+e.type+')';
  playerHpBar.style.width = (p.hp / p.maxHp * 100) + '%';
  enemyHpBar.style.width = (e.hp / e.maxHp * 100) + '%';
  playerHpText.textContent = p.hp + ' / ' + p.maxHp;
  enemyHpText.textContent = e.hp + ' / ' + e.maxHp;
  setSprite(playerSprite, p.type, p.name);
  setSprite(enemySprite, e.type, e.name);
}

function log(msg){
  const d = document.createElement('div');
  d.textContent = msg;
  logArea.appendChild(d);
  logArea.scrollTop = logArea.scrollHeight;
}

function createState(playerIndex, enemyIndex){
  const p = Object.assign({}, pokemons[playerIndex]);
  const e = Object.assign({}, pokemons[enemyIndex]);
  p.maxHp = p.hp; e.maxHp = e.hp;
  return { player: p, enemy: e };
}

function calcDmg(attacker, defender){
  // basic type advantage: Fire > Grass, Water > Fire, Grass > Water
  const adv = {
    Fire: 'Grass',
    Water: 'Fire',
    Grass: 'Water'
  };
  let base = attacker.attack;
  if (adv[attacker.type] === defender.type) base += 8;
  return base;
}

async function fight(state){
  startBtn.disabled = true;
  const p = state.player, e = state.enemy;
  log('=== Trận đấu bắt đầu ===');
  resetUI(state);
  await sleep(500);
  while (p.hp > 0 && e.hp > 0){
    // player's turn
    let dmg = calcDmg(p, e);
    e.hp -= dmg;
    if (e.hp < 0) e.hp = 0;
    log(p.name + ' tấn công ' + e.name + ' gây ' + dmg + ' sát thương.');
    enemyHpBar.style.width = (e.hp / e.maxHp * 100) + '%';
    enemyHpText.textContent = e.hp + ' / ' + e.maxHp;
    await sleep(700);
    if (e.hp <= 0) break;

    // enemy's turn
    dmg = calcDmg(e, p);
    p.hp -= dmg;
    if (p.hp < 0) p.hp = 0;
    log(e.name + ' tấn công ' + p.name + ' gây ' + dmg + ' sát thương.');
    playerHpBar.style.width = (p.hp / p.maxHp * 100) + '%';
    playerHpText.textContent = p.hp + ' / ' + p.maxHp;
    await sleep(700);
  }

  if (p.hp <= 0) log(p.name + ' đã gục ngã! ' + e.name + ' chiến thắng!');
  else log(e.name + ' đã gục ngã! ' + p.name + ' chiến thắng!');
  startBtn.disabled = false;
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// init
populateSelects();
let currentState = createState(0,1);
resetUI(currentState);

startBtn.addEventListener('click', () => {
  const pi = parseInt(playerSelect.value);
  const ei = parseInt(enemySelect.value);
  if (pi === ei){
    alert('Vui lòng chọn 2 Pokémon khác nhau!');
    return;
  }
  currentState = createState(pi, ei);
  fight(currentState);
});

resetBtn.addEventListener('click', () => {
  currentState = createState(0,1);
  playerSelect.selectedIndex = 0;
  enemySelect.selectedIndex = 1;
  resetUI(currentState);
});
