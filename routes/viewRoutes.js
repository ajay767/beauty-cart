const express = require("express");
const viewController = require("./../controller/viewController");
const cartController = require("./../controller/cartController");
const router = express.Router();

router.route("/").get(viewController.getProducts);
router
  .route("/checkout")
  .get(viewController.getCheckout)
  .post(cartController.handleCheckout);
router.route("/success/:id").get(viewController.orderSuccess);
router.route("/payment/:orderId").get(cartController.handlePayment);
router.route("/payment-confirmation").post(cartController.handleBooking);

module.exports = router;
