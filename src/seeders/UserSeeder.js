import User from "../Models/UserModel.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const UserSeeder = async () => {
  const users = [];
  const positionOptions = [
    "6545b788c28c9078b83ddf59",
    "6545b788c28c9078b83ddf5a",
    "6545b788c28c9078b83ddf5b",
  ];
  const skillOptions = ["Backend Dev", "Frontend Dev"];

  for (let i = 0; i < 100; i++) {
    const password = faker.internet.password();
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = {
      name: faker.person.fullName(),
      password: hashPass,
      img: "",
      nip: faker.number.int(),
      date: faker.date.anytime(),
      address: {
        city: faker.location.city(),
        street: faker.location.street(),
        country: faker.location.country(),
      },
      email: faker.internet.email(),
      phone: faker.phone.number(),
      position: faker.helpers.arrayElement(positionOptions),
      entry_date: faker.date.anytime(),
      salary: faker.number.int(),
      skills: [faker.helpers.arrayElement(skillOptions), "Server Management"],
    };

    const adminAccount = {
      name: 'Daffa Fahrizal',
      nip: 'ej2eo2ueo2uouuuo2u323',
      role:'admin',
      password: await bcrypt.hash('daffa123', 10),
      email: 'daffa@gmail.com'
    }

    const userAccount = {
      name: 'Lia',
      nip: 'ej2sseo2ueo2uouuuo2u323',
      password: await bcrypt.hash('lia123', 10),
      email: 'lia@gmail.com'
    }
    users.push(newUser, adminAccount,userAccount);
  }

  await User.insertMany(users);
  console.log("User seeders success");
};

export default UserSeeder;
