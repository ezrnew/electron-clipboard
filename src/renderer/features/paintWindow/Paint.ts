import { writeClipboardImage } from "../../utils/displayClipboard"

class Paint {
    private _initialImage: string
    private _editHistory: string[]
    private _step: number


    constructor() {
        this._step = 0
        this._editHistory = []
        this._initialImage = ""

        this.initializeKeyboardUtilities()
    }

    getInitialImage() {
        return this._initialImage
    }
    setInitialImage(image: string) {
        this._initialImage = image
    }

    getStep() {
        return this._step
    }
    setStep(step: number) {
        this._step = step
    }

    getImageHistory() {
        return this._editHistory
    }
    // setImageHistory(editHistory:string[]){
    //     const newArray = editHistory
    //     this._imageEditHistory = [...editHistory]
    // }

    pushImage() {
        console.log('stara wartosc stepa', this._step)
        this._step = this._step + 1
        console.log('NOWA WARTOSC STEPA:', this._step)
        if (this._step < this._editHistory.length) { this._editHistory.length = this._step; }
        // cPushArray.push((document.getElementById('canvas')as HTMLCanvasElement).toDataURL());
        // console.log('NOWY C ARRAY:',cPushArray)
        // this.ste
        console.log('edit history:', this._editHistory)
        this._editHistory.push((document.getElementById('canvas') as HTMLCanvasElement).toDataURL())
    }
    undo() {
        console.log('wchodzi w undo', this)
        if (this._step > 0) {
            this._step = this._step - 1;
            console.log("przechodzi step po reducki:", this._step)
            this.setImageToCanvas(this._step)
        }
    }
    redo() {
        console.log("w redo step i history:", this._step, "  ", this._editHistory)
        if (this._step < this._editHistory.length - 1) {
            this._step = this._step + 1
            this.setImageToCanvas(this._step)
        }
    }

    //todo
    setImageToCanvas(step: number) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const canvasContext = canvas.getContext('2d')
        console.log('ustawiam zdjencie', this._editHistory[step])
        const canvasPic = new Image();
        canvasPic.src = this._editHistory[step];
        canvasPic.onload = () => { canvasContext.drawImage(canvasPic, 0, 0); }
    }
    setInitialImageToCanvas() {
        this._editHistory = []
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const canvasContext = canvas.getContext('2d')


        return getImageData(this._initialImage).then((result: any) => {

            canvas.width = result.width;
            canvas.height = result.height;
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
            canvasContext.drawImage(result.img, 0, 0, result.width, result.height)
            this._editHistory.push(this._initialImage)

            return 3
        }

        )
    }





    //initialize colors



    initializeKeyboardUtilities() {
      
         const handleKeyDown =(event: KeyboardEvent)=> {

            if (event.ctrlKey && event.key === 'c') {
                console.log('kurwa hisotira')
                console.log(typeof this._editHistory[this._editHistory.length-1])
                console.log(this._editHistory[this._step])
// console.log(this._editHistory[this._editHistory.length-1].toString())
                //todo gdzies przeniesc ta funkcje
                writeClipboardImage(this._editHistory[this._step])

                // navigator.clipboard(write)
                // Your code to execute when Ctrl + C is pressed

            }

            if (event.ctrlKey && event.key === 'z') {
                this.undo()
                // Your code to execute when Ctrl + C is pressed

            }

            if (event.ctrlKey && event.key === 'y') {
                this.redo()
                // Your code to execute when Ctrl + C is pressed

            }

            if (event.ctrlKey && event.key === 'r') {
                this.setInitialImageToCanvas()
                // Your code to execute when Ctrl + C is pressed

            }

        }

        window.addEventListener('keydown', handleKeyDown);
    }



}





//todo 
function getImageData(dataUri) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = dataUri;

        img.onload = () => {

            const width = img.width;
            const height = img.height;
            resolve({ img, width, height });
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

    });
}


// initializeColors


export const paint = new Paint()


