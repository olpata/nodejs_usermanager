function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  function d6() {
    return Math.random() * (7 - 1) + 1;
  }

module.exports.crisisPrepare = function(event,hero,crisis,hero_after) {
    var crisis = {};
    crisis.name = event.name;
    crisis.img = event.img;
    crisis.desc = event.desc;
    var hero_after = {};
    hero_after = Object.assign({}, hero); 

    //want 
    //crisis:{name:"Find a shiny thing",img:"./assets/events/question.png",desc:"You see some thing shiny in a mud. You try to take from dirt."
    //         ,challenge:{type:"dex",diff_level:0,curr_level:4,dice_count:1,roll_results:3,ispass:true}
    //         ,post_challenge:{desc:'challenge success. You get item knife.'} }
    //,hero_after: {items:items.slice(),stats:stats,eventPool:eventPool,goals:goals}
    //data.hero_after.items.push(data.hero_after.items[0]);
    var challenge_hero_stat = 2;//load from hero.stats
    var challenge_items_stat = -1;//load from hero.items
    var challenge_actual = 0;
    var challenge_need = 0;
    var nl = "</br>";
    crisis.post_challenge = {};
    crisis.post_challenge.desc = "";
    crisis.challenge = {};
    console.log(`xx = ${JSON.stringify(event)}`);
    var thisChallenge = event.challenges[0];
    crisis.challenge.type = thisChallenge.type;
    crisis.post_challenge.desc += `<p>You do test of ${crisis.challenge.type}.</p>`+nl;
    crisis.challenge.diff_level = thisChallenge.diff;
    crisis.challenge.dice_count = 1;
    crisis.challenge.curr_level = challenge_hero_stat+challenge_items_stat;
    crisis.challenge.roll_results = d6() ;//random d6
    
    challenge_actual = crisis.challenge.roll_results+crisis.challenge.curr_level;
    challenge_need = 6+crisis.challenge.diff_level;
    crisis.post_challenge.desc += `<p>You roll challenge_actual of challenge_need.</p>`+nl;
    if (challenge_actual > challenge_need)
    {
        //success
        crisis.challenge.ispass = true;
        crisis.post_challenge.desc += `<p>Your test is success.</p>`;
        crisis.post_challenge.desc += `${thisChallenge.success.desc}`+nl;
        thisChallenge.success.effects.forEach(effect => {
            //TODO: add effects
            
        });
    }else {
        //fail
        crisis.challenge.ispass = false;
        crisis.post_challenge.desc += `<p>Your test is fail.</p>`;
        crisis.post_challenge.desc += `${thisChallenge.fail.desc}`+nl;
        thisChallenge.fail.effects.forEach(effect => {
            //TODO: add effects
            
        });
    }



    //do crisis calc - crisis.challenge and crisis.post_chalenge


    //update hero_after
    console.log(`xx = ${JSON.stringify(crisis)}`);
    console.log(`xx = ${JSON.stringify(hero_after)}`);
    return [crisis,hero_after];
} ;