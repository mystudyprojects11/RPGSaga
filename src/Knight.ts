import { Hero } from './Hero';
import { Logger } from './Logger';

// Рыцарь.
// Способность "Удар возмездия" — наносит урон + 30%.
export class Knight extends Hero {
  getType(): string {
    return 'Рыцарь';
  }

  useAbility(opponent: Hero, logger: Logger): void {
    const damage = Math.round(this.strength * 1.3);
    const hit = opponent.takeDamage(damage);
    if (hit) {
      logger.log(
        this.getLabel() + ' использует (Удар возмездия) и наносит урон ' +
        damage + ' противнику ' + opponent.getLabel(),
      );
    } else {
      logger.log(opponent.getLabel() + ' пропускает ход (Заворожение)');
    }
  }
}
