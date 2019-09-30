import { Users } from "../types/Users";
export async function getUsers(): Promise<Users[]> {
  return await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
}
