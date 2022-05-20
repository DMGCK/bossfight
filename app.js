const playerDefault = {
  id: 'player',
  health: 100,
  level: 1,
  equipCoefficient: 1,
  healthID: 'player-health',
  image: 'http://www.artofmtg.com/wp-content/uploads/2022/04/Ob-Nixilis-the-Adversary-Variant-2-Streets-of-New-Capenna-MtG-Art.jpg',

}

const bossDefault = {
  id: 'boss',
  health: 100,
  healthID: 'boss-health',
  level: 4,
  image: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/6/6c/Teferi%2C_master_of_time.jpg/revision/latest/scale-to-width-down/735?cb=20200807175610',
}

//NOTE  exactly the same as default, bc they are references to it
// let player = JSON.parse(JSON.stringify(playerDefault)); OLD VERSION



let player = playerDefault;
let boss = bossDefault;

let allThings = // a little funky
{player: {default: JSON.parse(JSON.stringify(playerDefault)), name: player}, 
  boss: {default: JSON.parse(JSON.stringify(bossDefault)), name: boss},
}



function updateHealth(char, dmgSource) {
  
  let charElem = document.getElementById(char.healthID);
  // console.log(char.health, ' total health @ operation'); 
  
  if (!dmgSource) {
    // console.log('reset success'); 
    charElem.style.width = ((char.health + '%')) // TODO wrong spot for level up stuff
    debugger
  }
  else
  if (char.health < 0 || char.health == 0) { //overkill clause
    console.log(char); 
    console.log('got into overkill clause', char.id); 
      
    char.health = 0; //Sets bosses health to 0 if levels up, must be BEFORE levelup is called 
      levelUp(char.id);
    }
    if (dmgSource.health > 0) {

      char.health -= dmgFunc(dmgSource);
      charElem.style.width = (char.health + '%')
    }
  }




function dmgFunc(dmgSource) { // TODO will eventually take who is doing the damage?????
  let rand = ((Math.floor(Math.random() * 20) + 90) / 100)
  // console.log(rand, dmgSource); 
  
  switch(dmgSource) {
    case boss: 
    // console.log('the boss is dealing damage', rand); 
    return Math.ceil((5 * boss.level) * rand)

    case player:return  Math.floor((5 * (player.level * .8)) * rand)

    default: return 5
  }

}

function bossAttack() {
  //SG list of targets to attack

  //boss.level is multiplier for damage
  // console.log('i will hurt', player); 
  if (boss.health != 0) { // the boss can't attack if dead
    updateHealth(player, boss)
  }
}

function basicReset() {
  for (key in allThings) {
    // console.log(allThings[key].name.health); 
    allThings[key].name.health = allThings[key].default.health
    updateHealth(allThings[key].name, null);
  }
}

function levelUp(char) { //NOTE PASS IN A STRING FOR GODS SAKES
  console.log('attempting levelup', char); 
  
  if (char) {
    // console.log(allThings[char].name.level, ' levelling up'); 
    
    switch(allThings[char].name) {
      case boss:  
      allThings[char].name.level++;
      boss.health = allThings.boss.default.health + (100 * boss.level)
      updateHealth(boss, player); break
      
      // console.log('INSIDE BOSS SWITCH STATEMENT', boss.level); 
      // console.log(boss.health); 
      //* (2 ** boss.level) LITERALLY WAY TOO EXTREME 

      default: console.log('default levelup'); break; 
      
    }
  }


  //* (2 ** char.level) boss formula
}


// NOTE startup

setInterval(bossAttack, 3000)

// fun autoattack
// let any = allchr
// if any.chr has autoattack
// then autoattack when called, dealing damage to set target
// 
// alt version, set an interval for each char 