import resolveConfig from 'tailwindcss/resolveConfig';
 
export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}
// export const BASE_URL = "http://localhost:8000/graphql"; 
export const BASE_URL = "https://sb-main-backend-kuid.onrender.com/graphql" //"http://localhost:8000/graphql";   
export const BASE_URL2 = "https://sb-transactions-5tlj.onrender.com/deposit" //"http://localhost:9000/deposit"; 
export  const BASE_URL3 = "https://sb-transactions-5tlj.onrender.com/status";
export const BASE_URL4 = "https://sb-transactions-5tlj.onrender.com/withdraw";


export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style:"currency",
  currency: 'KSH',
  // maximumSignificantDigits: 3,
  notation:"standard",
}).format(value);
