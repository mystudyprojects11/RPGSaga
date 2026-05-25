import { Archer } from '../src/Archer';
import { Knight } from '../src/Knight';
import { Logger } from '../src/Logger';

describe('Archer (Лучник)', () => {
  test('тип героя — Лучник', () => {
    expect(new Archer('Робин', 100, 15).getType()).toBe('Лучник');
  });

  test('способность "Огненные стрелы" поджигает противника без прямого урона', () => {
    const archer = new Archer('Робин', 100, 15);
    const target = new Knight('Артур', 100, 20);
    archer.useAbility(target, new Logger());
    expect(target.getHealth()).toBe(100); // прямого урона нет
    target.applyBurning(new Logger());
    expect(target.getHealth()).toBe(98); // но горит — теряет 2 ед.
  });

  test('reset гасит горение', () => {
    const target = new Knight('Артур', 100, 20);
    target.ignite();
    target.reset();
    target.applyBurning(new Logger());
    expect(target.getHealth()).toBe(100);
  });

  test('"Огненные стрелы" действуют 1 раз: повторная способность — обычная атака', () => {
    const archer = new Archer('Робин', 100, 15);
    const target = new Knight('Артур', 100, 20);
    archer.useAbility(target, new Logger()); // поджёг, урона нет
    expect(target.getHealth()).toBe(100);
    archer.useAbility(target, new Logger()); // стрелы израсходованы → обычная атака
    expect(target.getHealth()).toBe(85);
  });
});
