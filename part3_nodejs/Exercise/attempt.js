async function service() {
  const customer = await getCustomer(1);
  console.log("Customer:", customer);
  if (customer.isGold) {
    const topMovies = await getTopMovies();
    console.log("Top movies:", topMovies);
    await sendEmail(customer.email, topMovies);
    console.log("Sent emails");
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    });
  }, 4000);
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {});
  }, 500);
}

service();
