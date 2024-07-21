export enum Roles {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
}
