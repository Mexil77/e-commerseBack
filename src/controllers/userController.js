userCtl = {};

const bcrypt = require("bcrypt");
const User = require("../models/Users");
const stripe = require("stripe")(process.env.STRIPE_ID);

userCtl.signUpUser = async (req, res) => {
  const { email, password } = req.body;
  const find = await User.findOne({ email });
  if (find === null) {
    const passwordCrypt = await bcrypt.hashSync(password, 10);
    const customer = await stripe.customers.create({
      description: "Prueba de cliente",
      email,
    });
    const newUser = new User({
      email,
      password: passwordCrypt,
      name: { name: "", lastName: "", secondLastName: "" },
      birthDay: { day: 0, month: 0, year: 0 },
      phone: "",
      stripeId: customer.id,
    });
    await newUser.save();
    res.json({ signIn: newUser });
  } else {
    res.json({ signIn: false });
  }
};

userCtl.findUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    res.json({ signIn: false });
  } else {
    if (await bcrypt.compareSync(password, user.password)) {
      res.json({ signIn: user });
    }
    res.json({ signIn: false });
  }
};
userCtl.signOutUser = async (req, res) => {
  res.json({ message: "Sali" });
};

userCtl.getUser = async (req, res) => {
  const { idUser } = req.query;
  //const { idUser } = req.body;
  const user = await User.findById(idUser)
    .populate({
      path: "orders",
      populate: { path: "bagList.product" },
    })
    .populate({
      path: "wishLists",
      populate: { path: "productList" },
    })
    .populate({ path: "directions" })
    .populate({ path: "cards" });
  res.json(user);
};

userCtl.updateInfoUser = async (req, res) => {
  const { idUser, userInfo } = req.body;
  await User.findByIdAndUpdate(idUser, {
    name: userInfo.name,
    phone: userInfo.phone,
    birthDay: userInfo.birthDay,
  });
  res.json({ message: "Updated" });
};

userCtl.addBag = async (req, res) => {
  const { idUser, idProduct } = req.body;
  if (await findInUserBag(idUser, idProduct)) {
    res.json({ message: "Ya lo tienes agregado" });
  } else {
    await User.findByIdAndUpdate(idUser, {
      $push: { bag: [{ idProduct, cuantity: 1 }] },
    });
    res.json({ message: "Agregado" });
  }
};

findInUserBag = async (idUser, idProduct) => {
  return await User.exists({ _id: idUser, "bag.idProduct": idProduct });
};

userCtl.getBag = async (req, res) => {
  const { idUser } = req.query;
  const bagList = (await User.findById(idUser)).bag;
  res.json({ bagList });
};

userCtl.deleteBagItem = async (req, res) => {
  const { idUser, idProduct } = req.query;
  await User.findByIdAndUpdate(idUser, {
    $pull: { bag: { idProduct } },
  });
  res.json({ message: "deleted" });
};

userCtl.updateBag = async (req, res) => {
  const { idUser, bagList } = req.body;
  await User.findByIdAndUpdate(idUser, { bag: bagList });
  res.json({ message: "Updated" });
};

userCtl.deleteBag = async (req, res) => {
  const { idUser } = req.query;
  await User.findByIdAndUpdate(idUser, { bag: [] });
  res.json({ message: "delete" });
};

userCtl.addOrder = async (req, res) => {
  const { idUser, idOrder } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $push: { orders: idOrder },
  });
  res.json({ message: "Order added" });
};

userCtl.addDirection = async (req, res) => {
  const { idUser, idDirection } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $push: { directions: idDirection },
  });
  res.json({ message: "Direction added" });
};

userCtl.dropDirection = async (req, res) => {
  const { idUser, idDirection } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $pull: { directions: idDirection },
  });
  res.json({ message: "direction dropted" });
};

userCtl.addCard = async (req, res) => {
  const { idUser, idCard } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $push: { cards: idCard },
  });
  res.json({ message: "Card added" });
};

userCtl.dropCard = async (req, res) => {
  const { idUser, idCard } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $pull: { cards: idCard },
  });
  res.json({ message: "Card dropted" });
};

userCtl.addWishList = async (req, res) => {
  const { idUser, idWishList } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $push: { wishLists: idWishList },
  });
  res.json({ message: "Wish List added" });
};

userCtl.dropWishList = async (req, res) => {
  const { idUser, idWishList } = req.body;
  await User.findByIdAndUpdate(idUser, {
    $pull: { wishLists: idWishList },
  });
  res.json({ message: "Wish List pulled" });
};

module.exports = userCtl;
