import { to } from 'await-to-js';

const _to = async (promise) => {
  let err, res;

  [err, res] = await to(promise);

  if (err) return [err];

  return [null, res];

};
export { _to as to };

export function ReE (res, err, code) {
  // Error Web Response
  if (typeof err == "object" && typeof err.message != "undefined") {

    err = err.message;

  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json({ success: false, error: err });

}

export function ReS (res, data, code) {
  // Success Web Response
  let send_data = { success: true };

  if (typeof data == "object") {

    send_data = Object.assign(data, send_data); //merge the objects

  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);

}

export function TE (err_message, log) {
  // TE stands for Throw Error
  if (log === true) {

    console.error(err_message);

  }

  throw new Error(err_message);

}

function isNull(field) {

  return (
    field === undefined ||
    field === "null" ||
    field === "undefined" ||
    field === "" ||
    field === null
  );

}

const _isNull = isNull;
export { _isNull as isNull };

function isObject(obj) {

  return Object.prototype.toString.call(obj) === "[object Object]";

}

const _isObject = isObject;
export { _isObject as isObject };

function isEmpty(obj) {

  return !Object.keys(obj).length > 0;

}
const _isEmpty = isEmpty;
export { _isEmpty as isEmpty };

export function isEmail(email) {

  // const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const reg = /^[a-z0-9]+[.]?[a-z0-9]{0,30}@[a-z]+(\.(in|co|com|net)+)$/;

  if (reg.test(email)) {

    return true;

  } else {

    return false;

  }

}

export function firstLetterCap(data) {

  let normal = String(data).toLowerCase();

  if (normal.length < 0) {

    return '';

  } else {

    normal = normal[0].toUpperCase() + normal.slice(1).trim();

    return normal;
    
  }
}

export function findDuplicateValue(arr) {

  let dulicate = arr.filter((item, index) => arr.indexOf(item) != index);

  return dulicate;
  
}

