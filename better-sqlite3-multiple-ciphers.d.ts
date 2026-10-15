declare module "better-sqlite3-multiple-ciphers" {
  import Database from "better-sqlite3";

  interface EncryptedDatabase extends Database.Database {
    key(key: Buffer): number;
    rekey(key: Buffer): number;
  }

  interface DatabaseConstructor {
    new (filename: string, options?: Database.Options): EncryptedDatabase;
    (filename: string, options?: Database.Options): EncryptedDatabase;
    prototype: EncryptedDatabase;
  }

  const Sqlite: DatabaseConstructor;
  export default Sqlite;
}
