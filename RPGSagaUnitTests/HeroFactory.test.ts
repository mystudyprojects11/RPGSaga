import { HeroFactory } from '../src/HeroFactory';
import { Knight } from '../src/Knight';
import { Archer } from '../src/Archer';
import { Mage } from '../src/Mage';

describe('HeroFactory (фабрика героев)', () => {
  test('createHero создаёт героя нужного типа', () => {
    expect(HeroFactory.createHero('Рыцарь', 'A', 100, 10)).toBeInstanceOf(Knight);
    expect(HeroFactory.createHero('Лучник', 'B', 100, 10)).toBeInstanceOf(Archer);
    expect(HeroFactory.createHero('Маг', 'C', 100, 10)).toBeInstanceOf(Mage);
  });

  test('createHero передаёт заданные параметры герою', () => {
    const hero = HeroFactory.createHero('Рыцарь', 'Артур', 95, 18);
    expect(hero.getName()).toBe('Артур');
    expect(hero.getHealth()).toBe(95);
    expect(hero.getStrength()).toBe(18);
  });

  test('createRandomHeroes возвращает массив нужной длины', () => {
    expect(HeroFactory.createRandomHeroes(6)).toHaveLength(6);
  });

  test('случайные герои имеют характеристики в допустимых границах', () => {
    const heroes = HeroFactory.createRandomHeroes(30);
    for (const hero of heroes) {
      expect(hero.getHealth()).toBeGreaterThanOrEqual(80);
      expect(hero.getHealth()).toBeLessThanOrEqual(120);
      expect(hero.getStrength()).toBeGreaterThanOrEqual(10);
      expect(hero.getStrength()).toBeLessThanOrEqual(25);
      expect(hero.isAlive()).toBe(true);
    }
  });
});
