const { products } = require("./../lib/products");
const { purchaseOrder } = require("./../lib/purchaseOrder");

exports.getProducts = (req, res) => {
  res.render("index", { products });
};

exports.getCheckout = (req, res) => {
  res.render("checkout");
};

exports.orderSuccess = (req, res) => {
  const purchaseId = req.params.id;

  if (!purchaseOrder[purchaseId]) {
    return res.redirect("/");
  }
  res.render("success", { data: purchaseOrder[purchaseId], id: purchaseId });
};
