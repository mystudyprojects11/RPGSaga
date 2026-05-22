import { Knight } from '../src/Knight';
import { Logger } from '../src/Logger';

describe('Knight (Рыцарь)', () => {
  test('создаётся с правильными характеристиками', () => {
    const knight = new Knight('Артур', 100, 20);
    expect(knight.getName()).toBe('Артур');
    expect(knight.getHealth()).toBe(100);
    expect(knight.getStrength()).toBe(20);
    expect(knight.getType()).toBe('Рыцарь');
    expect(knight.getLabel()).toBe('(Рыцарь) Артур');
    expect(knight.isAlive()).toBe(true);
  });

  test('takeDamage уменьшает здоровье', () => {
    const knight = new Knight('Артур', 100, 20);
    knight.takeDamage(30);
    expect(knight.getHealth()).toBe(70);
  });

  test('здоровье не опускается ниже нуля', () => {
    const knight = new Knight('Артур', 100, 20);
    knight.takeDamage(150);
    expect(knight.getHealth()).toBe(0);
    expect(knight.isAlive()).toBe(false);
  });

  test('обычная атака наносит урон, равный силе героя', () => {
    const attacker = new Knight('Артур', 100, 20);
    const target = new Knight('Вильямс', 100, 15);
    attacker.attack(target, new Logger());
    expect(target.getHealth()).toBe(80);
  });

  test('способность "Удар возмездия" наносит урон +30%', () => {
    const attacker = new Knight('Артур', 100, 20);
    const target = new Knight('Вильямс', 100, 15);
    attacker.useAbility(target, new Logger());
    // Math.round(20 * 1.3) = 26
    expect(target.getHealth()).toBe(74);
  });
});
