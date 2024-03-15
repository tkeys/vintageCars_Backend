import { Role } from "../types/Role";
import { User } from "../types/User";

export const users: User[] = [
  {
    id: "d0a7b5b6-8f42-4e3b-98b5-9b3f9e7b451c",
    role: Role.Customer,
    email: "john.doe@example.com",
    // password: test123
    hashedPassword:
      "$2b$10$TDCF5RKv2ttM.X/ygaONf.QYP5TQl5nqcmwPz1zWJJKAi77Nmzm9W",
    userName: "jdoe22",
    firstName: "John",
    lastName: "Doe",
    banned: false,
  },
  {
    id: "aae0a1f9-159e-4b73-b5af-8d5c79c43d7e",
    role: Role.Admin,
    email: "jane.smith@example.com",
    // password: 123test
    hashedPassword:
      "$2b$10$bJjuT5e5rfVglnD1ePnEmeuGMdFMuVKhF13g8VK/RkHOP272zYgA.",
    userName: "janesmith",
    firstName: "Jane",
    lastName: "Smith",
    banned: true,
  },
  {
    id: "c07c3781-fd85-4c5f-9f7d-6f3a98f531c9",
    role: Role.Customer,
    email: "michael.jackson@example.com",
    // password: t1s2t3
    hashedPassword:
      "$2b$10$A4XeDl/Als0a2Ek9JDR/AuWELw3p0UrCPZILbGruAAEW07ET7kXC6",
    userName: "mjackson",
    firstName: "Michael",
    lastName: "Jackson",
    banned: false,
  },
];
