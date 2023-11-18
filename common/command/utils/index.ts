import * as uuid from 'uuid';

export function handlerNumber(value: string) {
  return isNaN(Number(value)) ? undefined : Number(value);
}

export function handlerBoolean(value: string) {
  return value === 'true' || value === 'false' ? value === 'true' : undefined;
}

export const EmailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

export const isEmail = (value: string) => EmailReg.test(value);

export function getNumUID() {
  return parseInt(uuid.v4().replace(/-/g, ''), 16);
}
