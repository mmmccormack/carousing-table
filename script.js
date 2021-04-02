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

// when the success button is clicked, it will:
// - determine a random number between 0 and 9
// - based on that number, it will pull an outcome from the outcome.success object arrays randomly, based on how high the drinkNumber is.


carTable.success = function(){
    $(`.success`).on(`click`, () => {
        // if a random roll hasn't been made yet, prompt the user to make a roll
        if (carTable.rollPushed === false) {
            $(`.finalResult`).text(`You need to press the Roll d20 button first!`);
        } else {
            // - determine a random number between 0 and 9
            carTable.randomNumber = Math.floor(Math.random() * carTable.outcome.success[carTable.drinkNumber].length);
            // - based on that randomly generated umber, it will pull an outcome from the outcome object arrays, based on how high the drinkNumber is.
            carTable.randomOutcome = carTable.outcome.success[carTable.drinkNumber][carTable.randomNumber];
            $(`.finalResult`).text(carTable.randomOutcome);
        };
    });
};

// when the failure button is clicked, it will:
// - determine a random number between 0 and 9
// - based on that number, it will pull an outcome from the outcome.failure object arrays randomly, based on how high the drinkNumber is.

carTable.failure = function(){
    $(`.failure`).on(`click`, () => {
        // if a random roll hasn't been made yet, prompt the user to make a roll
        if (carTable.rollPushed === false) {
            $(`.finalResult`).text(`You need to press the Roll d20 button first!`);
        } else {
            // - determine a random number between 0 and 9
            carTable.randomNumber = Math.floor(Math.random() * carTable.outcome.failure[carTable.drinkNumber].length);
            // - based on that randomly generated umber, it will pull an outcome from the outcome object arrays, based on how high the drinkNumber is.
            carTable.randomOutcome = carTable.outcome.failure[carTable.drinkNumber][carTable.randomNumber];
            $(`.finalResult`).text(carTable.randomOutcome);
        };
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

// object containing arrays of all the possible outcome text (values) associated with the number of drink the player has had (keys).

carTable.outcome = {
    success : {
        1 : ["You wake up in a strange bed with no one. A moment later, a middle aged man invites you down for breakfast. He and his family know you by name and no one seems to find your presence unusual.", "You flirt with a person of interest and end up learning an interest tidbit of information about a foe.", "You overhear some other patrons at the tavern plotting a crime. Join them, stop them, call the city guard - either way, you have the upper hand.", "You wake up sitting at the table of a regular house with a hot beverage in front of you and a sweet old lady asking about your night. She offers her place if you need to stay in the future.","You wake up naked, with a treasure map drawn on your butt.","You overhear in the night of a place where a great fortune lies, but you only know it by nickname, and don't yet know it's true location.","In the night you somehow joined the local thieves guild.","You wake up in jail, but apparently you were used as bait in a sting the night before, and the local guard gives you 10gp for your service.","You participate in a pole vaulting contest. Roll a DEX check - if you fail, you take 1d6 damage, and if you succeed, you suffer no damage. Either way, you vault heroically over the tavern, and gain 2d10gp!","You and a bard write and perform a song in one night that brings the house down! Roll a WIS check to see if you remember it - if so, you sing it at your next short rest and your party recovers an additional 1d4 HP."],
        2 : ["You wake up in a sumptuous bed in a beautiful hotel with a breakfast of caviar and fine mead. Pay 1d10 gp or find a way out. Either way, you gain 1d10 temp HP.","You are caught up in a whirlwind romance. Roll a d20. On a 15–20, the romance was incredible, resulting in a +1 to all rolls for the day.","A potion sits on your nightstand as you awake. It is labeled drink me! DM determines what it is, but it is a good result.","You wake up in bed with a royal, who talks in their sleep. They seem to be whispering the location of a secret item, or how to get through a puzzle (DM's discretion).","You wake up feeling worked over and sore. Next to you is a card with the name and address of a wealthy person, as well as a handwritten phrase, in excellent penmanship, reading: ‘Thank you for defending me. I am in your debt!’","As you wake up you discover a shiny new tattoo on your chest. It seems to be some kind of rune. It glows when something magical is near.","You wake up covered in blood, scrapes, cuts, and with a wobbly tooth. Your companions tell you that you stumbled in late last night yelling ‘You should have seen the other guy!’. Examination of your belongings reveals you are now 50GP richer.","You awaken with an entire small tavern’s worth of people crammed into your bed in various states of dress. You get up to leave and they all toast you for your ability to throw a party and get them all drunk, but somehow you haven't lost any money.","You won a horse while gambling at night! It's not large enough to carry anyone but it can carry up to 1000gp in weight.","You wake up in your bed surrounded by beautiful fairies. You have gained 1d10 temporary hit points."],
        3: ["You earn modest winnings from gambling. You recuperate your lifestyle expenses for the time spent carousing and gain 1d20 × 4 gp.","A strange, ethereal figure stands above you as you wake. It says “thank you for all that you have done for us” and vanishes with no further explanation, but you have a +1 to all of your rolls for 1d4 days.","As you wake up you discover a shiny new tattoo on your chest, it glows and it seems to be some kind of rune. It glows when something evil is near.","Several hundred rats surround your bed, staring unblinkingly at you. They will follow you, and obey simple commands, but only until sundown, when they disappear back into cracks and pipes and alleyways.","When you stagger downstairs into the tavern, a burly half-orc grabs you. Apparently you won an arm-wrestling contest against them last night, and they want a rematch. Roll a CON save. If you win, they give you 50GP.","You wake up and see a note written in a language you don't know. It reads: 'Look! You can now read and speak this langauge!'","You wake up next to a map that shows the secret entrance to a dragon's lair.","You wake up nude under a clear cape, which you believe gives you sexual powers! +1 to all CHA checks if you take it with you.","You wake up next to a potion vial that is empty. Roll a d6 to determine which stat has advantage for the next 1d4 days.","Player rolls a perception check. If it succeeds, they notice their primary weapon has been replaced with a magical one. If it fails, you notice 2d20gp under the bed."],
        4: ["You wake up in a cozy bed on a wealthy noble’s estate. You have a number of minor wounds and on the nearest chair is a fox skin suit that looks to have been savaged by dogs. Waiting for you on the table is 4d10gp in a bag, and a ‘Thank you’ note.","You wake in the sewers, sitting upon an over-sized and terribly shoddily made throne, with a tribe of Kobolds bowing and supplicating before you. Somehow, you’ve become Kobold royalty.","You wake up in a tavern bedroom in a cozy feather bed. All of your possessions are there and you seem to have gained 354 extra gold pieces and a note that says ‘Thanks, you were fabulous.’","When in a drunken stupor you asked your god(s) to get you out of some stupid mess. Turns out they heard you! Now as repayment for saving you, you're under the effects of a quest spell. If you succeed, they grant you a permanent +1 to any stat.","You wake up naked with a particularly nice pair of socks on. They wear out after 1d4 days but you have an extra 10 feet of movement in battle until then.","You wake up with an owl sleeping on your head. Roll a CHA or animal handling check. If you succeed, it is your new familiar. If not, it flies out the window.","You wake up in a castle you don't recognize, but people surround you cheering. You have gained an inspiration point for completing a quest (though you don't remember what it was)!","You wake up unaware of what happened, but you have a delightful tune in your head some bards sang about you. When your party short rests, you sing this song and they recover an additional 1d8 HP.","In the night, you inadvertently set free a caravan of slaves in the bad part of town. You remember them cheering for you and saying that they will be forever grateful, and aid you in the future.","You wake up with a strange rod/wand. DM will determine what it is, but it has 1d4 charges before it withers away."],
        5: ["You make a small fortune gambling. You gain 4d6 × 10 gp, and everyone starts calling you 'Gamblin' Dave', even though that isn't remotely close to your name.","You wake up the next morning with 1: a talisman 2: a book containing 1d6 spells 3: a golden ring 4: an ornate silver crown 5: a shield with the image of an eye 6: a dagger of obsidian. This item is the property of a cult operating in the area and they will take extreme steps to get it back.","You find yourself in the service of a king who is benevolent but has strange requests. He offers you a small keep not far from town, in exchange for completing his quest (DM decides the quest).","You wake up with a familiar of your choosing! They can't fight in battle, but they can scout for you.","You wake up and notice your arm has disappeared inside of a small bag. It is a bag of holding, and it's yours to keep. Nothing is inside it.","You wake up on the ethereal plane. There is a word (DMs choice) written on your wrist, that when spoke will return you to the material plane. Until you utter that word, you remain on the ethereal plane. The word wears off in 1d3 days, but until then you can move between the planes by uttering this word.","You wake up in a castle you don't recognize, but people surround you cheering. You have gained a hero point for completing a quest (though you don't remember what it was)!","You come across a temple ceremony, which you may watch from a distance or participate in. If you succeed a CHA check, you gain religious favour, and +1 to all saving throws for 1d10 days. If you fail, you receive only 1d4 temp HP.","You wake up in the morning feeling great, despite your drinking. You feel a lot wiser, but you notice all of your gold is gone. All your GP has been converted to XP (up too 1000GP).","You were gambling wildly in the night, and have won a modestly sized junk ship. You'll need to hire a crew."],
        6: ["While gambling at night, you won the eternal service of a level 1 squire! Roll a d6 to determine their class: 1: fighter, 2: bard, 3: cleric, 4: magic-user, 5: thief/rogue, 6: paladin. DM will determine race.","You wake up in a room with no doors, with a silly tattoo on your wrist of a horse riding on a knight. However, the tattoo glows when you are near secret doors.","You switch clothes with someone at night and end up with a rare item.","You wake up with a particularly nice looking set of boots melded to your feet. You gain an extra 10 feet of movement in battle permanently.","You wake up in a temple surrounded by paladins in cloaks. They grant you an extra attack in battle permanently, but your alignment is now lawful good, and if you go against it, you lose the ability.","You wake up a week in the future. The effect only lasts for 10 minutes, but you can do whatever you like until then.","You wake up naked underneath a new suit of dragon scale mail. DM will determine what type of dragon scales.","You wake up just in time to see a ghoulish figure with a signed contract disappear after shaking your hand. You've made a pact with a fiend, and as a result they've gifted you with being able to cast the Eldritch Blast cantrip (or, if the player has that, level 1 Magic Missile).","You wake up in the king/queen's castle to great fanfare. You have gained 1d10 x 100xp for completing a quest (though you don't remember what it was)!","You were gambling last night, and have won yourself a fully-stocked and guarded keep on the far edges of the lands. It's yours - you'll just have to get there to claim it."],
    },
    failure: {
        1 : ["You wake up in a strange bed with no one, and you can hear the family downstairs calling for the local guard.", "You regain consciousness in a strange place with no memory of how you got there, and you have been robbed of 3d6 × 5 gp.", "You traded clothes with someone in the night of a different race. Your clothes do not fit at all!", "You wake up in the busy marketplace. Your pants are on your arms and over your head, and your shirt is on your legs.","You bought a horse for 20gp. She’s on her last legs, knock-kneed, toothless, swaybacked, and bad-tempered. She takes an instant dislike to you.","Somebody has shaved off all your hair. A quick check around your body reveals that, yes, they shaved ALL of your hair.","You make an enemy. This person, business, or organization is now hostile to you. The DM determines the offended party. You decide how you offended them.","You lose at the tables. Lose 1d8 x 6 gp.","You wake up in bed stinking terribly. -1 to all CHA checks for the day.","You find a holy book in the dresser drawer of your inn room. On the very first page hastily scrawled is 'the innkeeper is a vampire', with a splatter of blood next to it. The innkeeper is not a vampire."],
        2 : ["You wake up in jail on minor charges. Pay (1d10) x 10gp for bail or spend 1d4 days behind bars.","You wake up behind a tailor’s shop. You are wearing a ball gown made for a noblewoman. The rest of your clothing is missing.","A potion sits on your nightstand as you awake. It is labeled drink me! DM determines what it is, but it is a bad result.","You wake up on the floor of what seems to be a kennel surrounded by snoring war dogs. You smell awful.","You find yourself in a cage outside the city wall. You have no memory of how you got there or what for.","You wake up in the safe of a bank - gold, silver and 2 sleeping dwarves surround you. You'll have to stealthily leave, or they will bumble awake and disturb the guards.","You traded clothes with someone and are now missing a nice item.","You awaken with an entire small tavern’s worth of people crammed into your bed in various states of undress. You’re sticky with spilled beer, somebody has drawn a huge moustache on your face in soot, and you have a horrible feeling that one of your new friends missed the chamber pot in the middle of the night. There is vomit in your left boot, and the right is missing entirely.","You are caught up in a whirlwind romance. Roll a d20. On a 1-10, the romance ends badly end you are poisoned, suffering disadvantage until the next long rest. On an 11-20, the romance is hot and heavy, and ongoing.","You awake to see a monkey knife fight in progress in your room. If you leave, nothing happens. If you stay, you'll have to fight the winning monkey."],
        3 : ["You wake up in jail on minor charges, next to an NPC you previously made enemies with. Pay 100gp for bail or spend 1d4 days behind bars.","You lose modestly from gambling, to the tune of 1d20 × 4 gp.","You wake up snuggled up with an ogre in a jail cell. The guard comes up to the cell door, and shows you a contract you’ve signed, in which you promised the ogre that you would bring him home to his mountain.","Someone yells at you to wake up. It seems you challenged a Guard to a duel at noon. You have 15 minutes left, and you’re still drunk.","You wake up and discover your skin is now blue, if you skin was previously blue it is bright orange.","As you wake up you discover a shiny new tattoo on your chest, it glows and it seems to be some kind of rune. It glows whenever you're trying to be sneaky.","You come to your senses in the stocks. After a while, you’re fined 2d20gp and released if you pay, and if not, you’re left in the stocks for 1d4 hours, or until someone else pays. Lose 1d6+1 hp.","When you stagger downstairs into the tavern, a burly half-orc grabs you. Apparently you won an arm-wrestling contest against them last night, and they want a rematch. If you fail a CON save, you owe them 50 gp.","You wake up in the morning with a baby on your bed, and a note that says 'keep them alive for 1d4 days and you will be rewarded'.","You wake up next to a potion vial that is empty. Roll a d6 to determine which stat you have disadvantage on for the next 1d4 days."],
        4 : ["You contract the dreadful 'wheezing shivers' from a dalliance with a local trollop. You will lose a point of constitution until a Remove Curse Spell is cast within 1d4 days.","You wake up in a bed. Your belongings are on the nightstand next to it. You’re surrounded by dense forest in all directions. Up to the DM to determine if this is an illusion, or an actual forest.","You wake up with a new magic item in a bag with the original owner's name on it. Its original owner will want it back.","You wake up completely in the dark, unaware of where you are or how you got there, but you are surrounded by other possessions, including gold and a magic item (player is in a bag of holding, and had better figure out how to escape!).","You wake up wearing cement shoes! They are unable to be removed or broken without a remove curse spell. Your speed is halved for two days, at which point they disintegrate.","The player suffers from a crushing hangover and loses 1d4 dex points until their next long rest.","You wake up with terrible hiccups. You will suffer a -1 to all d20 rolls until your next long rest.","You wake up in a sneezing fit. You will miss every other turn for the entirety of the next battle you enter.","When in a drunken stupor you asked your god(s) to get you out of some stupid mess. Turns out they heard you! Now as repayment for saving you, you're under the effects of a quest spell. Complete in 2d8 days or DIE!","You wake up and cannot speak common! (this wears off after a short or long rest)."],
        4 : ["While gambling drunk, you promise your soul for a winning hand and are overheard by a passing ethereal devil. Taking it literally, you wake up the next morning with 1d100x2gp but the devil will materialize within 1d6 days to claim their dues.","The player contracts the dreadful 'wheezing shivers' from a dalliance with a local trollop. They will lose a point of constitution unless a Remove Curse spell is cast within 3 days.","You wake up in a bed. Your belongings are on the nightstand next to it. You’re surrounded by dense forest in all directions. Up to the DM to determine if this is an illusion, or an actual forest.","You wake up with a new magic item in a bag with the original owner's name on it. Its original owner will want it back.","You wake up completely in the dark, unaware of where you are or how you got there, but you are surrounded by other possessions, including gold and a magic item (player is in a bag of holding).","You wake up wearing cement shoes! They are unable to be removed or broken without a remove curse spell. Your speed is halved for two days, at which point they disintegrate.","The player suffers from a crushing hangover and loses 1d4 dex points until their next long rest.","You wake up with terrible hiccups. You will suffer a -1 to all d20 rolls until your next long rest.","You wake up in a sneezing fit. You will miss every other turn for the entirety of the next battle you enter.","When in a drunken stupor you asked your god(s) to get you out of some stupid mess. Turns out they heard you! Now as repayment for saving you, you're under the effects of a quest spell. Complete in 2d8 days or DIE!"],
        5 : ["While gambling drunk, you promise your soul for a winning hand and are overheard by a passing ethereal devil. Taking it literally, you wake up the next morning with 1d100x2gp but the devil will materialize within 1d6 days to claim their dues.","You wake up in the hut of a local witch. You are now, on a 1d4:  1 - green and slimey, 2 - 1/10 your original size, 3 - a toad, 4 - covered in fur. You will remain this way until your next long rest.","You awake in a regular looking tavern room with a note taped to you. It reads: `Beware of mimics`. You notice your pack with all your belongings on the floor beside the bed. The door is the mimic.","You wake up on a ship that has just disembarked. You're close enough to get back to land, if you're a strong enough swimmer.","The player's magical/pact/best weapon is replaced with a -1 cursed sword that looks and feels like it in every way, but the player wakes up to see their sword has been sharpened and they have cuts on them for 1d8 HP.","You wake up in an alley curled up in the arms of a large sleeping spider. Your throat is very sore. In 1d4 days, the egg laid in you will hatch and you will cough up spiders uncontrollably, causing you to miss 1d4 rounds during a battle.","A savage drunk is magically bound to your party until your next long rest! They can't fight, but you suffer disadvantage on initiative and dexterity checks while they are around.","You wake yourself up with a loud blazing fart. Turns out you drank something strange at night, and you fart actual fire. Your room is on fire! The INN is on fire!","Your character awakens on a ship that has already set sail!","You wake up bloody and beaten, and all of your equipment is gone."],
        6 : ["You wake up in jail, pending charges for a serious crime (treason, sedition, grand larceny, etc.). You actually did it.","You wake up across from a well-dressed but sinister man. In front of you is a contract detailing in extremely complex terms the exchange of power for your immortal soul. Sign, or suffer consequences!","You wake up, feeling no pain at all but missing one of the following on a d8: 1-2: nose, 3-4: arm, 5-6: leg, 7: eye, 8: tongue.","You wake up with a leg for an arm and an arm for a leg. It's actually just a curse, but until you learn that and have it removed, you can't fight with two weapons, or use a bow.","After arguing with a magician, one of the player's hands is cursed and now possesses an opposite alignment. To perform tasks the hand would disagree with, the player must make a wisdom save to complete them.","The player has a drug-enhanced dream that semi-transports their dreaming mind to the lower planes. They attract the attention of a pack of Hellhounds which then travel to the material plane in 1d6 days to pursue them relentlessly.","You met and married a dangerous creature. On a d4 roll: 1 - harpy, 2 - medusa, 3 - werewolf, 4 - succubus. Though not mean towards the player or their friends, this spouse will make increasingly difficult requests, and fly into a rage if not completed.","You wake up and can no longer speak common.","You wake up with gauntlets on that prevent you from casting more than a cantrip, and a note says that they can be removed after you apologize – no name.","You wake up in the bag of holding of one of your enemies. You'd better figure out how to escape it!"],
    }
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