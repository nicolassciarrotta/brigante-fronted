
export const isRequired = (value) => !!value;

export const isEmail = (value) => {
  const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

export const minLength = (length) => (value) => {
  return value.length >= length;
};

export const isText = (value) => {
  const pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(value);
};

export const isTextOrNumber = (value) => {
  const pattern = /^[a-zA-Z0-9\s]+$/;
  return pattern.test(value);
};

export const isNumber = (value) => {
  const pattern = /^[0-9]+$/;
  return pattern.test(value);
};

export const isDNI = (value) => {
  const pattern = /^[0-9]{8,8}$/;
  return pattern.test(value);
};

export const isValidCuit = (cuit) => {
  const regex = /^\d{2}-\d{8}-\d{1,2}$/;
  return regex.test(cuit);
}
