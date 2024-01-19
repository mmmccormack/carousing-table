

const addEntry = {};

addEntry.dbRef = dbRef;
addEntry.profanity = ["4r5e","5h1t","5hit","a55","anal","anus","ar5e","arrse","arse","arses","ass-fucker","asses","assfucker","assfukka","asshole","assholes","asswhole","a_s_s","a$$","as$","a$s","b!tch","b00bs","b17ch","b1tch","ballbag","ballsack","beastial","beastiality","bellend","bestial","bestiality","bi+ch","biatch","bitch","bitchboy","bitcher","bitchers","bitches","bitchin","bitching","blow job","blowjob","blowjobs","boiolas","bollock","bollok","boner","boob","boobs","booobs","boooobs","booooobs","booooooobs","breasts","buceta","bullshit","butts","butthole","buttmuch","buttplug","c0ck","c0cksucker","carpet muncher","cawk","chink","cipa","cl1t","clit","clitoris","clits","cnut","cock","cock-sucker","cockface","cockhead","cockmunch","cockmuncher","cocks","cocksuck","cocksucked","cocksucker","cocksucking","cocksucks","cocksuka","cocksukka","cok","cokmuncher","coksucka","coon","cox","cum","cummer","cumming","cums","cumshot","cunilingus","cunillingus","cunnilingus","cunt","cuntlick","cuntlicker","cuntlicking","cunts","cyalis","cyberfuc","cyberfuck","cyberfucked","cyberfucker","cyberfuckers","cyberfucking","d1ck","dick","dickhead","dickmonster","dildo","dildos","dink","dinks","dirsa","dlck","dog-fucker","doggin","dogging","donkeyribber","doosh","duche","dyke","ejaculate","ejaculated","ejaculates","ejaculating","ejaculatings","ejaculation","ejakulate","f u c k","f u c k e r","f4nny","fag","fagging","faggitt","faggot","faggs","fagot","fagots","fags","fannyflaps","fannyfucker","fanyy","fatass","fcuk","fcuker","fcuking","feck","fecker","felching","fellate","fellatio","fingerfuck","fingerfucked","fingerfucker","fingerfuckers","fingerfucking","fingerfucks","fistfuck","fistfucked","fistfucker","fistfuckers","fistfucking","fistfuckings","fistfucks","flange","fook","fooker","fuck","fucka","fucked","fucker","fuckers","fuckhead","fuckheads","fuckin","fucking","fuckings","fuckingshitmotherfucker","fuckme","fucks","fuckwhit","fuckwit","fudge packer","fudgepacker","fuk","fuker","fukker","fukkin","fuks","fukwhit","fukwit","fux","fux0r","f_u_c_k","gangbang","gangbanged","gangbangs","gaylord","gaysex","goatse","god-dam","god-damned","goddamn","goddamned","hardcoresex","headass","hoar","hoare","hoer","hoes","homo","hore","horniest","horny","hotsex","jack-off","jackoff","jap","jerk-off","jism","jiz","jizm","jizz","kawk","knobead","knobed","knobend","knobhead","knobjocky","knobjokey","kock","kondum","kondums","kum","kummer","kumming","kums","kunilingus","l3i+ch","l3itch","labia","lust","lusting","m0f0","m0fo","m45terbate","ma5terb8","ma5terbate","masochist","master-bate","masterb8","masterbat*","masterbat3","masterbate","masterbation","masterbations","masturbate","mo-fo","mof0","mofo","mothafuck","mothafucka","mothafuckas","mothafuckaz","mothafucked","mothafucker","mothafuckers","mothafuckin","mothafucking","mothafuckings","mothafucks","motherfuck","motherfucked","motherfucker","motherfuckers","motherfuckin","motherfucking","motherfuckings","motherfuckka","motherfucks","muff","muthafecker","muthafuckker","mutherfucker","n1gga","n1gger","nazi","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger","niggers","nob","nob jokey","nobhead","nobjocky","nobjokey","numbnuts","nutsack","orgasim","orgasims","orgasm","orgasms","p0rn","pawn","pecker","penis","penisfucker","phonesex","phuck","phuk","phuked","phuking","phukked","phukking","phuks","phuq","pigfucker","pimpis","piss","pissed","pisser","pissers","pisses","pissflaps","pissin","pissing","pissoff","poop","porn","porno","pornography","pornos","prick","pricks","pron","pube","pusse","pussi","pussies","pussy","pussys","rectum","retard","rimjaw","rimming","s hit","s.o.b.","sadist","schlong","scroat","scrote","scrotum","semen","sex","sh!+","sh!t","sh1t","shemale","shi+","shit","shitdick","shite","shited","shitey","shitfuck","shitfull","shithead","shiting","shitings","shits","shitted","shitter","shitters","shitting","shittings","shitty","skank","slut","sluts","smegma","smut","snatch","son-of-a-bitch","spac","spunk","s_h_i_t","t1tt1e5","t1tties","teets","teez","testical","testicle","tit","titfuck","tits","titt","tittie5","tittiefucker","titties","tittyfuck","tittywank","titwank","tosser","turd","tw4t","twat","twathead","twatty","twunt","twunter","v14gra","v1gra","vagina","viagra","vulva","w00se","wang","wank","wanker","wanky","whoar","whore"];

addEntry.findProfanity = (userArray, swearArray) => {
    return userArray.some(word => swearArray.includes(word));
}

addEntry.submit = function(){
    $(`input[type="submit"]`).click(function(e) {
        e.preventDefault();
        const outcomeChoice = $('input[type="radio"]:checked').val();
        const drinkNumber = $('select').val();
        const descriptionBeforeCheck = $('textarea').val().split(" "); 
        // if there is profanity in the entry, a popup message will appear.
        if(addEntry.findProfanity(descriptionBeforeCheck, addEntry.profanity)) {
            $('.profane').show();
        } else {
            if (drinkNumber === "0" || description === "") {
                $('.error').show();
            } else {
                onValue(addEntry.dbRef, (data) => {
                    if (data.exists()){
                        console.log(data.val());
                    } else {
                        console.log('no data available');
                    }
                    // const outcomeRef = [...data.val()[outcomeChoice][drinkNumber]];
                    // outcomeRef.push(description);
                    // addEntry.addToDatabase(outcomeRef, outcomeChoice, drinkNumber);
                });
            };
        }
    });
}

addEntry.addToDatabase = function(outcomeRef, outcome, drinkNumber){
    addEntry.dbRef.off()
    const dbRef = firebase.database().ref(`${outcome}/${drinkNumber}/`);
    dbRef.set(outcomeRef);
    $('.add').show();
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
        $(`.message`).hide();
    })
}

$(function(){
//document ready
    addEntry.init();
});