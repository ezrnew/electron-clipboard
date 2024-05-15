import { BrowserWindow,screen } from "electron";



//todo bugged af on smaller resolution screens
export function windowStickToBorderHandler(window:BrowserWindow){





    // const positioner = new Positioner(window)
    const threshold = 40



    window.on('move',() => {


            const windowBounds = window.getBounds();
            const cursorPosition = screen.getCursorScreenPoint();

            // const { x: windowX, width: windowWidth } = window.getBounds();
            
            
            // console.log("bounds x:",windowBounds.x," width:",windowBounds.width)
            
            console.log('cursor x: ',cursorPosition.x,'cursor y:',cursorPosition.y)

            
            const cursorPositionFromRight = windowBounds.x + windowBounds.width - cursorPosition.x;

            const cursorPositionFromBottom = windowBounds.y + windowBounds.height - cursorPosition.y;
            
            
            //    console.log(cursorPositionFromRight)   
            
            const cursorPositionFromLeft = windowBounds.width - cursorPositionFromRight;
            // console.log('POSITION',window.getPosition() )
            // console.log('boundsWidth',windowBounds.width)
            // console.log('cursor',cursorPosition.x)
            // console.log('position:',cursorPositionFromLeft)

            // const cursorPositionFromRight = windowBounds.x + windowBounds.width - cursorPosition.x;
            // const cursorPositionFromRight = windowBounds.x + windowBounds.width - cursorPosition.x;
            
            
            
            
            const displayBounds = screen.getDisplayMatching(windowBounds).bounds
            
            // console.log('DISPLAY BOUNDS ',displayBounds.y,"  ",displayBounds.height)
            // console.log('DISPLAY cursor')
        // console.log(screen.getDisplayMatching(windowBounds))
        // console.log("cursor position x: ", cursorPosition.x)
        // console.log("from right: ", cursorPositionFromRight)
        // console.log("boundsy odejmowane: ", displayBounds.x ," ", displayBounds.width) //display aktualnego monitora (-1920 - 0 , 0 - 1920)

        // console.log('displayBounds.width',displayBounds.width)
        // console.log('cursorfrom right',cursorPositionFromRight)
        
        
        const distanceTop = Math.abs(cursorPosition.y - displayBounds.y);
        const distanceRight = (cursorPosition.x+cursorPositionFromRight) - (displayBounds.x + displayBounds.width);
        // console.log("distance right:",distanceRight)
        // const distanceBottom = Math.abs(cursorPosition.y+cursorPositionFromBottom - (displayBounds.y + displayBounds.height));
        // const distanceBottom = Math.abs(cursorPosition.y+cursorPositionFromBottom - (displayBounds.y + displayBounds.height));
        const distanceBottom = Math.abs((displayBounds.y + displayBounds.height) - cursorPosition.y );
        // const distanceBottom = Math.abs(cursorPosition.y+cursorPositionFromBottom - (displayBounds.y + displayBounds.height));
        const distanceLeft = Math.abs(cursorPosition.x - cursorPositionFromLeft  - displayBounds.x);
        // + cursorPositionFromRight
        // console.log(distanceRight)
        console.log('distance right:', distanceRight)
        // console.log('CURSOR FROM BOTTONM:', cursorPositionFromBottom)
        
        const drugiDistanceBottom =  cursorPosition.y -windowBounds.height
        // console.log('DRUGI FROM BOTTOM KURWARAA:', drugiDistanceBottom)
    
        const shouldStickToRight2 = (displayBounds.width - (windowBounds.width+threshold)) > (displayBounds.width - cursorPositionFromRight) ;
        const shouldStickToTop = distanceTop <= threshold;
        const shouldStickToRight = -distanceRight <= threshold;
        const shouldStickToBottom = distanceBottom <= threshold+windowBounds.height;
        const shouldStickToLeft = distanceLeft <= threshold;
    
        let newPosition;


        console.log('WINDOW BOUNDS:')
        console.log(windowBounds.x, windowBounds.y,windowBounds.width,windowBounds.height)


    
        if (shouldStickToTop) {

        //   console.log("should stick to top")
        //   console.log("cursor from left:",cursorPositionFromLeft)
        //   console.log("cursorpos",cursorPosition.x)
          window.setPosition(windowBounds.x,displayBounds.y)
        } 
        else if (shouldStickToBottom) {
            window.setPosition(windowBounds.x,displayBounds.height-windowBounds.height)
        }

        else if (shouldStickToRight) {
            // console.log('windowBounds.bounds',displayBounds.x)
            // console.log(windowBounds.width)
            console.log('stick to right')
            console.log('displayBounds.width',displayBounds.width)
            console.log('cursorfrom right',cursorPositionFromRight)

        //  window.setPosition(displayBounds.width-cursorPositionFromRight ,windowBounds.y)
         window.setPosition(displayBounds.width-windowBounds.width ,windowBounds.y)
        } 
        
        

         else if (shouldStickToLeft) {
            window.setPosition(displayBounds.x ,windowBounds.y)

        }
    
else {

    
    window.setPosition(windowBounds.x,windowBounds.y)
}



    })


}