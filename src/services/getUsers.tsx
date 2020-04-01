import { Users } from "../types/Users";

export async function getUsers(): Promise<Users[]> {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');
  return await resp.json();
}
