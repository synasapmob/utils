import { describe, expect, it } from "@jest/globals";
import { getCookie } from "utils/utils.cookie";
import { convertHex, formatUnitSI } from "utils/index";

describe("index", () => {
  it("convertHex should work with arguments", () => {
    const percents = [
      0.01, // 1%
      0.05, // 5%
      0.1, // 10%
      0.5, // 50%
      1, // 100%
    ];

    for (let i = 0; i < percents.length; i++) {
      const rgba = `rgba(255, 255, 255, ${percents[i]})`;

      expect(convertHex("#ffffff", percents[i])).toBe(rgba);
    }
  });

  it("formatUnitSI should work with arguments", () => {
    const units = [
      [1, 100, 999], // nothing
      [1e3, 1e4, 1e5, 1e6 - 1], // K
      [1e6, 1e7, 1e8, 1e9 - 1], // M
      [1e9, 1e10, 1e11, 1e12 - 1], // G
      [1e12, 1e13, 1e14, 1e15 - 1], // T
      [1e15, 1e16, 1e17, 1e18 - 100], // P
      [1e18, 1e19, 1e20], // E
    ];

    units.forEach((meta) => {
      for (let i = 0; i < meta.length; i++) {
        const ok = formatUnitSI(meta[i]);
        console.log("ok", ok);
        // console.log("formatUnitSI(units[i])", formatUnitSI(units[i]));
        // expect(formatUnitSI(units[i])).toBe(units[i]);
      }
    });
  });
});
