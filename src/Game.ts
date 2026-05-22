import { Hero } from './Hero';
import { Logger } from './Logger';
import { HeroFactory } from './HeroFactory';

// Игровой процесс.
export class Game {
  private players: Hero[];
  private logger: Logger;
  private delayMs: number; // задержка между строками вывода в консоль

  constructor(playerCount: number, delayMs: number) {
    this.logger = new Logger();
    this.players = HeroFactory.createRandomHeroes(playerCount);
    this.delayMs = delayMs;
  }

  // Запустить игру: коны идут, пока не останется один победитель
  async start(): Promise<void> {
    let round = 1;
    while (this.players.length > 1) {
      this.logger.log('');
      this.logger.log('Кон ' + round + '.');
      this.players = this.playRound(this.players);
      round++;
    }
    this.logger.log('');
    this.logger.log('Победитель — ' + this.players[0].getLabel());

    this.logger.save();                    // лог-файл записывается сразу
    await this.logger.play(this.delayMs);  // в консоль — с задержкой
  }

  // Провести один кон: разбить героев на пары и провести бои
  private playRound(players: Hero[]): Hero[] {
    const shuffled = this.shuffle(players);
    const winners: Hero[] = [];
    for (let i = 0; i + 1 < shuffled.length; i += 2) {
      this.logger.log('');
      winners.push(this.fight(shuffled[i], shuffled[i + 1]));
    }
    // Если героев нечётно — последний проходит дальше без боя
    if (shuffled.length % 2 === 1) {
      winners.push(shuffled[shuffled.length - 1]);
    }
    return winners;
  }

  // Бой двух героев. Возвращает победителя.
  private fight(first: Hero, second: Hero): Hero {
    first.reset();
    second.reset();
    this.logger.log(first.getLabel() + ' vs ' + second.getLabel());

    let attacker = first;
    let defender = second;
    let turns = 0;
    while (first.isAlive() && second.isAlive() && turns < 500) {
      turns++;
      attacker.applyBurning(this.logger);
      if (!attacker.isAlive()) {
        this.logger.log(attacker.getLabel() + ' погибает');
        break;
      }
      attacker.makeMove(defender, this.logger);
      if (!defender.isAlive()) {
        this.logger.log(defender.getLabel() + ' погибает');
        break;
      }
      // Меняем атакующего и защищающегося местами
      const temp = attacker;
      attacker = defender;
      defender = temp;
    }

    // Если оба живы (лимит ходов) — побеждает герой с большим здоровьем
    if (first.isAlive() && second.isAlive()) {
      return first.getHealth() >= second.getHealth() ? first : second;
    }
    return first.isAlive() ? first : second;
  }

  // Перемешать массив героев (для случайного выбора пар)
  private shuffle(arr: Hero[]): Hero[] {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }
}
