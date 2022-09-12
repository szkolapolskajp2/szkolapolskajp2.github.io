const CryptoJS = require("crypto-js");
const fs = require("fs");
const passwords = require("./hasla.json");
const data = fs.readFileSync("./data.unencrypted", "utf8").trim().split("\n");

const encryptWithAES = (text, passphrase) =>
  CryptoJS.AES.encrypt(text, passphrase).toString();

const encrypted = {};
const parsed = {
  classMothers: [],
  "-ps-": [],
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
};

for (const line of data) {
  const [grade, ...rest] = line.split("|").map(a => a.trim());
  const el = {
    grade,
    studentName: rest[0],
    parentName: rest[1],
    parentNum: rest[2],
    parentEmail: rest[3],
    classMother: rest[4] === "t",
  };
  parsed[grade].push(el);
  el.classMother && parsed.classMothers.push(el);
}

for (const [grade, password] of Object.entries(passwords)) {
  encrypted[grade] = encryptWithAES(
    JSON.stringify({
      parents: parsed[grade].sort((a, b) => a.studentName.localeCompare(b.studentName)),
      classMothers: parsed.classMothers.sort((a, b) => a.grade.localeCompare(b.grade)),
    }),
    password
  );
}

fs.writeFileSync("./encrypted.json", JSON.stringify(encrypted), { flag: "w" });
