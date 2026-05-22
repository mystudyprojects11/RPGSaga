import { Mage } from '../src/Mage';
import { Knight } from '../src/Knight';
import { Logger } from '../src/Logger';

describe('Mage (Маг)', () => {
  test('тип героя — Маг', () => {
    expect(new Mage('Гэндальф', 100, 15).getType()).toBe('Маг');
  });

  test('способность "Заворожение" не наносит урона противнику', () => {
    const mage = new Mage('Гэндальф', 100, 15);
    const target = new Knight('Артур', 100, 20);
    mage.useAbility(target, new Logger());
    expect(target.getHealth()).toBe(100);
  });

  test('заворожённый маг игнорирует следующий удар', () => {
    const mage = new Mage('Гэндальф', 100, 15);
    mage.useAbility(new Knight('Артур', 100, 20), new Logger());
    const damageApplied = mage.takeDamage(50);
    expect(damageApplied).toBe(false); // урон заблокирован
    expect(mage.getHealth()).toBe(100);
  });

  test('после блокировки флаг снимается — следующий удар проходит', () => {
    const mage = new Mage('Гэндальф', 100, 15);
    mage.useAbility(new Knight('Артур', 100, 20), new Logger());
    mage.takeDamage(50); // заблокирован, флаг снят
    const damageApplied = mage.takeDamage(30);
    expect(damageApplied).toBe(true);
    expect(mage.getHealth()).toBe(70);
  });

  test('reset снимает заворожение', () => {
    const mage = new Mage('Гэндальф', 100, 15);
    mage.useAbility(new Knight('Артур', 100, 20), new Logger());
    mage.reset();
    mage.takeDamage(40); // флага нет → урон проходит
    expect(mage.getHealth()).toBe(60);
  });
});
