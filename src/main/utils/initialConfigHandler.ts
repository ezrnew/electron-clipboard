// //todo o co z tym gownem chodzi ze sie apka nie budujke
// import { CONFIG_PATH } from "../../common/constants";
// const fs = require('fs');

// export type configType = {
//   alwaysOnTop:boolean
// }

// // config.alwaysOnTop = true

// export const readInitialConfig = () =>{
//   return new Promise((resolve, reject) => {
//     fs.readFile(CONFIG_PATH, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       // const dataArray = data.split(CONFIG_PATH);
//       resolve(JSON.parse(data));
//     });
//   });
// }


// export const alwaysOnTopConfigHandler = (value:boolean) =>{
//   // const config={alwaysOnTop:false}
//     // console.log(typeof config)
// let newConfig = {...config}
// newConfig.alwaysOnTop = value
// updateConfig(newConfig)
// }

// // export const safeModeConfigHandler = (value:boolean) =>{
// //   // const config={alwaysOnTop:false}
// //   //   console.log(typeof config)
// // let newConfig = {...config}
// // newConfig.safeMode = value
// // updateConfig(newConfig)
// // }



// const updateConfig = (config:any) =>{

//     fs.writeFile(CONFIG_PATH, JSON.stringify(config), (err, data) => {
//         if (err) {
//           console.log(err)
//           return;
//         }
//         console.log("config updoated",data)
  
//       });

// }