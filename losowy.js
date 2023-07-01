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


const huj = () =>{

    return new Promise((res,rej)=>{

        rej('jd')
        console.log(3)
    })

}


huj().then(data => console.log(data))
