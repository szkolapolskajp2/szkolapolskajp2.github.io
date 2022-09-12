let encrytpedFile;
// prettier-ignore
const letterMap = {ą: "a",  ć: "c",  ę: "e",  ł: "l",  ń: "n",  ó: "o",  ś: "s",  ź: "z",  ż: "z"};

const decrypt = (text, passphrase) =>
  CryptoJS.AES.decrypt(
    text,
    passphrase
      .toLowerCase()
      .split("")
      .map((letter) => letterMap[letter] || letter)
      .join("")
  ).toString(CryptoJS.enc.Utf8);

const app = Vue.createApp({
  data() {
    return {
      klasa: "",
      haslo: "",
      data: null,
    };
  },
  methods: {
    async fetchClass() {
      const res =
        encrytpedFile ||
        (await fetch("encrypted.json").then((res) => res.json()));
      encrytpedFile = res;

      try {
        this.data = JSON.parse(decrypt(res[this.klasa], this.haslo));
        localStorage.setItem(this.klasa, this.haslo);
        console.log(JSON.parse(decrypt(res[this.klasa], this.haslo)));
      } catch (e) {
        console.error("zle haslo", e);
        this.data = null;
      }
    },
    onClassChange() {
      this.haslo = localStorage.getItem(this.klasa);
      this.fetchClass();
    },
    copyToClipboard(str) {
      if (!str) return;
      let fakeElem = document.createElement('textarea');
      fakeElem.style.fontSize = '12pt';
      fakeElem.style.border = '0';
      fakeElem.style.padding = '0';
      fakeElem.style.margin = '0';
      fakeElem.style.position = 'absolute';
      fakeElem.style['left'] = '-9999px';
      fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
      fakeElem.setAttribute('readonly', '');
      fakeElem.value = str;
      document.body.appendChild(fakeElem);
      fakeElem.select();
      try {
        document.execCommand('copy');
      } catch (err) {}

      document.body.removeChild(fakeElem);
    }
  },
});

app.mount("#app");
