const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 10;
const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_GAME_OVER = 'GAME_OVER';

let chosenMaxLife = parseInt(prompt('Max Life for you and monster', '100'));
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    alert('Invalid input, setting life to 100');
    chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    dealDamage(ATTACK_VALUE, LOG_PLAYER_ATTACK);
    endRound();
}

function strongAttackHandler() {
    dealDamage(STRONG_ATTACK_VALUE, LOG_PLAYER_STRONG_ATTACK);
    endRound();
}

function healPlayerHandler() {
    let healValue;
    increasePlayerHealth(HEAL_VALUE);
    if (currentPlayerHealth >= chosenMaxLife - healValue) {
        alert('You cannot heal above max health.');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    currentPlayerHealth += HEAL_VALUE;

    writeToLog(
        LOG_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );

    endRound();
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const damage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= damage;

    writeToLog(
        LOG_MONSTER_ATTACK,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        currentPlayerHealth = initialPlayerHealth;
        removeBonusLife();
        hasBonusLife = false;
        alert('Bonus Life!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
        writeToLog(
            LOG_PLAYER_STRONG_ATTACK,
            'Player Won',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost!');
        writeToLog(
            LOG_PLAYER_STRONG_ATTACK,
            'Monster Won',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Draw!');
        writeToLog(
            LOG_PLAYER_STRONG_ATTACK,
            'Draw',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function dealDamage(playerAttackValue, attackMode) {
    const damage = dealMonsterDamage(playerAttackValue);
    currentMonsterHealth -= damage;

    writeToLog(attackMode, damage, currentMonsterHealth, currentPlayerHealth);
}

function writeToLog(event, value, currentMonsterHealth, currentPlayerHealth) {
    if (
        event === LOG_PLAYER_ATTACK ||
        LOG_MONSTER_ATTACK ||
        LOG_PLAYER_STRONG_ATTACK ||
        LOG_PLAYER_HEAL ||
        LOG_GAME_OVER
    ) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: currentMonsterHealth,
            finalPlayerHealth: currentPlayerHealth,
        };
        battleLog.push(logEntry);
    }
}

function showLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', showLogHandler);
