import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    const { nip, name } = req.query;
    const filter = {};

    if (nip) {
      filter.nip = nip;
    }

    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    }

    const users = await User.find(filter);
    res.status(200).json(users);
};

export const getUser = async (req, res) => {
  const User = await User.findById(req.params.id);
  if (!User) res.status(404).json({ message: "User not found" });

  res.status(200).json(User);
};

export const Register = async (req, res) => {
  const { name, nip, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Password is not match",
    });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      nip: nip,
      email: email,
      password: hashPass,
    });

    res.status(200).json({
      message: "Success Register",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const Login = async (req, res) => {
  const { nip, email, password } = req.body;

  const user = await User.findOne({ nip });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (nip !== user.nip) {
      res.status(404).json({ message: "NIP not found" });
    } else if (!isMatch) {
      res.status(404).json({ message: "password false" });
    } else if (email !== user.email) {
      res.status(404).json({ message: "email false" });
    }

    req.session.user_id = user._id;
    req.session.user_role = user.role;
  }


  res.status(200).json({
    message: "Success Login",
  });
};

export const updateUser = async (req, res) => {
  const {
    name,
    img,
    nip,
    date,
    address,
    email,
    phone,
    position,
    entry_date,
    salary,
    skills,
  } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ message: "User not found" });

  try {
    user.name = name;
    user.img = img;
    user.nip = nip;
    user.date = date;
    user.address = address;
    user.email = email;
    user.phone = phone;
    user.position = position;
    user.entry_date = entry_date;
    user.salary = salary;
    user.skills = skills;

    await user.save();
    res.status(200).json({
      message: "Success updated",
      data: user,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const Logout = async (req, res) => {
  req.session.destroy()
  res.status(200).json({ message: "Success Logout" });
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ message: "User not found" });
  await user.deleteOne({});

  res.status(200).json({ message: "Success deleted" });
};
