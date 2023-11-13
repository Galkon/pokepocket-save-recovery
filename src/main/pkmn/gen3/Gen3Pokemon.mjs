import {readString} from './utils.mjs'

const orders = ['GAEM', 'GAME', 'GEAM', 'GEMA', 'GMAE', 'GMEA', 'AGEM', 'AGME', 'AEGM', 'AEMG', 'AMGE', 'AMEG', 'EGAM', 'EGMA', 'EAGM', 'EAMG', 'EMGA', 'EMAG', 'MGAE', 'MGEA', 'MAGE', 'MAEG', 'MEGA', 'MEAG']

export default class Gen3Pokemon {
  constructor(pkm) {
    this.data = pkm;
    this.name = readString(pkm.slice(8, 18));
    const trainerName = readString(pkm.slice(20, 27));

    // If both trainer name and Pokemon name are empty, then it's invalid data
    if (!trainerName && !this.name) {
      throw new Error('Invalid Pokémon data.');
    }

    this.personality = pkm.readUInt32LE(0);
    this.trainerId = pkm.readUInt32LE(4);
    this.trainerName = trainerName;
    const key = this.trainerId ^ this.personality;

    const order = this.personality % 24;
    const orderString = orders[order];
    let sections = {};

    for (let i = 0; i < 4; i++) {
      const sectionKey = orderString[i];
      const sectionData = pkm.slice(32 + i * 12, 32 + (i + 1) * 12);
      sections[sectionKey] = this.decryptSubsection(sectionData, key);
    }

    const decryptedData = Buffer.concat([sections['G'], sections['A'], sections['E'], sections['M']]);

    // Assigning properties based on decrypted data
    this.speciesId = decryptedData.readUInt16LE(0);
    this.exp = decryptedData.readUInt32LE(4);
    this.species = this.speciesName(this.speciesId);
    this.kantoId = this.getKantoId(this.speciesId);
    this.expGroup = this.getExpGroup(this.speciesId);
    this.level = this.getLevel(this.expGroup, this.exp);

    if (!this.name) {
      this.name = this.species.toUpperCase();
    }

    // Parsing moves
    this.moves = [];
    for (let i = 0; i < 4; i++) {
      const moveId = decryptedData.readUInt16LE(8 + i * 2);
      if (moveId !== 0) {
        this.moves.push({
          id: moveId,
          name: this.moveName(moveId),
          pp: decryptedData.readUInt8(20 + i),
        });
      }
    }

    this.nature = this.natureName(this.personality % 25);
    this.ivs = this.getIvs(decryptedData.readUInt32LE(28));
    this.evs = this.getEvs(decryptedData.slice(12, 24));
  }

  getKantoId(id) {
    const kanto = [252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 290, 291, 292, 276, 277, 285, 286, 327, 278, 279, 283, 284, 320, 321, 300, 301, 352, 343, 344, 299, 324, 302, 339, 340, 370, 341, 342, 349, 350, 318, 319, 328, 329, 330, 296, 297, 309, 310, 322, 323, 363, 364, 365, 331, 332, 361, 362, 337, 338, 298, 325, 326, 311, 312, 303, 307, 308, 333, 334, 360, 355, 356, 315, 287, 288, 289, 316, 317, 357, 293, 294, 295, 366, 367, 368, 359, 353, 354, 336, 335, 369, 304, 305, 306, 351, 313, 314, 345, 346, 347, 348, 280, 281, 282, 371, 372, 373, 374, 375, 376, 377, 378, 379, 382, 383, 384, 380, 381, 385, 386, 358]
    if (id <= 251) return id;
    if (id >= 413) return 201;
    const ix = id - 277;
    return kanto[ix] || 0;
  }

  speciesName(id) {
    const names = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran (F)", "Nidorina", "Nidoqueen", "Nidoran (M)", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Nincada", "Ninjask", "Shedinja", "Taillow", "Swellow", "Shroomish", "Breloom", "Spinda", "Wingull", "Pelipper", "Surskit", "Masquerain", "Wailmer", "Wailord", "Skitty", "Delcatty", "Kecleon", "Baltoy", "Claydol", "Nosepass", "Torkoal", "Sableye", "Barboach", "Whiscash", "Luvdisc", "Corphish", "Crawdaunt", "Feebas", "Milotic", "Carvanha", "Sharpedo", "Trapinch", "Vibrava", "Flygon", "Makuhita", "Hariyama", "Electrike", "Manectric", "Numel", "Camerupt", "Spheal", "Sealeo", "Walrein", "Cacnea", "Cacturne", "Snorunt", "Glalie", "Lunatone", "Solrock", "Azurill", "Spoink", "Grumpig", "Plusle", "Minun", "Mawile", "Meditite", "Medicham", "Swablu", "Altaria", "Wynaut", "Duskull", "Dusclops", "Roselia", "Slakoth", "Vigoroth", "Slaking", "Gulpin", "Swalot", "Tropius", "Whismur", "Loudred", "Exploud", "Clamperl", "Huntail", "Gorebyss", "Absol", "Shuppet", "Banette", "Seviper", "Zangoose", "Relicanth", "Aron", "Lairon", "Aggron", "Castform", "Volbeat", "Illumise", "Lileep", "Cradily", "Anorith", "Armaldo", "Ralts", "Kirlia", "Gardevoir", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Kyogre", "Groudon", "Rayquaza", "Latias", "Latios", "Jirachi", "Deoxys", "Chimecho", "Pok\u00e9mon Egg", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown", "Unown"]
    return names[id - 1] || "";
  }

  moveName(id) {
    const moves = ["Pound", "Karate Chop", "Double Slap", "Comet Punch", "Mega Punch", "Pay Day", "Fire Punch", "Ice Punch", "Thunder Punch", "Scratch", "Vice Grip", "Guillotine", "Razor Wind", "Swords Dance", "Cut", "Gust", "Wing Attack", "Whirlwind", "Fly", "Bind", "Slam", "Vine Whip", "Stomp", "Double Kick", "Mega Kick", "Jump Kick", "Rolling Kick", "Sand Attack", "Headbutt", "Horn Attack", "Fury Attack", "Horn Drill", "Tackle", "Body Slam", "Wrap", "Take Down", "Thrash", "Double-Edge", "Tail Whip", "Poison Sting", "Twineedle", "Pin Missile", "Leer", "Bite", "Growl", "Roar", "Sing", "Supersonic", "Sonic Boom", "Disable", "Acid", "Ember", "Flamethrower", "Mist", "Water Gun", "Hydro Pump", "Surf", "Ice Beam", "Blizzard", "Psybeam", "Bubble Beam", "Aurora Beam", "Hyper Beam", "Peck", "Drill Peck", "Submission", "Low Kick", "Counter", "Seismic Toss", "Strength", "Absorb", "Mega Drain", "Leech Seed", "Growth", "Razor Leaf", "Solar Beam", "Poison Powder", "Stun Spore", "Sleep Powder", "Petal Dance", "String Shot", "Dragon Rage", "Fire Spin", "Thunder Shock", "Thunderbolt", "Thunder Wave", "Thunder", "Rock Throw", "Earthquake", "Fissure", "Dig", "Toxic", "Confusion", "Psychic", "Hypnosis", "Meditate", "Agility", "Quick Attack", "Rage", "Teleport", "Night Shade", "Mimic", "Screech", "Double Team", "Recover", "Harden", "Minimize", "Smokescreen", "Confuse Ray", "Withdraw", "Defense Curl", "Barrier", "Light Screen", "Haze", "Reflect", "Focus Energy", "Bide", "Metronome", "Mirror Move", "Self-Destruct", "Egg Bomb", "Lick", "Smog", "Sludge", "Bone Club", "Fire Blast", "Waterfall", "Clamp", "Swift", "Skull Bash", "Spike Cannon", "Constrict", "Amnesia", "Kinesis", "Soft-Boiled", "High Jump Kick", "Glare", "Dream Eater", "Poison Gas", "Barrage", "Leech Life", "Lovely Kiss", "Sky Attack", "Transform", "Bubble", "Dizzy Punch", "Spore", "Flash", "Psywave", "Splash", "Acid Armor", "Crabhammer", "Explosion", "Fury Swipes", "Bonemerang", "Rest", "Rock Slide", "Hyper Fang", "Sharpen", "Conversion", "Tri Attack", "Super Fang", "Slash", "Substitute", "Struggle", "Sketch", "Triple Kick", "Thief", "Spider Web", "Mind Reader", "Nightmare", "Flame Wheel", "Snore", "Curse", "Flail", "Conversion 2", "Aeroblast", "Cotton Spore", "Reversal", "Spite", "Powder Snow", "Protect", "Mach Punch", "Scary Face", "Feint Attack", "Sweet Kiss", "Belly Drum", "Sludge Bomb", "Mud-Slap", "Octazooka", "Spikes", "Zap Cannon", "Foresight", "Destiny Bond", "Perish Song", "Icy Wind", "Detect", "Bone Rush", "Lock-On", "Outrage", "Sandstorm", "Giga Drain", "Endure", "Charm", "Rollout", "False Swipe", "Swagger", "Milk Drink", "Spark", "Fury Cutter", "Steel Wing", "Mean Look", "Attract", "Sleep Talk", "Heal Bell", "Return", "Present", "Frustration", "Safeguard", "Pain Split", "Sacred Fire", "Magnitude", "Dynamic Punch", "Megahorn", "Dragon Breath", "Baton Pass", "Encore", "Pursuit", "Rapid Spin", "Sweet Scent", "Iron Tail", "Metal Claw", "Vital Throw", "Morning Sun", "Synthesis", "Moonlight", "Hidden Power", "Cross Chop", "Twister", "Rain Dance", "Sunny Day", "Crunch", "Mirror Coat", "Psych Up", "Extreme Speed", "Ancient Power", "Shadow Ball", "Future Sight", "Rock Smash", "Whirlpool", "Beat Up", "Fake Out", "Uproar", "Stockpile", "Spit Up", "Swallow", "Heat Wave", "Hail", "Torment", "Flatter", "Will-O-Wisp", "Memento", "Facade", "Focus Punch", "Smelling Salts", "Follow Me", "Nature Power", "Charge", "Taunt", "Helping Hand", "Trick", "Role Play", "Wish", "Assist", "Ingrain", "Superpower", "Magic Coat", "Recycle", "Revenge", "Brick Break", "Yawn", "Knock Off", "Endeavor", "Eruption", "Skill Swap", "Imprison", "Refresh", "Grudge", "Snatch", "Secret Power", "Dive", "Arm Thrust", "Camouflage", "Tail Glow", "Luster Purge", "Mist Ball", "Feather Dance", "Teeter Dance", "Blaze Kick", "Mud Sport", "Ice Ball", "Needle Arm", "Slack Off", "Hyper Voice", "Poison Fang", "Crush Claw", "Blast Burn", "Hydro Cannon", "Meteor Mash", "Astonish", "Weather Ball", "Aromatherapy", "Fake Tears", "Air Cutter", "Overheat", "Odor Sleuth", "Rock Tomb", "Silver Wind", "Metal Sound", "Grass Whistle", "Tickle", "Cosmic Power", "Water Spout", "Signal Beam", "Shadow Punch", "Extrasensory", "Sky Uppercut", "Sand Tomb", "Sheer Cold", "Muddy Water", "Bullet Seed", "Aerial Ace", "Icicle Spear", "Iron Defense", "Block", "Howl", "Dragon Claw", "Frenzy Plant", "Bulk Up", "Bounce", "Mud Shot", "Poison Tail", "Covet", "Volt Tackle", "Magical Leaf", "Water Sport", "Calm Mind", "Leaf Blade", "Dragon Dance", "Rock Blast", "Shock Wave", "Water Pulse", "Doom Desire", "Psycho Boost"]
    return moves[id - 1] || "";
  }

  natureName(id) {
    const natures = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile", "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest", "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"]
    return natures[id] || "";
  }

  moveType(id) {
    return ""
  }

  getExpGroup(id) {
    const groups = ['Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Slow', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Medium Fast', 'Slow', 'Slow', 'Medium Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Fast', 'Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Fast', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Fast', 'Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Slow', 'Fast', 'Medium Fast', 'Medium Fast', 'Fast', 'Slow', 'Slow', 'Slow', 'Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Slow', 'Fast', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Medium Slow', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Erratic', 'Erratic', 'Erratic', 'Medium Slow', 'Medium Slow', 'Fluctuating', 'Fluctuating', 'Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Fluctuating', 'Fluctuating', 'Fast', 'Fast', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Fast', 'Fluctuating', 'Fluctuating', 'Erratic', 'Erratic', 'Slow', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Fluctuating', 'Fluctuating', 'Slow', 'Slow', 'Medium Fast', 'Medium Fast', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Medium Fast', 'Medium Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Fast', 'Medium Fast', 'Medium Fast', 'Erratic', 'Erratic', 'Medium Fast', 'Fast', 'Fast', 'Medium Slow', 'Slow', 'Slow', 'Slow', 'Fluctuating', 'Fluctuating', 'Slow', 'Medium Slow', 'Medium Slow', 'Medium Slow', 'Erratic', 'Erratic', 'Erratic', 'Medium Slow', 'Fast', 'Fast', 'Fluctuating', 'Erratic', 'Slow', 'Slow', 'Slow', 'Slow', 'Medium Fast', 'Erratic', 'Fluctuating', 'Erratic', 'Erratic', 'Erratic', 'Erratic', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Fast']
    return groups[id - 1] || "";
  }

  getLevel(expgroup, exp) {
    // The level experience points need to be defined for each experience group
    const levelExpPoints = {
      'Fast': [0, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 800000],
      'Medium Fast': [0, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1000000],
      'Medium Slow': [0, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 1059860],
      'Slow': [0, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 1250000],
      'Erratic': [0, 15, 52, 122, 237, 406, 637, 942, 1326, 1800, 2369, 3041, 3822, 4719, 5737, 6881, 8155, 9564, 11111, 12800, 14632, 16610, 18737, 21012, 23437, 26012, 28737, 31610, 34632, 37800, 41111, 44564, 48155, 51881, 55737, 59719, 63822, 68041, 72369, 76800, 81326, 85942, 90637, 95406, 100237, 105122, 110052, 115015, 120001, 125000, 131324, 137795, 144410, 151165, 158056, 165079, 172229, 179503, 186894, 194400, 202013, 209728, 217540, 225443, 233431, 241496, 249633, 257834, 267406, 276458, 286328, 296358, 305767, 316074, 326531, 336255, 346965, 357812, 367807, 378880, 390077, 400293, 411686, 423190, 433572, 445239, 457001, 467489, 479378, 491346, 501878, 513934, 526049, 536557, 548720, 560922, 571333, 583539, 591882, 600000],
      'Fluctuating': [0, 4, 13, 32, 65, 112, 178, 276, 393, 540, 745, 967, 1230, 1591, 1957, 2457, 3046, 3732, 4526, 5440, 6482, 7666, 9003, 10506, 12187, 14060, 16140, 18439, 20974, 23760, 26811, 30146, 33780, 37731, 42017, 46656, 50653, 55969, 60505, 66560, 71677, 78533, 84277, 91998, 98415, 107069, 114205, 123863, 131766, 142500, 151222, 163105, 172697, 185807, 196322, 210739, 222231, 238036, 250562, 267840, 281456, 300293, 315059, 335544, 351520, 373744, 390991, 415050, 433631, 459620, 479600, 507617, 529063, 559209, 582187, 614566, 639146, 673863, 700115, 737280, 765275, 804997, 834809, 877201, 908905, 954084, 987754, 1035837, 1071552, 1122660, 1160499, 1214753, 1254796, 1312322, 1354652, 1415577, 1460276, 1524731, 1571884, 1640000],
    };

    // Get the array of experience points for the given experience group
    const expPoints = levelExpPoints[expgroup];

    // Find the level based on experience points
    for (let level = 1; level < expPoints.length; level++) {
      if (exp < expPoints[level]) {
        return level; // Return the level before the experience exceeds the threshold
      }
    }

    return 100; // If the loop completes, the Pokémon is at maximum level
  }

  getIvs(value) {
    // Convert the value to a 32-bit binary string, padding with zeros if necessary
    const bitString = value.toString(2).padStart(32, '0');

    // Extract IVs from the bit string. Each IV is 5 bits long.
    return {
      hp: parseInt(bitString.substring(0, 5), 2),
      attack: parseInt(bitString.substring(5, 10), 2),
      defense: parseInt(bitString.substring(10, 15), 2),
      speed: parseInt(bitString.substring(15, 20), 2),
      spAtk: parseInt(bitString.substring(20, 25), 2),
      spDef: parseInt(bitString.substring(25, 30), 2),
    };
  }

  getEvs(section) {
    // Ensure section is a Buffer or Uint8Array and has the correct length
    if (!(section instanceof Buffer) || section.length < 12) {
      throw new Error('Invalid section data. Must be a buffer with at least 12 bytes.');
    }

    return {
      hp: section.readUInt8(0),
      attack: section.readUInt8(1),
      defense: section.readUInt8(2),
      speed: section.readUInt8(3),
      spAtk: section.readUInt8(4),
      spDef: section.readUInt8(5),
      cool: section.readUInt8(6),
      beauty: section.readUInt8(7),
      cute: section.readUInt8(8),
      smart: section.readUInt8(9),
      tough: section.readUInt8(10),
      feel: section.readUInt8(11),
    };
  }

  decryptSubsection(data, key) {
    const decrypted = Buffer.alloc(12);
    for (let i = 0; i < 3; i++) {
      const value = (data.readUInt32LE(i * 4) ^ key) >>> 0; // Convert to unsigned 32-bit integer
      decrypted.writeUInt32LE(value, i * 4);
    }
    return decrypted;
  }

  readString(text) {
    const chars = "0123456789!?.-         ,  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let ret = "";

    for (const byte of text) {
      const c = byte - 161;
      if (c < 0 || c >= chars.length) {
        ret += " ";
      } else {
        ret += chars[c];
      }
    }

    return ret.trim();
  }
}
