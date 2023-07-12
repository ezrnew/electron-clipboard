class PaintTools {
    private color: string
    private drawingWidth: number


    constructor() {
        this.color = "#000000"
        this.drawingWidth = 5


        this.initializeToolsListeners()
    }

    getColor() {
        return this.color
    }

    getDrawingWidth() {
        return this.drawingWidth
    }




    //initialize colors
    private initializeToolsListeners() {
        const colorButtonRed = document.getElementById("red")
        const colorButtonOrange = document.getElementById("orange")
        const colorButtonYellow = document.getElementById("yellow")
        const colorButtonYellowgreen = document.getElementById("yellowgreen")
        const colorButtonGreen = document.getElementById("green")
        const colorButtonTeal = document.getElementById("teal")
        const colorButtonBlue = document.getElementById("blue")
        const colorButtonViolet = document.getElementById("violet")
        const colorButtonPurple = document.getElementById("purple")
        const colorButtonBlack = document.getElementById("black")
        const colorButtonGray100 = document.getElementById("gray100")
        const colorButtonGray200 = document.getElementById("gray200")
        const colorButtonGray300 = document.getElementById("gray300")
        const colorButtonGray400 = document.getElementById("gray400")
        const colorButtonGray500 = document.getElementById("gray500")
        const colorButtonGray600 = document.getElementById("gray600")
        const colorButtonWhite = document.getElementById("white")


        colorButtonRed.addEventListener('click', () => { this.color = "#ff0000" })
        colorButtonOrange.addEventListener('click', () => { this.color = "#FFA500" })
        colorButtonYellow.addEventListener('click', () => { this.color = "#FFFF00" })
        colorButtonYellowgreen.addEventListener('click', () => { this.color = "#ADFF2F" })
        colorButtonGreen.addEventListener('click', () => { this.color = "#008000" })
        colorButtonTeal.addEventListener('click', () => { this.color = "#008080" })
        colorButtonBlue.addEventListener('click', () => { this.color = "#0000FF" })
        colorButtonViolet.addEventListener('click', () => { this.color = "#EE82EE" })
        colorButtonPurple.addEventListener('click', () => { this.color = "#800080" })
        colorButtonBlack.addEventListener('click', () => { this.color = "#000000" })
        colorButtonGray100.addEventListener('click', () => { this.color = "#232323" })
        colorButtonGray200.addEventListener('click', () => { this.color = "#484848" })
        colorButtonGray300.addEventListener('click', () => { this.color = "#6F6F6F" })
        colorButtonGray400.addEventListener('click', () => { this.color = "#909090" })
        colorButtonGray500.addEventListener('click', () => { this.color = "#BCBCBC" })
        colorButtonGray600.addEventListener('click', () => { this.color = "#D3D3D3" })
        colorButtonWhite.addEventListener('click', () => { this.color = "#FFFFFF" })


        const paintWidth1 = document.getElementById("width1")
        const paintWidth2 = document.getElementById("width2")
        const paintWidth3 = document.getElementById("width3")

        paintWidth1.addEventListener('click', () => { this.drawingWidth = 2 })
        paintWidth2.addEventListener('click', () => { this.drawingWidth = 5 })
        paintWidth3.addEventListener('click', () => { this.drawingWidth = 10 })



    }



}


// initializeColors


export const tools = new PaintTools()


