// import { JWTResponse } from "packages/types";

/** 
  @function convertHex(color: string, opacity: number)
    - https://stackoverflow.com/a/7018987/16151303
  
  @exampe convertHex('#ffffff', 0.5) // rgba(255, 255, 255, 0.5)

  @description
        get position elements, 
        and then convert to 'base 16',
        finally added alpha,

*/
export const convertHex = (color: string, opacity: number) => {
  const [R, G, B, A] = [
    parseInt(color.substring(1, 3), 16),
    parseInt(color.substring(3, 5), 16),
    parseInt(color.substring(5, 7), 16),
    opacity,
  ];

  return `rgba(${R}, ${G}, ${B}, ${A})`;
};

/**
  @function formatUnitSI(number: number)
 
  @example formatUnitSI(1000, 1e6) // 1K

  @description 
    1. 
      initial [key, value] by method map
      key (exponent) = https://en.wikipedia.org/wiki/Exponentiation#Table_of_powers_of_decimal_digits
      value (SI prefixes) = https://en.wikipedia.org/wiki/International_System_of_Units#Prefixes
    
    2.
      just get numbers when input less than values of "map",
      after getting "lower bound of a set" I will use (toFixed) 3 digits,
      if number less than 'lower bound of a set' round number else return "1K"

    3. 
      attension:
      should -1 below 1e15, cause return 999.999M
      should -100 when 1e18, cause javascript can't handle the number is largest
 
*/
export const formatUnitSI = (
  number: number | string,
  digitBeginFormat = 1e3
) => {
  const map = [
    ["K", 1e3, 1e6],
    ["M", 1e6, 1e9],
    ["G", 1e9, 1e12],
    ["T", 1e12, 1e15],
    ["P", 1e15, 1e18],
    ["E", 1e18, 1e21],
    // ["Z", 1e21, 1e24],
    // ["Y", 1e24, 1e27],
    // ["R", 1e27, 1e30],
    // ["Q", 1e30, 1e33],
  ];

  for (const [key, value, should] of map) {
    if (Number(number) >= digitBeginFormat && Number(number) < Number(should)) {
      const format = String(Number(number) / Number(value));

      // regex to match three digits same after point decimal, 999.999
      if (/\.(\d)\1\1/.test(format)) {
        return `${format.substring(0, 7)}${key}`;
      }

      return `${format}${key}`;
    }
  }

  return number;
};

// // handler get decimal of number
// export function formatNumberDecimal(number: number | string) {
//   const decimal = 18;

//   return ethers.parseUnits(number.toString(), decimal);
// }

// // handler format 1000 to be 1.000
// export const formatNumber = (
//   number: number,
//   option?: Parameters<typeof Intl.NumberFormat>[1]
// ) => {
//   const isFloat = number < 0.009;

//   if (isFloat) return number;

//   return new Intl.NumberFormat("en-US", option).format(number);
// };

// /**
//   @function shorten(hash: string, length: number)
//     - Ex: hash = 6 (123n to 6)
//           length = 2

//     - summary:
//       get length of input (hash)
//       slice hash point start 0 that number will reviced 12 by input (hash)
//       identifying where middle it needs "..." string now we've 12...
//       step end slice at point last with recipe "123456".slice(-length) result should to be 56,
//       right now, compound we will have result equal 12..56
// */
// export const shorten = (hash: string, length = 6) => {
//   const prefix = hash.slice(0, length);
//   const middle = "...";
//   const suffixed = hash.slice(-length);

//   return prefix + middle + suffixed;
// };

// // function get link of explore TX
// export const getLinkExplore = (explore: string, tx: string) => {
//   const explorerUrl = new URL(explore);

//   return `${explorerUrl.origin}/tx/${tx}${explorerUrl.search}`;
// };

// // handler JWT for encode
// export const parseJWT = (token: string | undefined) => {
//   const arr = token?.split(".");
//   const base64Payload = (arr?.length || 0) > 1 ? arr?.[1] : undefined;

//   const payload = base64Payload ? Buffer.from(base64Payload, "base64") : "{}";

//   return JSON.parse(payload.toString()) as JWTResponse;
// };

// // function get gas for transaction
// export const estimateGas = async (tx: () => Promise<BigInt>) => {
//   let gas: BigInt;

//   try {
//     gas = await tx();
//   } catch (error) {
//     gas = ethers.toBigInt(300000);
//   }

//   return gas;
// };

// // set all key of object
// export const setObjectValue = (
//   obj: Record<any, any>,
//   value: string | null | undefined | number
// ) => {
//   const instance = obj;

//   Object.keys(instance).forEach((i) => (instance[i] = value));

//   return instance;
// };

// /*
//   swapObjectValue(
//     {
//       BG_1: 'BG_1',
//       BG_2: 'BG_2',
//     },
//     'BG_1',
//     'BG_2'
//   )

//   output:
//     {
//       BG_2: 'BG_2',
//       BG_1: 'BG_1',
//     }
// */
// export const swapObjectValue = (
//   obj: Record<any, any>,
//   from: string,
//   to: string
// ): Record<any, any> => {
//   const forkEntries = Object.entries(obj).map(([key, value]) => {
//     // begin swap "from" to be "to"
//     if (key === from) {
//       return { [to]: obj[to] || value };
//     }

//     // begin swap "to" to be "from"
//     if (key === to) {
//       return { [from]: obj[from] || value };
//     }

//     return { [key]: value };
//   });

//   return Object.assign({}, ...forkEntries);
// };

// // handler sum values of Object
// export const sumObjectValue = (obj: Record<any, any>) => {
//   const forkObject = Object.entries(obj)
//     .map(([, values]) => {
//       // why should return 1, because you can't multiply by 0 -> (10 * 0)
//       if (!values?.length) return 1;

//       return values.length;
//     })
//     .reduce((prev, current) => prev * current);

//   return forkObject;
// };

// // you can convert a units EM/REM/PX to be the number
// export const convertToWidth = (breakpoint: string) => {
//   const replaceToEmpty = breakpoint
//     // if em
//     .replace("em", "")
//     // if rem
//     .replace("rem", "")
//     // if px
//     .replace("px", "");

//   return Number(replaceToEmpty);
// };

// // use service third-party to get IMAGE
// export const GetImageService = (
//   id: string | undefined,
//   getAssets: string | undefined | null,
//   type: "nft" | "collection" | "animation" | "studio_media"
// ) => {
//   if (type === "nft") {
//     return `${getAssets}/nft-assets/image/${id}`;
//   }
//   if (type === "animation") {
//     return `${getAssets}/nft-assets/animation/${id}`;
//   }

//   if (type === "collection") {
//     return `${getAssets}/collection-assets/avatar/${id}`;
//   }

//   if (type === "studio_media") {
//     return `${getAssets}/studio/api/media/${id}`;
//   }

//   return "null";
// };

// // this function handler clear memory of file
// export const clearObjectURL = (file: File | undefined) => {
//   if (!file) return undefined;

//   const preview = URL.createObjectURL(file);

//   // to clear memory
//   setTimeout(() => URL.revokeObjectURL(preview), 1000);

//   return preview;
// };

// /*
//   description: helper get message from catch
//     1. MetaMask Code: ACTION_REJECTED
//     2. contract execution reverted
//     3. Axios
//     4. Message Error
// */
// export const catchMessage = (error: any) => {
//   console.log("catch error", error);

//   if (error?.code === "ACTION_REJECTED") {
//     return "User Rejected Action !";
//   }

//   if (error?.message?.includes("execution reverted")) {
//     return error?.message;
//   }

//   if (error?.name === "AxiosError") {
//     return error.response.data.errors.message.toString();
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   return error;
// };

// // this function force always number
// export const forceToNumber = (argument: number | string | null | undefined) => {
//   if (typeof argument === "string") {
//     argument = Number(argument);
//   }

//   if (Number.isNaN(argument)) {
//     argument = 0;
//   }

//   if (typeof argument !== "number") {
//     argument = 0;
//   }

//   return argument;
// };

// // this function compare hex exactly
// export const compareHexString = (
//   x: string | undefined,
//   y: string | undefined
// ) => {
//   if (!x || !y) return false;

//   if (x && y) return BigInt(x) === BigInt(y);

//   return false;
// };

// // convert string to symbol as like "Hello World" to be "HW"
// export const getSymbolFromString = (value: string) => {
//   if (typeof value !== "string" || value.trim().length === 0) {
//     return "";
//   }

//   const words = value.trim().split(/\W+/);

//   let symbol = "";

//   words.forEach((word) => {
//     if (word.length > 0) {
//       symbol += word.charAt(0).toUpperCase();
//     }
//   });

//   return symbol.substring(0, 6);
// };

// /*
//   - get sum of array and return total number
//     result [1, 2, 3] // 6
// */
// export const sumNumber = (numbers: number[]) => {
//   const NOT_NaN = 0;

//   const instance = numbers.reduce(
//     (prev, current) => (prev || NOT_NaN) + (current || NOT_NaN),
//     NOT_NaN
//   );

//   return instance;
// };

// /**
//   @function getPercentage(N: number, Y: number)
//     - Ex: N = 10 (students)
//           Y = 100 (total of class)

//     @description
//       attension we don't need duplicate 00%, meaning 10.00% should be 10%

//     @returns 10%
// */
// export const getPercentage = (
//   x: number,
//   y: number,
//   suffix?: "number" | "percent"
// ) => {
//   const percentage = (x / y) * 100;
//   const rounded = Math.round(percentage);
//   const type = suffix === "number" ? "" : "%";

//   if (percentage <= 0) return `0${type}`;
//   if (percentage >= 100) return `100${type}`;
//   if (percentage === rounded) return `${rounded}${type}`;

//   return `${percentage.toFixed(2)}${type}`;
// };

// /**
//   @description
//     true:
//       check **meta** if found we'll check last text it's number -> plus 1 else add 1

//     false:
//       if not found and default return **default_name**

//   @returns ['Untitled_1', 'Untitled_2', 'Untitled_3']
// */
// export const coppyText = (
//   array: string[],
//   default_name = utilsConstants.NONE_NAME
// ) => {
//   const instance = array.map((meta) => {
//     // check name is already exist
//     if (meta.includes(default_name)) {
//       const toArray = meta.split("_"); // Untitled_10 -> ['Untitled', '10']
//       const lastText = toArray[toArray.length - 1];

//       if (Number.isNaN(Number(lastText))) {
//         return `${default_name}_1`;
//       }

//       return `${default_name}_${Number(lastText) + 1}`;
//     }

//     return default_name;
//   });

//   return instance;
// };

// // parse string to array with SSE (Server-Sent Events)
// export const parseSSE = (response: string, prefix: string) => {
//   const meta = response
//     /*
//         convert string to arrays:
//           1: data: Record<object, object>
//           2: ""
//       */
//     .split("\n")
//     /*
//         necessary to remove empty lines:
//           1: data: Record<object, object>
//           2: data: Record<object, object>
//       */
//     .filter((line) => line.startsWith(prefix))
//     /*
//         finally parse the string to object and return in array
//       */
//     .map((meta) => JSON.parse(meta.replace(prefix, "")));

//   return meta;
// };

// // handler get patterns to append to nextConfig
// export const generateRemotePatterns = () => {
//   const remotePatterns: Array<{
//     protocol: string; // Set the protocol (http or https)
//     hostname: string; // The hostname of your remote image source
//     port: string; // Leave this empty if there's no specific port
//     pathname: string; // Use a wildcard (**) to match all images in this path
//   }> = [];

//   Object.values(utilsConstants.ENVINROMENTS).forEach(({ API, ASSETS }) => {
//     // Extract API
//     {
//       const [protocol, hostname] = API.split("://");
//       const isReady = remotePatterns.some((meta) => meta.hostname === hostname);

//       if (!isReady) {
//         remotePatterns.push({
//           protocol,
//           hostname,
//           port: "",
//           pathname: "/studio/api/media/**",
//         });
//       }
//     }

//     // Extract ASSETS
//     {
//       const [protocol, hostname] = ASSETS.split("://");

//       const isReady = remotePatterns.some((meta) => meta.hostname === hostname);

//       if (!isReady) {
//         remotePatterns.push({
//           protocol,
//           hostname,
//           port: "",
//           pathname:
//             "/(nfts-assets/avatar|nfts-assets/animation|collection-assets/avatar)/**",
//         });
//       }
//     }
//   });

//   return remotePatterns;
// };

// // handler catch property entry
// export const catchProperties = (obj: Record<string, boolean>) => {
//   for (const [key, conditional] of Object.entries(obj)) {
//     if (conditional) return key;
//   }
// };

// const RANDOM_CHARACTER = () => {
//   return (Math.random() + 1).toString(6).substring(7);
// };
