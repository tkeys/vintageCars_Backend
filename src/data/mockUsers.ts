import { User } from "../types/User";

export const users: User[] = [
  {
    id: "d0a7b5b6-8f42-4e3b-98b5-9b3f9e7b451c",
    role: "customer",
    email: "john.doe@example.com",
    hashedPassword: "johnsPassword123",
    userName: "jdoe22",
    firstName: "John",
    lastName: "Doe",
    banned: false,
  },
  {
    id: "aae0a1f9-159e-4b73-b5af-8d5c79c43d7e",
    role: "customer",
    email: "jane.smith@example.com",
    hashedPassword: "janesPassword456",
    userName: "janesmith",
    firstName: "Jane",
    lastName: "Smith",
    banned: true,
  },
  {
    id: "c07c3781-fd85-4c5f-9f7d-6f3a98f531c9",
    role: "customer",
    email: "michael.jackson@example.com",
    hashedPassword: "michaelsPassword789",
    userName: "mjackson",
    firstName: "Michael",
    lastName: "Jackson",
    banned: false,
  },
];
