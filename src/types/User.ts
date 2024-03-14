export interface User {
  id: string;
  email: string;
  userName: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role: string;
  banned: boolean;
}
