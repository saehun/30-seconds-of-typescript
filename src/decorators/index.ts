import 'reflect-metadata';

function Log(name: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(name, 'called');
      return fn(...args);
    };
  };
}

class Runner {
  @Log('run')
  run(task: () => void) {
    task();
  }
}

const runner = new Runner();
runner.run(() => {
  console.log('hello world!');
});
