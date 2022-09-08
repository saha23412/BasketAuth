
export default function isPlainObject(value) {
  return value && (!value.__proto__ || Object.getPrototypeOf(value).constructor.name === 'Object');
}
