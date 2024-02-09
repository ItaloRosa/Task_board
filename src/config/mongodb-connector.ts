import { Db, MongoClient } from "mongodb";

let singleton: Db;

export default async (): Promise<Db> => {
    if (singleton) return singleton;

    const client = new MongoClient(`mongodb+srv://italotadeuster:rpYdIyusWO5h5sG8@taskapp.jvarcnk.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    singleton = client.db('taskapp');

    return singleton;
}