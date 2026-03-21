// auto-generated please update albums{num}.txt
var albums1 = [
["2025-2026/25. Medale KEN",
"AF1QipMom7s6ex_-tELxECrMD0ingRvV--GuHP01_ccpUOHVmSWfP6aAmYcQLIYIlHMy_g?key=cmt6RzNRTkRJUWNTczJIOGxCTE9ZNk4zRGdwSUlB",
"AP1GczMvOUH2-2gYUi2lV9orgCf4tp1-JeRSXn53ZkLbhlnCqhc6lLVkbBinn_zvL6SFJY78nEDB5JgecIaH3ZLIO37tHXpTjgSHlTuJZrDnm5GuEfh5da5F=w600-h315-p-k"],
["2025-2026/26. Zabawa Karnawałowa na rolkach i wrotkach (klasy starsze)",
"AF1QipORFAer5_MfOM5AHW9Np6vhq8nXEPSCZVJ-RHkC4cKmVgrZc0a8Oj2EYhGbqjZH8A?key=WFJwMmZfRWNNc19Ncm9QYTA1TTJ0ejBFWjlrNThB",
"AP1GczMRRo0yibDiax95jg3-pwUUjqiYoC9Er4qx7135sNBtIirY9ZN2zUaxqx9NSehYiIwFRGhvwaGsZMHcpkpROOSniJHnRJDJIKUMzKvvj1dAnmJae79f=w600-h315-p-k"],
["2025-2026/27. Zabawa Karnawałowa na rolkachach i wrotkach (klasy młodsze)",
"AF1QipMWogDtxUXNLNWg7t2RdL65lk0Gp8F59Z4xpfpwLWNx0WYI5vpx-AQZZzR2waToMw?key=N1RFeHV6a0w0Nnc2Y0pLNXZqWnVzNkxHSFk3TEJn",
"AP1GczNcxTu-QrmEDlpXddSgpTizwHX8EAfzfzI-zH1KHrenJDgbFAqAxWqU0gJA1zzK9eBWJCMZJ-Iqu9qX2D9AP5o4UMHxzgkmNJSj53E9EuwPWBTJJwl5=w600-h315-p-k"],
["2025-2026/28.WOŚP",
"AF1QipO9dNrssdXnIc0uidiL2lNZ64gpr5cEFsHutnuxA0ZLeR46ybA0dy13Ci2Yiw5Feg?key=LXVtMmFtdENXN3BnWDlZWFdaRDNkMlNQYXRvUFZB",
"AP1GczOUBnl-_xBBBxYHqmjH2ejyaQkKCLwSdOdkpIMWbBi75as1aRJcgXFZ1gmN4_H8e2MOFjGaydzH0KlhhJynPLEWAre4-m0_dPFEXDDtyfCI6gZ1PduN=w600-h315-p-k"],
["2025-2026/29. Studniówka 2026",
"AF1QipOlAqkG-V2xH1WMtVOW41cRADHA8m_sfrrkY8HzXSK4ggASsjFbQw1Tv-WbZYgaDA?key=bUx6RElxeXBxWHBkU2poUHB0MHo1X0xudTJRNXNn",
"AP1GczNJVMxWCHKWuReF2TJITxIWE3kk6siG9HQi8aqnEPKFkz60B_80QuuKsm2yvOO7gMEdZrcHh8xQs-5esvtj8iS3sobg4TIJ_IdUqbE7QgHnfXcvDdJa=w600-h315-p-k"],
["2025-2026/30. Walentynki-Zabawa ostatkowa",
"AF1QipMwJViYUVdnnostGq5eJc2BAE5wHA6rAoM7w9rD5carC6zKoENgzZpDVvKBEdSKlQ?key=alllSEhnOWhvYzhXVGRrTFoyckdQcy1NRG44bnJR",
"AP1GczPcn1C14tDxaG9NrR0Mo9PPrBJqy74bXLDCTGmG4d5-USBjk9icBaaYLnws447sGCsStw03B6YCGCy1FM_Rb0CDnzKedJ7F4cRWFHSfe-sfr5VE-3wn=w600-h315-p-k"],
["2025-2026/31. Walentynki w klasie zerowej",
"AF1QipN6k1YCvZVcHzQTMKOxiiVZNt4NsgXpOp3lq-uU5iLfjD-OomYy3MJfDCfCVAjicQ?key=c2V3WnU5UTIwYlFyQXJLNE92dGctX3ZwT1ZzRC13",
"AP1GczN0XCGpagRw7CIorYeTnHB8GZOsmJsgJwokKYhw_0ljRzw_iTrq5skYl-a-m2pyOZ4ciS1r4XY1CFzbdfAbAc6h-_JN7D9gsvjdJYnBmfwUZjk6D7hv=w600-h315-p-k"],
].map(([title, albumUrl, coverUrl]) => {
    const [year, index, name] = title.split(/\/( *[0-9]{1,2}\. *)/g)
    const parsedEntry = [
      name ? `${year}/${name}` : year,
      'https://photos.google.com/share/' + albumUrl,
      'https://lh3.googleusercontent.com/pw/' + coverUrl.replace(/=.*$/g, '=s222-p-k-no')
    ]
    parsedEntry['index'] = parseInt(index) + 1 || 100;
    return parsedEntry;
})
