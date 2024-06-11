import { User } from "../../dataset/types";
import people from "../../dataset/user";


export default {
    // The parent argument correspond to the current queried person.
    partner: (parent: User): User => people.find(person => person.id === parent.partner),
    age: (parent: User): number => Math.floor((new Date().getTime() - new Date(parent.birthdate).getTime()) / 31557600000)
    // 31557600000 = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours * 365.25 days
};