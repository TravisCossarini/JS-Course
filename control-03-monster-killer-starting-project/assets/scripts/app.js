const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;


let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    dealDamage(ATTACK_VALUE);
}

function strongAttackHandler() {
    dealDamage(STRONG_ATTACK_VALUE);
}

function dealDamage(playerAttackValue) {
    const damage = dealMonsterDamage(playerAttackValue);
    currentMonsterHealth -= damage;

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Draw');
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
