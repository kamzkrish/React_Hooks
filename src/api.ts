export const productApi = (page: any) => {
  console.log("res.status, res.statusText");
  var options = {};
  const serializedOptions = JSON.stringify(options);
  return fetch(`/v1/products?page=${page}`, JSON.parse(serializedOptions))
    .then((res) => {
      return res.json();
    })
    .then((payload) => {
      return payload;
    })
    .catch((error) => {
      return error.text();
    });
};
export const productList = (args: any) => {
  const serializedOptions = JSON.stringify(args);
  return fetch(`/products`, JSON.parse(serializedOptions))
    .then((res) => {
      return res.json();
    })
    .then((payload) => {
      return payload;
    })
    .catch((error) => {
      return error.text();
    });
};
