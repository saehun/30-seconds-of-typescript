import EventEmitter from 'events';

export function onceEventExpr() {
  const emitter = new EventEmitter();

  const event = Symbol('my-event');

  emitter.once(event, () => console.log('once!'));

  const rawListeners = emitter.rawListeners(event);
  const logFnWrapper = rawListeners[0];

  // logFnWrapper is typeof onceWrapper
  // [Function: bound onceWrapper] { listener: [Function (anonymous)] }
  (logFnWrapper as any).listener();
  console.log(emitter.rawListeners(event));
  console.log(emitter.listeners(event));

  // calling it directly removes listner from the listeners array;
  logFnWrapper();
  console.log(emitter.rawListeners(event)); // []
  console.log(emitter.listeners(event)); // []
}
