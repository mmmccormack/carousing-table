const addEntry = {};

addEntry.dbRef = firebase.database().ref();

addEntry.submit = function(){
    $(`input[type="submit"]`).click(function(e) {
        e.preventDefault();
        const outcomeChoice = $('input[type="radio"]:checked').val();
        const drinkNumber = $('select').val();
        addEntry.dbRef.on('value', (data) => {
            const outcomeRef = [...data.val()[outcomeChoice][drinkNumber]];
            const description = $('textarea').val();            
            outcomeRef.push(description);
            addEntry.addToDatabase(outcomeRef, outcomeChoice, drinkNumber);
        })
    });
}

addEntry.addToDatabase = function(outcomeRef, outcome, drinkNumber){
    addEntry.dbRef.off()
    const dbRef = firebase.database().ref(`${outcome}/${drinkNumber}/`);
    dbRef.set(outcomeRef);
    $('select').val(`0`);
    $('textarea').val(``);
    $('input[type="radio"]').removeAttr('checked');
}

addEntry.reset = function(){
    $('input[type="reset"]').click(function() {
        $('select').val(`0`);
        $('textarea').val(``);
        $('input[type="radio"]').removeAttr('checked');
    });
}

addEntry.init = function(){
    addEntry.submit();
}

$(function(){
//document ready
    // firebase.database().ref().set(addEntry.outcome);
    addEntry.init();
});