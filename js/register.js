const submitAndPrint = (form) => {
  /** submit data here */

  var arr = $(form).serializeArray();
  console.log(arr);
  // [
  //   {
  //     name: "firstName",
  //     value: "Arek",
  //   },
  //   {
  //     name: "ASchoolGrade",
  //     value: "NA",
  //   },
  //   {
  //     name: "Address",
  //     value: "124 Jackson dr",
  //   },
  //   {
  //     name: "parent1Name",
  //     value: "Konrad",
  //   },
  //   {
  //     name: "parent1Tel",
  //     value: "2018005988",
  //   },
  //   {
  //     name: "parent2Name",
  //     value: "",
  //   },
  //   {
  //     name: "parent2Tel",
  //     value: "",
  //   },
  //   {
  //     name: "lastName",
  //     value: "Dudziak",
  //   },
  //   {
  //     name: "PSchoolGrade",
  //     value: "ps",
  //   },
  //   {
  //     name: "CityState",
  //     value: "East Stroudsburg",
  //   },
  //   {
  //     name: "parent1LastName",
  //     value: "Dudziak",
  //   },
  //   {
  //     name: "parent1Email",
  //     value: "konrad.dudziak@gmail.com",
  //   },
  //   {
  //     name: "parent2LastName",
  //     value: "",
  //   },
  //   {
  //     name: "parent2Email",
  //     value: "",
  //   },
  //   {
  //     name: "dob",
  //     value: "2018-07-25",
  //   },
  //   {
  //     name: "attendedAlready",
  //     value: "tak",
  //   },
  //   {
  //     name: "zipCode",
  //     value: "18302",
  //   },
  //   {
  //     name: "parent1Relation",
  //     value: "tata",
  //   },
  //   {
  //     name: "gk",
  //     value: "parent1",
  //   },
  //   {
  //     name: "parent2Relation",
  //     value: "tata",
  //   },
  // ];

  const div = $(document.createElement('DIV')).qrcode(JSON.stringify(arr))[0]

  var winPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0"
  );
  winPrint.document.write(
    `<body><title>Registration 2023-2024</title><br /><br />
      ${arr
        .map(({ name, value }) => `<h5>${name}: <b>${value}</b></h5>`)
        .join("")}
    </body>`
  );
  winPrint.document.body.append(div);
  winPrint.document.close();
  winPrint.focus();
  winPrint.print();
  winPrint.close();
};
