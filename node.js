const formatUnitSI = (number, digitBeginFormat = 1e3) => {
  const map = [
    ["K", 1e3, 1e6],
    ["M", 1e6, 1e9],
    ["G", 1e9, 1e12],
    ["T", 1e12, 1e15],
    ["P", 1e15, 1e18],
    ["E", 1e18, 1e21],
    ["Z", 1e21, 1e24],
    ["Y", 1e24, 1e27],
    ["R", 1e27, 1e30],
    ["Q", 1e30, 1e33],
  ];

  for (const [key, value, should] of map) {
    if (number >= digitBeginFormat && number < should) {
      const format = new Intl.NumberFormat(undefined, {
        maximumSignificantDigits: 4,
      }).format(number / value);

      return `${format}${key}`;
    }
  }

  return number;
};

const units = [
  1, 100, 999, 1000, 1001, 1010, 1100,
  //
  1000000, 1300000, 130320000, 1320556003200,
  // 999, 1200, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24, 1e21, 1e24, 1e27, 1e30,
  // //
];

for (let i = 0; i < units.length; i++) {
  const ok = formatUnitSI(units[i]);
  console.log("ok", ok);
}
