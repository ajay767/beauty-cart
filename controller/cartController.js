const { nanoid } = require("nanoid");
const validator = require("validator");
const { purchaseOrder } = require("./../lib/purchaseOrder");
const { sales_tax } = require("./../lib/tax");
const cardValidator = require("card-validator");

exports.handleCheckout = async (req, res) => {
  try {
    const userData = req.body.user;
    const cartData = req.body.cart;

    const formData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      address: userData.address,
      city: userData.city,
      province: userData.province,
      email: userData.email,
    };

    const errorRes = {};

    if (
      !formData.firstName ||
      !validator.matches(formData.firstName, "^[a-zA-Z-'. ]+$")
    ) {
      errorRes["firstName"] = "Invalid first name";
    }

    if (
      !formData.lastName ||
      !validator.matches(formData.lastName, "^[a-zA-Z-'. ]+$")
    ) {
      errorRes["lastName"] = "Invalid last name";
    }

    if (!formData.email || !validator.isEmail(formData.email)) {
      errorRes["email"] = "Invalid email";
    }

    if (
      !formData.city ||
      !validator.matches(formData.city, "^[a-zA-Z',.s-]{1,25}$")
    ) {
      errorRes["city"] = "Invalid city";
    }

    if (
      !formData.address ||
      !validator.matches(formData.address, "^(w*s*[#-,/.()&]*)+")
    ) {
      errorRes["address"] = "Invalid address";
    }

    if (!formData.mobile || !validator.isMobilePhone(formData.mobile)) {
      errorRes["mobile"] = "Invalid mobile";
    }

    if (!formData.province) {
      errorRes["province"] = "Invalid province";
    }

    if (Object.keys(errorRes).length >= 1) {
      return res.status(200).json({
        status: false,
        error: errorRes,
        message: "User form data invalid",
      });
    }

    Object.keys(formData).forEach((el) => (errorRes[el] = ""));

    let isCartEmpty = true;

    cartData.forEach((el) => {
      if (el.quantity > 0) {
        isCartEmpty = false;
        return;
      }
    });

    let totalAmount = 0;
    cartData.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    if (isCartEmpty || totalAmount < 10) {
      return res.status(200).json({
        status: false,
        error: errorRes,
        message: "Order cannot be placed, minimum purchase order is of $10",
      });
    }
    const orderId = nanoid();
    purchaseOrder[orderId] = req.body;

    res.status(200).json({
      status: "success",
      orderId,
      message: "Order ID created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something bad happened", status: false });
  }
};

exports.handlePayment = (req, res) => {
  const data = purchaseOrder[req.params.orderId];
  if (!data) {
    return res.redirect("/");
  }
  console.log(data);
  let totalAmount = 0;

  data.cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  let tax = 0;
  Object.keys(sales_tax).filter((el) => {
    if (sales_tax[el].name === data.user.province) {
      tax = sales_tax[el].taxes[0].tax;
      return;
    }
  });

  data["totalAmount"] = `$ ${totalAmount}`;
  data["totalTax"] = `$ ${tax}`;
  data["totalPayble"] = `$ ${tax + totalAmount}`;
  console.log({ data: data, orderId: req.params.orderId });
  res.render("payment", { data: data, orderId: req.params.orderId });
};

exports.handleBooking = (req, res) => {
  const { fullName, cardNumber, cvv, expiryDate, orderId } = req.body;
  const errorRes = {};

  if (!cardValidator.cardholderName(fullName).isValid) {
    errorRes["fullName"] = "Invalid full name";
  }

  if (!cardValidator.number(cardNumber).isValid) {
    errorRes["cardNumber"] = "Invalid card number";
  }

  if (!cardValidator.cvv(cvv).isValid) {
    errorRes["cvv"] = "Invalid cvv";
  }

  if (!cardValidator.expirationDate(expiryDate).isValid) {
    errorRes["expiryDate"] = "Invalid card expiry";
  }

  if (Object.keys(errorRes).length >= 1) {
    return res.status(200).json({
      status: false,
      error: errorRes,

      message: "User form data invalid",
    });
  }

  res.status(200).json({
    status: true,
    message: "Payment successfull!",
    receipt: orderId,
  });
};
