export function formatCurrency(price) {
  // const config = {
  //   style: "currency",
  //   currency: "VND",
  //   maximumFractionDigits: 9,
  // };
  // const formated = new Intl.NumberFormat("vi-VN", config).format(price);
  price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,')
  return price;
}
