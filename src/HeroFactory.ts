import { Hero } from './Hero';
import { Knight } from './Knight';
import { Archer } from './Archer';
import { Mage } from './Mage';

// Возможные имена героев
const NAMES = [
  'Артур', 'Эльдар', 'Гэндальф', 'Вильямс',
  'Леголас', 'Мерлин', 'Робин', 'Ланселот',
];

// Возможные типы героев
const TYPES = ['Рыцарь', 'Лучник', 'Маг'];

// Фабрика героев.
export class HeroFactory {
  // Фабричный метод 1: создать одного героя с заданными параметрами.
  static createHero(
    type: string,
    name: string,
    health: number,
    strength: number,
  ): Hero {
    if (type === 'Рыцарь') {
      return new Knight(name, health, strength);
    }
    if (type === 'Лучник') {
      return new Archer(name, health, strength);
    }
    return new Mage(name, health, strength);
  }

  // Фабричный метод 2: создать массив героев со случайными значениями.
  static createRandomHeroes(count: number): Hero[] {
    const heroes: Hero[] = [];
    for (let i = 0; i < count; i++) {
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const health = 80 + Math.floor(Math.random() * 41); // 80..120
      const strength = 10 + Math.floor(Math.random() * 16); // 10..25
      heroes.push(HeroFactory.createHero(type, name, health, strength));
    }
    return heroes;
  }
}
