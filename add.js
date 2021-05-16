const addEntry = {};

addEntry.dbRef = firebase.database().ref();

addEntry.submit = function(){
    $(`input[type="submit"]`).click(function(e) {
        e.preventDefault();
        const outcomeChoice = $('input[type="radio"]:checked').val();
        const drinkNumber = $('select').val();
        const description = $('textarea').val();            
        if (drinkNumber === "0" || description === "") {
            $('.errorMsg').show();
        } else {
            addEntry.dbRef.on('value', (data) => {
                const outcomeRef = [...data.val()[outcomeChoice][drinkNumber]];
                outcomeRef.push(description);
                addEntry.addToDatabase(outcomeRef, outcomeChoice, drinkNumber);
            });
        };
    });
}

addEntry.addToDatabase = function(outcomeRef, outcome, drinkNumber){
    addEntry.dbRef.off()
    const dbRef = firebase.database().ref(`${outcome}/${drinkNumber}/`);
    dbRef.set(outcomeRef);
    $('.addMsg').show();
    $('select').val(`0`);
    $('textarea').val(``);
}

addEntry.reset = function(){
    $('input[type="reset"]').click(function() {
        $('select').val(`0`);
        $('textarea').val(``);
    });
}

addEntry.init = function(){
    addEntry.submit();

    $(`.closeX`).click(function() {
        $(`.addMsg`).hide();
        $(`.errorMsg`).hide();
    })
}

$(function(){
//document ready
    addEntry.init();
});