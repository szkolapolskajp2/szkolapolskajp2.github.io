function maybeValidEmail (email) { return /^\S+@\S+\.\S+$/.test(email); }

const submitAndDisable = () => {
  const email = $("#Newsletter input").val();

  // check if valid email
  const valid = maybeValidEmail(email);

  if (valid) {
    $("#Newsletter").prop("disabled", true);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSc07VewIRBF-n3X3iihbsG4ulZaYqGQdAhL056t3ggaTX61gQ/formResponse",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: `entry.1045781291=${encodeURIComponent(
          email
        )}&fvv=1&partialResponse=%5Bnull%2Cnull%2C%22-716716557610372107%22%5D&pageHistory=0&fbzx=-716716557610372107`,
        method: "POST",
        mode: "no-cors",
        credentials: "include",
      }
    ).then(() => {
      $("#Newsletter input").val("Dziekujemy za zapisanie!");
    });
  }
};
