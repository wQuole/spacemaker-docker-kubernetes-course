const app = require("./app");

console.log("Starting server");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
