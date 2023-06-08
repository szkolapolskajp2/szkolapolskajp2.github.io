const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
const getHtml = (
  child, // {name, lastName, dob, pob, klasa, class, address},
  mainParent, // {name, lastName, phone, email},
  otherParent, // {name, lastName, phone, email},
  question // {religion, attendedAlready, polishLevel, mediaPermission, emergencyContact, additional }
) => `
<body>
  <style>
    body {margin: 0;width: 794px;}
    .form {padding: 30px;}
    .form-header {text-align: center; margin-left: 40px}
    .form-sign {display: flex;}
    .form-row { margin-bottom: 18px;}
    .form-qr {position:absolute;top:40px;left:30px;}
  </style>
  <div class="form">
    <div class="form-header">
      <h1>KARTA REJESTRACYJNA</h1>
      <h2>Szkoła Polska im. Jana Pawła II</h2>
      <span>200 Broadhead Ave. East Stroudsburg, PA 18301</span>
      <br/>
      <span>2023-2024</span>
    </div>
    <br /><br />
    <div>
      <div class="form-row">Nazwisko i imię ucznia: <b>${child.lastName}, ${
  child.name
}</b></div>
      <div class="form-row">Data i miejsce urodzenia: <b>${child.dob} ${
  child.pob
}</b></div>
      <br/>
      <div class="form-row">Wiek ucznia: <b>${getAge(child.dob)}</b></div>
      <div class="form-row">Klasa w szkole polskiej: <b>${child.klasa}</b></div>
      <div class="form-row">Klasa w szkole amerykańskiej: <b>${child.class}</b></div>
      </br>
      <div class="form-row">Czy dziecko uczęszczało wcześniej do polskiej szkoły?: <b>${
        question.attendedAlready
      }</b></div>
      <div class="form-row">Imiona rodziców lub opiekunów: <b>${
        mainParent.name
      } ${mainParent.lastName}, ${otherParent.name} ${
  otherParent.lastName
}</b></div>
      <div class="form-row">Numery telefonu: <b>${mainParent.phone}, ${
  otherParent.phone
}</b></div>
      <div class="form-row">E-mail: <b>${mainParent.email}, ${
  otherParent.email
}</b></div>
      <div class="form-row">Adres zamieszkania: <b>${child.address}</b></div>
      <div class="form-row">Kontakt w razie konieczności: <b>${
        question.emergencyContact
      }</b></div>
      <div class="form-row">Znajomość języka polskiego ucznia: <b>${
        question.polishLevel
      }</b></div>
      <div class="form-row">Dodatkowe informacje o dziecku: <b>${
        question.additional
      }</b></div>
      <div class="form-row">Czy dziecko będzie uczęszczało na zajęcia z religii?: <b>${
        question.religion
      }</b></div>
      <div class="form-row">
        Wyrażam zgodę na zamieszczanie zdjęć mojego dziecka w mediach szkolnych
        i innych publikacjach dotyczących szkoły: <b>${
          question.mediaPermission
        }</b>
      </div>

      <div class="form-row">Podpis rodziców lub opiekunów</div>
      <br /><br />
      <div class="form-sign">
        <span style="flex: 6; border-bottom: 1px dotted black;"></span>
        <span style="flex: 1; text-align: end;">Data:</span>
        <span style="flex: 2; border-bottom: 1px dotted black;"></span>
      </div>
    </div>
  </div>
</body>
`;
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

  const obj = arr.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});

  let child = {
    name: obj.firstName,
    lastName: obj.lastName,
    dob: obj.dob,
    pob: obj.pob,
    class: obj.ASchoolGrade,
    klasa: obj.PSchoolGrade,
    address: [obj.Address, obj.CityState, obj.zipCode].join(", "),
  };
  let parent1 = {
    name: obj.parent1Name,
    lastName: obj.parent1LastName,
    phone: obj.parent1Tel,
    email: obj.parent1Email,
  };
  let parent2 = {
    name: obj.parent2Name,
    lastName: obj.parent2LastName,
    phone: obj.parent2Tel,
    email: obj.parent2Email,
  };
  let questions = {
    attendedAlready: obj.attendedAlready,
    religion: obj.religion,
    polishLevel: obj.polishLevel,
    additional: obj.additional,
    mediaPermission: obj.mediaPermission,
    emergencyContact: obj.emergencyContact,
  };

  const div = $(document.createElement("DIV")).qrcode({
    width: 164,
    height: 164,
    text: arr.map((a) => a.value).join(","),
  })[0];
  div.className = "form-qr";

  console.log(getHtml(child, parent1, parent2, questions));

  var winPrint = window.open(
    window.location.origin,
    "DescriptiveWindowName",
    "left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0"
  );

  winPrint.document.write(getHtml(child, parent1, parent2, questions));
  winPrint.document.body.append(div);
  winPrint.document.close();
  winPrint.focus();
  winPrint.print();
  winPrint.close();
  return false;
};
