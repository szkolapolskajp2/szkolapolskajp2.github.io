const stringHash = (str) => {
  let hash = 0;
  let chr;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString("36");
};

const getAge = (birthDate) => {
  // get age on september 1st of current year. rounded to 10ths
  const date = new Date(`9/1/${new Date().getFullYear()}`);
  return (
    Math.round((date.getTime() - new Date(birthDate).getTime()) / 3155673600) /
    10
  );
};
const getHtml = (
  child, // {name, lastName, dob, pob, klasa, class, address},
  mainParent, // {name, lastName, phone, email},
  otherParent, // {name, lastName, phone, email},
  question, // {religion, attendedAlready, polishLevel, mediaPermission, emergencyContact, additional }
  tylkoInfo = false
) => `
<div class="form-qr"></div>
<div class="form">
  ${
    tylkoInfo
      ? ""
      : `
  <div class="form-header">
    <h1>KARTA REJESTRACYJNA</h1>
    <h2>Szkoła Polska im. Jana Pawła II</h2>
    <span>1200 PA-390 Cresco, PA 18326</span>
    <br/>
    <span>2024-2025</span>
  </div>`
  }
  <br /><br />
  <div>
    <div class="form-row">Nazwisko i imię ucznia: <b>${child.lastName}, ${
  child.name
}</b></div>
    <div class="form-row">Data i miejsce urodzenia: <b>${child.dob} ${
  child.pob
}</b></div>
    <br/>
    <div class="form-row">Wiek ucznia we Wrześniu: <b>${getAge(
      child.dob
    )}</b></div>
    <div class="form-row">Klasa w szkole polskiej: <b>${child.klasa}</b></div>
    <div class="form-row">Klasa w szkole amerykańskiej: <b>${
      child.class
    }</b></div>
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
    ${
      tylkoInfo
        ? ""
        : `
    <div class="form-row">Podpis rodziców lub opiekunów</div>
    <br /><br />
    <div class="form-sign">
      <span style="flex: 6; border-bottom: 1px dotted black;"></span>
      <span style="flex: 1; text-align: end;">Data:</span>
      <span style="flex: 2; border-bottom: 1px dotted black;"></span>
    </div>`
    }
  </div>
</div>
`;

const serializeForm = (form) => {
  var arr = $(form).serializeArray();
  return arr.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});
  // console.log(arr);
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
};

const extractData = (obj) => {
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
  return {
    child,
    parent1,
    parent2,
    questions,
  };
};

const submitAndPrint = (form) => {
  const obj = serializeForm(form);
  const { child, parent1, parent2, questions } = extractData(obj);

  const base64encoded = encodeString(Object.values(obj).join("|"));
  const origin = "https://szkolapolskajp2.github.io"; //window.location.origin
  const path = `/print?${stringHash(base64encoded)}#${base64encoded}`;
  const div = $(document.createElement("DIV")).qrcode({
    width: 256,
    height: 256,
    text: origin + path,
  })[0];
  div.className = "form-qr";

  console.log(Object.values(obj).join("|"));

  if (window.print) {
    var winPrint = window.open(origin);

    winPrint.document.write(
      `<body style="padding: 30px;">
        <br/>
        <h5>Szkoła Polska im. Jana Pawła II 2024-2025</h5>
        <h3>${child.lastName}, ${child.name}; ${child.klasa} klasa</h3>
      <body>`
    );
    winPrint.document.body.prepend(div);
    winPrint.document.close();
    winPrint.focus();
    return false;
  } else {
    window.location.href = origin + path;
  }
};

function encodeString(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(binString);
}

function decode64(base64) {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}
