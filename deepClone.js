function deepClone(value, hash = new WeakMap()) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (hash.has(value)) {
        return hash.get(value);
    }
    if (value instanceof Date) {
        return new Date(value);
    }
    if (value instanceof RegExp) {
        return new RegExp(value);
    }
    if (Array.isArray(value)) {
        const arr = [];
        hash.set(value, arr);
        value.forEach((item, index) => {
            arr[index] = deepClone(item, hash);
        });
        return arr;
    }
    const clonedObj = {};
    hash.set(value, clonedObj);

    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(value[key], hash);
        }
    }
    return clonedObj;
}
const obj = {
    name: 'John',
    address: {
        city: 'NYC',
        coords: { lat: 40, lng: -74 }
    },
    hobbies: ['reading', 'gaming']
};
obj.self = obj;

const clonedObj = deepClone(obj);

console.log(clonedObj);
console.log(clonedObj !== obj);
console.log(clonedObj.address !== obj.address);
console.log(clonedObj.self === clonedObj);      
