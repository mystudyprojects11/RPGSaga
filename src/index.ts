import { Game } from './Game';

// Количество игроков (чётное число) и задержка вывода в миллисекундах.
// Можно передать аргументами: node dist/index.js 6 1000
const playerCount = Number(process.argv[2]) || 8;
const delayMs = Number(process.argv[3]) || 700;

const game = new Game(playerCount, delayMs);
game.start();
