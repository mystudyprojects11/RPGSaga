import * as fs from 'fs';

// Пауза: промис, который завершается через ms миллисекунд
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Класс для вывода логов игры.
export class Logger {
  private lines: string[] = [];

  // Запомнить строку лога
  log(message: string): void {
    this.lines.push(message);
  }

  // Сохранить весь лог в файл сразу и целиком
  save(fileName = 'game.log'): void {
    fs.writeFileSync(fileName, this.lines.join('\n'));
  }

  // Вывести лог в консоль построчно с задержкой,
  // чтобы человек успевал читать
  async play(delayMs: number): Promise<void> {
    for (const line of this.lines) {
      console.log(line);
      await sleep(delayMs);
    }
  }
}
