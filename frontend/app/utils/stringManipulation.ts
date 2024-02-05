export const fromCamelCase = (val:string):string => val.replace(/([a-z])([A-Z])/g, '$1 $2');

