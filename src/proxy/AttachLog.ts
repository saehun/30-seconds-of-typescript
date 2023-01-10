export function AttachLog<T extends object>(obj: T): T {
  const log = (methodNAme: string, ...args: any[]) => console.log(`Proxy[${methodNAme}]`, ...args);
  return new Proxy(obj, {
    apply(target: any, thisArg: any, argArray: any[]) {
      log('apply');
      return Reflect.apply(target, thisArg, argArray);
    },
    construct(target: any, argArray: any[], newTarget: Function) {
      log('construct');
      return Reflect.construct(target, argArray, newTarget);
    },
    defineProperty(target: T, p: string | symbol, attributes: PropertyDescriptor) {
      log('defineProperty');
      return Reflect.defineProperty(target, p, attributes);
    },
    deleteProperty(target: T, p: string | symbol) {
      log('deleteProperty');
      return Reflect.deleteProperty(target, p);
    },
    get(target: T, p: string | symbol, receiver: any) {
      log('get', p);
      return Reflect.get(target, p, receiver);
    },
    getOwnPropertyDescriptor(target: T, p: string | symbol) {
      log('getOwnPropertyDescriptor');
      return Reflect.getOwnPropertyDescriptor(target, p);
    },
    getPrototypeOf(target: T) {
      log('getPrototypeOf');
      return Reflect.getPrototypeOf(target);
    },
    has(target: T, p: string | symbol) {
      log('has', p);
      return Reflect.has(target, p);
    },
    isExtensible(target: T) {
      log('isExtensible');
      return Reflect.isExtensible(target);
    },
    ownKeys(target: T) {
      log('ownKeys');
      return Reflect.ownKeys(target);
    },
    preventExtensions(target: T) {
      log('preventExtensions');
      return Reflect.preventExtensions(target);
    },
    set(target: T, p: string | symbol, value: any, receiver: any) {
      log('set', p);
      return Reflect.set(target, p, value, receiver);
    },
    setPrototypeOf(target: T, v: object | null) {
      log('setPrototypeOf');
      return Reflect.setPrototypeOf(target, v);
    },
  });
}

// primitive number, boolean, string, symbol, bigint, null, undefined
// 빼고는 나머지는 다 객체잖아.

User.name; // 선진
Reflect.get(User, 'name');

class UserManager {
  constructor(private readonly users: User[]) {
    console.log('UserManagerCreated');
  }
}
