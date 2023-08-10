import { BASE64 } from "../../common/constants";
export const validateBase64 = (data: string) => {

    const withoutBase = data.replace(BASE64, "")

    const template = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
    
    return template.test(withoutBase) && withoutBase.length % 4 === 0
}


//todo serverside validation with Canvas.Image
// export const walidacja = (data: string) => {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = data;
//         try {
//             img.onload = () => {
//                 img.width;
//                 img.height;
//             };
//             resolve(true);
//         } catch (e) {
//             reject(false)
//         }
//     });
// }