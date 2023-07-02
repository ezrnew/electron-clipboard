import { ipc } from "../connection/IpcRendererHandler";

export function displayInitialClipboardData(data: string[]) {

    const clipboardList = document.getElementById('clipboard-list')

    clipboardList.innerHTML = ''

    data.forEach(entry => {

        let item = document.createElement('li')
        item.appendChild(getLiChild(entry))
        item.addEventListener('click', () => { onEntryClick(entry) })
        if(!isText(entry)){item.addEventListener('contextmenu', () => { onImageRightClick(entry) })}
        

        clipboardList.appendChild(item)

    });

}

let lastEntry = ''

export function appendClipboardData(data: string) {

    if (lastEntry === data) {return; }
    lastEntry = data

    const clipboardList = document.getElementById('clipboard-list')

    let item = document.createElement('li')

    item.appendChild(getLiChild(data))

    item.addEventListener('click', () => { onEntryClick(data) })

    if(!isText(data)){item.addEventListener('contextmenu', () => { onImageRightClick(data) })}

    clipboardList.appendChild(item)

}

function getLiChild(data: string) {

    if(isText(data)){
        return document.createTextNode(data)

    }

    else {
        //todo dodac validacje jak się zaczyna z data:image/png;base64, czy mozna zdecodować poprawnie
        let img = document.createElement("img");


        img.src = data
// img.alt = data;
img.className='imgStyle'
// img.max = ;

return img

    }
        
    

}


function onEntryClick(data: string) {


    isText(data) ? navigator.clipboard.writeText(data) : writeClipboardImage(data)

}


function onImageRightClick(data:string){

    ipc.sendPaintRequest(data)

}





function isText(data: string) {

    return !data.startsWith('data:image/png;base64,')


}




function writeClipboardImage(base64Image: string) {

    const base64 = base64Image.replace('data:image/png;base64,', '')

    const blob = b64toBlob(base64, 'image/png');

    try {
        navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob
            })
        ]);
    } catch (error) {
        console.error(error);
    }

}




const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}