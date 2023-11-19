export function handlerNumber(value: string) {
  return isNaN(Number(value)) ? undefined : Number(value);
}

export function handlerBoolean(value: string) {
  return value === 'true' || value === 'false' ? value === 'true' : undefined;
}

export const EmailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

export const isEmail = (value: string) => EmailReg.test(value);

export function getNumUID(digits = 8) {
  return Math.floor(Math.random() * Math.pow(10, digits - 1));
}
