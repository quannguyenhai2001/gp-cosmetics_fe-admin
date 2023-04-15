export default function removeEmptyValuesInObject(object) {
    const result = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            const emptyValues = [null, undefined, ""];
            if (!emptyValues.includes(value)) {
                Object.assign(result, { [key]: value });
            }
        }
    }
    return result;
}