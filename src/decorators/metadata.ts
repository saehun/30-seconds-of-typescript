import 'reflect-metadata';

function Decorate(metadataKey: string, metadataValue: any): MethodDecorator {
  return (target, key) => {
    Reflect.defineMetadata(metadataKey, metadataValue, target, key);
  };
}

/**
 * If you want to declare PropertyDecorator | ParameterDecorator in one function,
 * it should have signature of (target: any, key: string, index?: number) => void
 * not (target: any, propertyKey: string) => PropertyDecorator | ParameterDecorator
 */
function Inject(injectionKey: string) {
  return (target: any, key: string, index?: number): void => {
    void index;
    Reflect.defineMetadata('INJECT', injectionKey, target, key);
  };
}

class Greeting {
  constructor(@Inject('baz') private readonly name: string) {}

  @Inject('foo')
  template: string;

  @Decorate('KEY', { foo: 'bar' })
  public say(name?: string): boolean {
    console.log(`Hello, ${name ?? this.name}`);
    return true;
  }
}

(async () => {
  const greeting = new Greeting('Karl');
  console.log(Reflect.getMetadata('KEY', greeting, 'say'));
  console.log(Reflect.getMetadata('design:type', greeting, 'say'));
  console.log(Reflect.getMetadata('design:paramtypes', greeting, 'say'));
  console.log(Reflect.getMetadata('design:returntype', greeting, 'say'));

  console.log('');

  // baz
  console.log(Reflect.getMetadata('INJECT', greeting.constructor /** or Greeting */));

  console.log('');

  // ['design:paramtypes', 'INJECT']
  console.log(Reflect.getMetadataKeys(greeting.constructor /** or Greeting */));
  // ['design:returntype', 'design:paramtypes', 'design:type', 'KEY']
  console.log(Reflect.getMetadataKeys(greeting, 'say' /** or Greeting */));

  console.log('');
  // ['design:type', 'KEY']
  console.log(Reflect.getMetadataKeys(greeting, 'template' /** or Greeting */));
})();
