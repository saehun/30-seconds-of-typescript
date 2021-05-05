/* ---------------------------------------------------------- *
 *
 *  0. Lets assume that we need get user from database
 *
 * ---------------------------------------------------------- */
type User = {
  id: string;
  name: string;
  email: string;
};

class Database {
  constructor(private readonly option?: any) {}
  async connect() {
    return;
  }
  async exec<T>(query: string): Promise<T> {
    // dummy exec
    void query, void this.option;
    return;
  }
}

/* ---------------------------------------------------------- *
 *
 *  1. Naive implementation: No dependency injection
 *
 * ---------------------------------------------------------- */
export namespace NaiveImpl {
  const db = new Database();
  export async function getUserById(id: string) {
    return await db.exec<User>(id);
  }
}

/* ---------------------------------------------------------- *
 *
 *  2. Simple implementation: Inject from arguments
 *
 * ---------------------------------------------------------- */
export namespace SimpleImpl {
  /** 2.1 always pass database instance to first (or any positional) argument */
  export async function getUserById(db: Database, id: string) {
    return await db.exec<User>(id);
  }

  /** 2.2 curry */
  /** const getUserById = getUserByIdWith(new Database()) */
  export function getUserByIdWith(db: Database) {
    return async (id: string): Promise<User> => {
      return await db.exec<User>(id);
    };
  }
}

/* ---------------------------------------------------------- *
 *
 *  3. Wrapper
 *
 * ---------------------------------------------------------- */
export namespace Wrapper {
  // DatabaseManager.ts
  class DatabaseManager {
    private db: Database;

    connect = async (option: any) => {
      this.db = new Database(option);
      return await this.db.connect();
    };

    withDatabase = <A extends any[], R>(fn: (db: Database, ...args: A) => R) => {
      return (...args: A) => {
        if (this.db == null) throw new Error('Database Not Initialized');
        return fn(this.db, ...args);
      };
    };
  }

  export const { withDatabase, connect } = new DatabaseManager();

  // bootstrap.ts
  // import { connect } from 'DatabaseManager';
  // function main() {
  //   ...
  //   connect({port: "23120", host: "localhost"});
  // }

  // somewhere
  // import { withDatabase } from 'DatabaseManager';

  export async function getUserByIdWith(db: Database, id: string) {
    // ^^ Expose for testing
    return await db.exec<User>(id);
  }

  export const getUserById = withDatabase(getUserByIdWith);
}

/* ---------------------------------------------------------- *
 *
 *  4. Lazy binding
 *
 * ---------------------------------------------------------- */
export namespace LazyBinding {
  type TaskWith<D, R> = (dependency: D) => Promise<R>;
  type DatabaseTask<R> = TaskWith<Database, R>;

  function getUserById(id: string): DatabaseTask<User> {
    return async db => {
      const user = await db.exec<User>(id);
      void user;
      return {
        id: 'minidonut',
        name: 'Karl Saehun Chung',
        email: 'nycom13@gmail.com',
      };
    };
  }

  // somewhere other file
  const db = new Database();
  async function runDatabaseTask<R>(task: DatabaseTask<R>): Promise<R> {
    return await task(db);
  }

  (async () => {
    const user = await runDatabaseTask(getUserById('foo')); // late binding
    void user;
  })();

  /** We can concatenate task factory (or `createTask`) */
  function concatTaskFactory<A, T1, T2>(
    taskFactory1: (arg: A) => DatabaseTask<T1>,
    taskFactory2: (arg: T1) => DatabaseTask<T2>
  ) {
    return (arg: A) => async (db: Database): Promise<T2> => {
      const result = await taskFactory1(arg)(db);
      return await taskFactory2(result)(db);
    };
  }

  /** another taskFactory<I,O,D>  (I: 'input', O: 'output', D: 'dependency') */
  const task = concatTaskFactory(getUserById, (user: User) => async (db: Database) => {
    console.log(user);
    return await db.exec<User>('update-query');
  });
  void task;
  // task('id-1234')(db);
}

/* ---------------------------------------------------------- *
 *
 *  5. Monad
 *
 * ---------------------------------------------------------- */
export namespace DatabaseMonad {
  class DatabaseMonad<T> {
    private constructor(private readonly task: (db: Database) => Promise<T>) {}

    static of<T>(task: (db: Database) => Promise<T>) {
      return new DatabaseMonad(task);
    }

    /** Monad interface `chain` */
    chain<O>(next: (input: T) => DatabaseMonad<O>): DatabaseMonad<O> {
      return new DatabaseMonad(async db => {
        const out = await this.run(db);
        return next(out).run(db);
      });
    }

    /** Functor interface `map` */
    map<O>(fn: (input: T) => Promise<O> | O): DatabaseMonad<O> {
      return new DatabaseMonad(async db => {
        const out = await this.run(db);
        return fn(out);
      });
    }

    async run(db: Database): Promise<T> {
      return await this.task(db);
    }
  }

  const getUserById = (id: string) =>
    DatabaseMonad.of(async db => {
      return await db.exec<User>(id);
    });

  const updateUser = (user: User) =>
    DatabaseMonad.of(async db => {
      const updated = await db.exec<boolean>(`<some update query with user id: ${user.id} ${user.name}>`);
      return updated;
    });

  const updateUserName = (id: string, name: string) =>
    getUserById(id)
      .map(user => ({ ...user, name }))
      .chain(updateUser);

  console.log(updateUserName('<id>', 'foo').run(new Database()));
}
