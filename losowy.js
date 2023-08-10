// console.log('ss')

// const text = "lorem ipsun"

// const blob = new Blob([text],{type: 'text/plain'})

// const url = URL.createObjectURL(blob)

// console.log(url)

// //////////////////////
// 1b - 0-1 - 2
// 2b - 0-3 - 4
// 3b - 0-7 - 8

// let ab = new ArrayBuffer(2)
// let dataview = new DataView(ab)

// console.log(ab)

// dataview.setInt8(0, 104)   //dataview.setInt8(0, 300) -> 300 % 256 = 44
// dataview.setInt8(1, 105)

// console.log(dataview)
// console.log(new Uint8Array(ab).toString())

// let b = new Blob([ab])
// console.log(b)
// let f = new File([ab],'nazwapliku.txt',{type:'text/plain'}) nie ma w node, w przegladarce tylko

/////////////////////////////////////


// const buffer = Buffer.from('Hello, World!', 'utf8');
// console.log(buffer);


// const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
// console.log(blob);



///////////////////////////////////////buffers

// unicode 
// ascii american standard code for information intercharge

// const buff = Buffer.alloc(8)

// buff.write('12345678',"utf-8") //utf-8 by defauilt

// console.log(buff.toJSON())



/////////////////////////////


// const huj = () =>{

//     return new Promise((res,rej)=>{

//         rej('jd')
//         console.log(3)
//     })

// }


// huj().then(data => console.log(data))

funkcjaAsynchroniczna()

const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAlCAIAAAC26ZyeAAAFBklEQVRYhY1Y23YcNwwDKMXtQ///Y+MR0QeSEjXe5lSJ19kZieIVBMOvv/8BIAhCLJL4tCQBICBIgghAoACCkESdzbalyXInILksb5BSpqS55JBAmpncczvQBJaIkA4CrAspoHR+q55mhe4ftqjs5STgCtvqYp0rP/kjxW1Tm55vLWK/KCL+2NZLCu1JYpoZSZdcshYIvqVtJZRmUhk4EXbtCneTlGLPK8Lq3gEwXTIzA+Te31j70iWsCA2BNI7579sVW4PYFB9xt/TePB0CRBK2swWCEOeb9TrXV35sNwsieQVfICPuoWeF29OPJZzEJChXJhFLA0Gh8ZFZyWCG7UwBqLu7x1XfeRypk0aqhEjpU90zVRiCljcdzPYWIyPaIW0r15P5Y5Gz3dSSmZLmp1rUtfNOUe85pXMtIFyeQ/uSv5jock6HthOguwOwMVIoCWEYty49meWnltnkhZ08D7YK7E/J2NSdpWlmYZyZqaeBtvR7MZLzA44wXQLhcgqaAwLdyOv8BGhm/Al425xbjUg3Yaddf1FKXjIUAKuNrCG1J6a7B/wt9y4zse2DvaHCnzzx0ruK+w0k288TEU1mqm7hHhUhRyCjWOkX2wpdEgASVCqI/baq/zhT7ywhTABm4VHTLpQABAcVhtf95nBChBMwwDNFNsL+KE96iPS3f4775n1IKSQCSQg77QWO7BjSzqGTAefXFavot+G6fVd3CYB5aUUWa6CsuT1BwAmDSJBkmL6hupfrZZYg3hgbNjVFLyXu5YHzALxwmJLBsmcdmhNvVFRFFwgwPfkupy1CmGV5z40tIH42M6IEQ+qTyc3MLhtWnKQzrAPlBRDdSSFAc39/p5QfwJVkBQ6SmAQPVlgtwCNIIED39cGzrwa3H6qHQ7o3Mvot93MCYpib2MosGoLLHYTRGJXz8vrtm7s5YYo777ISIp+ptMbyI1BfKzqRDQpJxkgTHomRyVeHO/Tntr83Gu4SZRSNE2m7nCADI2hboQWQRpIWnY+E1lqsROsmKsN8sLTeZlSjvU0jPf1++ON9oJF9YSAbDYFhJpe7i/85KPyfNcPMmB9OO1ZFqFEjJjDI6kKHO1wUjIaaKIC1PiXmH5RAVMkhfCJAFV4CxD3VZG9OHh2jypjDMKJLqShg+nWzKDX8KKBNUqPdsSPuIsUBrh/ZFCuGlEAnEGY2zIYNcDzPEz6g2W6bSWla5cUQ0JF2RrV5Ak89lsxYQFUvBAIrwQ0QDPzr6+vX15eZ/X7W9/e3uycTLuBRHT94qEYETziSdWRGXgQs+rO3ardTc/lAGOBaizFLSjVxgGaOTVNe5PQoMjB+KYWqEiLHiJxaoi8Ux7ExLaa2TAlfa7mv3/5sN6K6HA6RU6FaeFsmY1XhDNZFFUACDoIyb3T2xdaL6DuExxeebzOM9ME1AJMUpQK+qn7CTIaEC8xknfEq4bSyqqarvnwdFkiQloddZ5lZ9Tj4fT5mr1e2T6tJDqCwWvDYHHDiV6RHAGzYoEFwuZrjzl/SS2BUKD/Rq2nBAgRmjWRnPyLLhFjGozW2Okp4T3xm1kP5k5QXB67HW74wxxjreVweqLwjquImxWavtlRIyhhjBbg7s6mw4L+quWSpioJHh907Ms3R2V2hWv88knfEqHKFO81Uzf0ofP5XpZyrjP0Jh7sLniFIahQEKmfnmhhvJcqTqBnexgAg9ydCdlbleaMlr/UvRimpslywg8AAAAAASUVORK5CYII="

async function funkcjaAsynchroniczna(){



const s = await walidancja()
if(await walidancja(base64)){

    console.log("poprawny")

}else {
    console.log('niepoprawny')
}

}



function walidancja(){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = data;

        try{

            
            img.onload = () => {
                
                img.width;
                img.height;
              
            };
            resolve(true);
        }catch(e){

            reject(false)
        }
    
        // img.onerror = () => {
        //   reject(new Error('Failed to load image'));
        // };
    
      });
}