import { Hero } from './Hero';
import { Logger } from './Logger';

// Маг.
// Способность "Заворожение" — противник пропускает ход.
export class Mage extends Hero {
  private enchanted = false; // флаг заворожения

  getType(): string {
    return 'Маг';
  }

  // При ударе по магу проверяем флаг.
  // Если он стоит — урон игнорируется, флаг снимается.
  takeDamage(amount: number): boolean {
    if (this.enchanted) {
      this.enchanted = false;
      return false;
    }
    return super.takeDamage(amount);
  }

  // Флаг обнуляется при переходе мага на новый ход
  makeMove(opponent: Hero, logger: Logger): void {
    this.enchanted = false;
    super.makeMove(opponent, logger);
  }

  reset(): void {
    super.reset();
    this.enchanted = false;
  }

  // Маг не наносит урона при использовании способности
  protected useAbility(opponent: Hero, logger: Logger): void {
    this.enchanted = true;
    logger.log(this.getLabel() + ' использует (Заворожение)');
  }
}
