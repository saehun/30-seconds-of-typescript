const cache = new Map();
const pendings = new Map();

/**
 * Runtime
 */
async function runPureTask<T extends (...args: any[]) => any>(task: T) {
  for (;;) {
    try {
      return task();
    } catch (x) {
      if (x instanceof Promise) {
        await x;
      } else {
        throw x;
      }
    }
  }
}

/**
 * Task impl
 */
function fetchTextSync(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  if (pendings.has(url)) {
    throw pendings.get(url);
  }
  const promise = fetch(url)
    .then(response => response.text())
    .then(text => {
      pendings.delete(url);
      cache.set(url, text);
    });
  pendings.set(url, promise);
  throw promise;
}

/**
 * Examples
 */
function getUserName(id: number) {
  const user = JSON.parse(fetchTextSync('/users/' + id));
  return user.name;
}

function getGreeting(name: string) {
  if (name === 'Seb') {
    return 'Hey';
  }
  return fetchTextSync('/greeting');
}

function getMessage() {
  const name = getUserName(123);
  return getGreeting(name) + ', ' + name + '!';
}

/**
 * Execute
 */
runPureTask(getMessage).then(message => console.log(message));
