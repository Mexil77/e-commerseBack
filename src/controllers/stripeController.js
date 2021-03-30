stripeCtl = {};

const stripe = require("stripe")(process.env.STRIPE_ID);

stripeCtl.getCard = async (req, res) => {
  const { stripeId, stripeIdCard } = req.query;
  const card = await stripe.customers.retrieveSource(stripeId, stripeIdCard);
  res.json({ card });
};

stripeCtl.createAndSetCard = async (req, res) => {
  const { stripeId, token } = req.body;
  const card = await stripe.customers.createSource(stripeId, {
    source: token,
  });
  res.json({ idStripeCard: card.id });
};

stripeCtl.deleteCard = async (req, res) => {
  const { stripeId, stripeIdCard } = req.query;
  await stripe.customers.deleteSource(stripeId, stripeIdCard);
  res.json({ message: "card deleted" });
};

stripeCtl.payOrderWithCard = async (req, res) => {
  const { stripeId, stripeIdCard, amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "mxn",
    payment_method_types: ["card"],
    customer: stripeId,
    payment_method: stripeIdCard,
    confirm: true,
  });
  res.json({ stripeIdPaymentIntent: paymentIntent.id });
};

module.exports = stripeCtl;
