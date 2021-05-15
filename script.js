// setting the object and variables needed across several functions contained within

const carTable = {};

carTable.drinkNumber = 0;
carTable.rollPushed = false;
carTable.firstSuccess = false;

// when the roll d20 button is clicked, generate a random number from 1-20, and color the box based on if it's >= 10 (green) or < 10 (red)
// if it's the first time since the page was loaded that the player acheives a success, an alert will pop-up to let the player know they can stop carousing, or continue on for another drink (in case it's unclear initially.)

carTable.randomD20 = function(){
$(`.randomD20`).on(`click`, () => {

    // if drinkNumber is higher than 6, the user is told to reset and start again.
        if (carTable.drinkNumber >= 6) {
            $(`.finalResult`).text(`You've already had too much! Press RESET below to start again.`);
        } else {
            // generate a random number between 1 and 20
            carTable.randomRoll = Math.floor(Math.random() * 20) + 1;
            // display the number in the rollResult div
            $(`.rollResult`).text(carTable.randomRoll);
            // - increase the number of drinks the player has had
            carTable.drinkNumber++;
            // - add another drink icon to the drinkTally div
            $(`.drink${carTable.drinkNumber}`).show();
            // if the roll is greater than or equal to 10, the dice roll border should turn green. If not, it should turn red.
            if (carTable.randomRoll >= 10) {
                $(`.rollResult`).css(`border-color`, `forestgreen`);
               // if it's the first time since the page was loaded that the player acheives a successfull roll, display alert to let the player know they can stop carousing, or continue on for more 
                if (carTable.firstSuccess === false) {
                alert(`Success! You're still standing after a drink! You may continue to roll, or press the Success button to stop now.`);
                carTable.firstSuccess = true;
                }
            } else {
                $(`.rollResult`).css(`border-color`, `orangered`);
            };
        };
        carTable.rollPushed = true;
    });
};

// when the result button is clicked, it will:
// - determine a random number between 0 and 9
// - based on that number, it will pull an outcome from the outcome.failure object arrays randomly, based on how high the drinkNumber is.
carTable.getResult = (result) => {
    if (carTable.rollPushed === false) {
        $(`.finalResult`).text(`You need to press the Roll d20 button first!`);
    } else {
        // turn on firebase listener
        const dbRef = firebase.database().ref();
        dbRef.on('value', (data) => {
            // - determine a random number between 0 and the endpoint of the array
            const randomNumber = Math.floor(Math.random() * data.val()[result][carTable.drinkNumber].length);
            // - based on that randomly generated umber, it will pull an outcome from the outcome object arrays, based on how high the drinkNumber is.
            const outcome = data.val()[result][carTable.drinkNumber][randomNumber];
            $(`.finalResult`).text(outcome);
        })
    };
}

// event listeners for success and failure buttons

carTable.success = function(){
    $(`.success`).on(`click`, () => {
        const result = "success";
        carTable.getResult(result);
    });
};

carTable.failure = function(){
    $(`.failure`).on(`click`, () => {
        const result = "failure";
        carTable.getResult(result);
    });
};
//  when the reset button is clicked it will:
//  - clear the finalResult div
//  - reduce the drinkTally to one
//  - clear the rollResult div and restore the border color to black
carTable.reset = function(){
    $(`.reset`).on(`click`, () => {
        //  - clear the finalResult div
        $(`.finalResult`).text(``);
        //  - reset the number of d20 rolls to zero, the drinkTally to zero, and clear the drink icons currently displayed on the page
        carTable.drinkNumber = 0;
        for (i = 1; i < 7; i++) {
            $(`.drink${i}`).hide();
        };
        //  - clear the rollResult div and restore the border color to black
        $(`.rollResult`).text(``).css(`border-color`, `black`);
        // reset rollPushed to false
        carTable.rollPushed = false;
    })
};

// initializing functions for app

carTable.init = function(){

    // hide divs drink1-drink6, as they will be revealed as players click the randomD20 button. I wasn't sure if I should put this for loop here - should it have been at the top of the script? I figured since this is when the script is initialized once the document is ready, it should be here. Please let me know if I'm wrong!

    for (i = 1; i < 7; i++) {
        $(`.drink${i}`).hide();
    };

    carTable.randomD20();
    carTable.success();
    carTable.failure();
    carTable.reset();
};

$(document).ready(function(){
    carTable.init();
});