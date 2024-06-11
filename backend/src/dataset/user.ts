import { permission } from "process";
import { User } from "./types";

const people: User[] = [
    {
        id: 1,
        name: "John Doe",
        birthdate: new Date("09/10/1988"),
        partner: 2
    },
    {
        id: 2,
        name: "Jane Doe",
        birthdate: new Date("02/15/1991"),
        partner: 1
    }
];

export default people;