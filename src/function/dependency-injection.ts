type User = {
  id: string;
  name: string;
  email: string;
};

class Database {
  constructor(private readonly option?: any) {}
  async exec<T>(query: string): Promise<T> {
    // dummy exec
    void query, void this.option;
    return;
  }
}

type DbTask<T> = (db: Database) => Promise<T>;

function getUserById(id: string): (db: Database) => Promise<User> {
  return async (db: Database) => {
    return await db.exec<User>(id);
  };
}
