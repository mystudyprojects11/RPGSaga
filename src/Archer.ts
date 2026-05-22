import { Hero } from './Hero';
import { Logger } from './Logger';

// Лучник.
// Способность "Огненные стрелы" — противник загорается и теряет
// по 2 ед. жизни каждый ход. Действует только 1 раз за бой.
export class Archer extends Hero {
  private fireUsed = false; // использованы ли огненные стрелы

  getType(): string {
    return 'Лучник';
  }

  reset(): void {
    super.reset();
    this.fireUsed = false;
  }

  // Лучник не наносит урона при использовании способности
  protected useAbility(opponent: Hero, logger: Logger): void {
    // Если стрелы уже использованы — делаем обычную атаку
    if (this.fireUsed) {
      this.attack(opponent, logger);
      return;
    }
    this.fireUsed = true;
    opponent.ignite();
    logger.log(
      this.getLabel() + ' использует (Огненные стрелы) — ' +
      opponent.getLabel() + ' загорается',
    );
  }
}
