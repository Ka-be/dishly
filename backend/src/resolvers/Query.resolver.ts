import { User } from "../dataset/types";
import user from "../dataset/user";

export default {
    hello: (): string => "Hello world!",
    people: (): User[] => user,
    person: (_, args) => user.find(person => person.id === args.id)
}