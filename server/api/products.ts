import data from "./products.json";

export default defineEventHandler(async (event) => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 3000);
    });
});
