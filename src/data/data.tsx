import jsonData from "./words.json";

export type dataType = typeof jsonData;
const data: dataType = jsonData;
export default data;
