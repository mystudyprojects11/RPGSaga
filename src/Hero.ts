import { Logger } from './Logger';

// Базовый класс игрока (героя).
// От него наследуются Рыцарь, Лучник и Маг.
export abstract class Hero {
  protected name: string;
  protected health: number;
  protected strength: number;
  protected burning = false; // горит ли герой (огненные стрелы лучника)

  constructor(name: string, health: number, strength: number) {
    this.name = name;
    this.health = health;
    this.strength = strength;
  }

  // Геттеры (сеттеров нет)
  getName(): string {
    return this.name;
  }

  getHealth(): number {
    return this.health;
  }

  getStrength(): number {
    return this.strength;
  }

  // Тип героя — у каждого наследника свой
  abstract getType(): string;

  // Подпись для логов, например "(Рыцарь) Артур"
  getLabel(): string {
    return '(' + this.getType() + ') ' + this.name;
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  // Получить урон. Возвращает true, если урон прошёл.
  // Маг переопределяет этот метод.
  takeDamage(amount: number): boolean {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }
    return true;
  }

  // Поджечь героя (способность лучника)
  ignite(): void {
    this.burning = true;
  }

  // Урон от горения в начале хода
  applyBurning(logger: Logger): void {
    if (this.burning) {
      this.health -= 2;
      if (this.health < 0) {
        this.health = 0;
      }
      logger.log(this.getLabel() + ' горит и теряет 2 ед. жизни');
    }
  }

  // Сбросить эффекты перед новым боем
  reset(): void {
    this.burning = false;
  }

  // Ход героя: случайно выбирается обычная атака или способность
  makeMove(opponent: Hero, logger: Logger): void {
    if (Math.random() < 0.5) {
      this.useAbility(opponent, logger);
    } else {
      this.attack(opponent, logger);
    }
  }

  // Обычная атака — наносит урон, равный силе героя
  protected attack(opponent: Hero, logger: Logger): void {
    const hit = opponent.takeDamage(this.strength);
    if (hit) {
      logger.log(
        this.getLabel() + ' наносит урон ' + this.strength +
        ' противнику ' + opponent.getLabel(),
      );
    } else {
      logger.log(opponent.getLabel() + ' пропускает ход (Заворожение)');
    }
  }

  // Способность героя — у каждого наследника своя
  protected abstract useAbility(opponent: Hero, logger: Logger): void;
}
