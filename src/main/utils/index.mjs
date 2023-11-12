
export function splitUp(arr, n) {
  var rest = arr.length % n, // how much to divide
    restUsed = rest, // to keep track of the division over the elements
    partLength = Math.floor(arr.length / n),
    result = [];

  for (var i = 0; i < arr.length; i += partLength) {
    var end = partLength + i,
      add = false;

    if (rest !== 0 && restUsed) { // should add one element for the division
      end++;
      restUsed--; // we've used one division element now
      add = true;
    }

    result.push(arr.slice(i, end)); // part of the array

    if (add) {
      i++; // also increment i in the case we added an extra element for division
    }
  }

  return result;
}


export const GEN_1_POKEMAP = {
  0x01:'Rhydon',
  0x02:'Kangaskhan',
  0x03:'Nidoran♂',
  0x04:'Clefairy',
  0x05:'Spearow',
  0x06:'Voltorb',
  0x07:'Nidoking',
  0x08:'Slowbro',
  0x09:'Ivysaur',
  0x0A:'Exeggutor',
  0x0B:'Lickitung',
  0x0C:'Exeggcute',
  0x0D:'Grimer',
  0x0E:'Gengar',
  0x0F:'Nidoran♀',
  0x10:'Nidoqueen',
  0x11:'Cubone',
  0x12:'Rhyhorn',
  0x13:'Lapras',
  0x14:'Arcanine',
  0x15:'Mew',
  0x16:'Gyarados',
  0x17:'Shellder',
  0x18:'Tentacool',
  0x19:'Gastly',
  0x1A:'Scyther',
  0x1B:'Staryu',
  0x1C:'Blastoise',
  0x1D:'Pinsir',
  0x1E:'Tangela',
  0x1F:'MissingNo.(Scizor)',
  0x20:'MissingNo.(Shuckle)',
  0x21:'Growlithe',
  0x22:'Onix',
  0x23:'Fearow',
  0x24:'Pidgey',
  0x25:'Slowpoke',
  0x26:'Kadabra',
  0x27:'Graveler',
  0x28:'Chansey',
  0x29:'Machoke',
  0x2A:'Mr.Mime',
  0x2B:'Hitmonlee',
  0x2C:'Hitmonchan',
  0x2D:'Arbok',
  0x2E:'Parasect',
  0x2F:'Psyduck',
  0x30:'Drowzee',
  0x31:'Golem',
  0x32:'MissingNo.(Heracross)',
  0x33:'Magmar',
  0x34:'MissingNo.(Ho-Oh)',
  0x35:'Electabuzz',
  0x36:'Magneton',
  0x37:'Koffing',
  0x38:'MissingNo.(Sneasel)',
  0x39:'Mankey',
  0x3A:'Seel',
  0x3B:'Diglett',
  0x3C:'Tauros',
  0x3D:'MissingNo.(Teddiursa)',
  0x3E:'MissingNo.(Ursaring)',
  0x3F:'MissingNo.(Slugma)',
  0x40:'Farfetch\'d',
  0x41:'Venonat',
  0x42:'Dragonite',
  0x43:'MissingNo.(Magcargo)',
  0x44:'MissingNo.(Swinub)',
  0x45:'MissingNo.(Piloswine)',
  0x46:'Doduo',
  0x47:'Poliwag',
  0x48:'Jynx',
  0x49:'Moltres',
  0x4A:'Articuno',
  0x4B:'Zapdos',
  0x4C:'Ditto',
  0x4D:'Meowth',
  0x4E:'Krabby',
  0x4F:'MissingNo.(Corsola)',
  0x50:'MissingNo.(Remoraid)',
  0x51:'MissingNo.(Octillery)',
  0x52:'Vulpix',
  0x53:'Ninetales',
  0x54:'Pikachu',
  0x55:'Raichu',
  0x56:'MissingNo.(Delibird)',
  0x57:'MissingNo.(Mantine)',
  0x58:'Dratini',
  0x59:'Dragonair',
  0x5A:'Kabuto',
  0x5B:'Kabutops',
  0x5C:'Horsea',
  0x5D:'Seadra',
  0x5E:'MissingNo.(Skarmory)',
  0x5F:'MissingNo.(Houndour)',
  0x60:'Sandshrew',
  0x61:'Sandslash',
  0x62:'Omanyte',
  0x63:'Omastar',
  0x64:'Jigglypuff',
  0x65:'Wigglytuff',
  0x66:'Eevee',
  0x67:'Flareon',
  0x68:'Jolteon',
  0x69:'Vaporeon',
  0x6A:'Machop',
  0x6B:'Zubat',
  0x6C:'Ekans',
  0x6D:'Paras',
  0x6E:'Poliwhirl',
  0x6F:'Poliwrath',
  0x70:'Weedle',
  0x71:'Kakuna',
  0x72:'Beedrill',
  0x73:'MissingNo.(Houndoom)',
  0x74:'Dodrio',
  0x75:'Primeape',
  0x76:'Dugtrio',
  0x77:'Venomoth',
  0x78:'Dewgong',
  0x79:'MissingNo.(Kingdra)',
  0x7A:'MissingNo.(Phanpy)',
  0x7B:'Caterpie',
  0x7C:'Metapod',
  0x7D:'Butterfree',
  0x7E:'Machamp',
  0x7F:'MissingNo.(Donphan)',
  0x80:'Golduck',
  0x81:'Hypno',
  0x82:'Golbat',
  0x83:'Mewtwo',
  0x84:'Snorlax',
  0x85:'Magikarp',
  0x86:'MissingNo.(Porygon2)',
  0x87:'MissingNo.(Stantler)',
  0x88:'Muk',
  0x89:'MissingNo.(Smeargle)',
  0x8A:'Kingler',
  0x8B:'Cloyster',
  0x8C:'MissingNo.(Tyrogue)',
  0x8D:'Electrode',
  0x8E:'Clefable',
  0x8F:'Weezing',
  0x90:'Persian',
  0x91:'Marowak',
  0x92:'MissingNo.(Hitmontop)',
  0x93:'Haunter',
  0x94:'Abra',
  0x95:'Alakazam',
  0x96:'Pidgeotto',
  0x97:'Pidgeot',
  0x98:'Starmie',
  0x99:'Bulbasaur',
  0x9A:'Venusaur',
  0x9B:'Tentacruel',
  0x9C:'MissingNo.(Smoochum)',
  0x9D:'Goldeen',
  0x9E:'Seaking',
  0x9F:'MissingNo.(Elekid)',
  0xA0:'MissingNo.(Magby)',
  0xA1:'MissingNo.(Miltank)',
  0xA2:'MissingNo.(Blissey)',
  0xA3:'Ponyta',
  0xA4:'Rapidash',
  0xA5:'Rattata',
  0xA6:'Raticate',
  0xA7:'Nidorino',
  0xA8:'Nidorina',
  0xA9:'Geodude',
  0xAA:'Porygon',
  0xAB:'Aerodactyl',
  0xAC:'MissingNo.(Raikou)',
  0xAD:'Magnemite',
  0xAE:'MissingNo.(Entei)',
  0xAF:'MissingNo.(Suicune)',
  0xB0:'Charmander',
  0xB1:'Squirtle',
  0xB2:'Charmeleon',
  0xB3:'Wartortle',
  0xB4:'Charizard',
  0xB5:'MissingNo.(Larvitar)',
  0xB6:'MissingNo.KabutopsFossil(Pupitar)',
  0xB7:'MissingNo.AerodactylFossil(Tyranitar)',
  0xB8:'MissingNo.Ghost(Lugia)',
  0xB9:'Oddish',
  0xBA:'Gloom',
  0xBB:'Vileplume',
  0xBC:'Bellsprout',
  0xBD:'Weepinbell',
  0xBE:'Victreebel'
}

export const GEN_1_CHARMAP = {
  0x80: 'A',
  0x81: 'B',
  0x82: 'C',
  0x83: 'D',
  0x84: 'E',
  0x85: 'F',
  0x86: 'G',
  0x87: 'H',
  0x88: 'I',
  0x89: 'J',
  0x8A: 'K',
  0x8B: 'L',
  0x8C: 'M',
  0x8D: 'N',
  0x8E: 'O',
  0x8F: 'P',
  0x90: 'Q',
  0x91: 'R',
  0x92: 'S',
  0x93: 'T',
  0x94: 'U',
  0x95: 'V',
  0x96: 'W',
  0x97: 'X',
  0x98: 'Y',
  0x99: 'Z',
  0x9A: '(',
  0x9B: ')',
  0x9C: ':',
  0x9D: ';',
  0x9E: '[',
  0x9F: ']',
  0xA0: 'a',
  0xA1: 'b',
  0xA2: 'c',
  0xA3: 'd',
  0xA4: 'e',
  0xA5: 'f',
  0xA6: 'g',
  0xA7: 'h',
  0xA8: 'i',
  0xA9: 'j',
  0xAA: 'k',
  0xAB: 'l',
  0xAC: 'm',
  0xAD: 'n',
  0xAE: 'o',
  0xAF: 'p',
  0xB0: 'q',
  0xB1: 'r',
  0xB2: 's',
  0xB3: 't',
  0xB4: 'u',
  0xB5: 'v',
  0xB6: 'w',
  0xB7: 'x',
  0xB8: 'y',
  0xB9: 'z',
  0xBA: 'é',
  0xBB: '\'d',
  0xBC: '\'l',
  0xBD: '\'s',
  0xBE: '\'t',
  0xBF: '\'v',
  0xEF: '♂',
  0xE0: '\'',
  0xE4: '-',
  0xE7: '?',
  0xE8: '!',
  0xE9: '.',
  0xF2: '.',
  0xF3: '/',
  0xF4: ',',
  0xF5: '♀',
  0xF6: '0',
  0xF7: '1',
  0xF8: '2',
  0xF9: '3',
  0xFA: '4',
  0xFB: '5',
  0xFC: '6',
  0xFD: '7',
  0xFE: '8',
  0xFF: '9'
}

export const MOVES_ARRAY = [
  // Array is 1-indexed
  "",
  "Pound",
  "Karate Chop",
  "Double Slap",
  "Comet Punch",
  "Mega Punch",
  "Pay Day",
  "Fire Punch",
  "Ice Punch",
  "Thunder Punch",
  "Scratch",
  "Vice Grip",
  "Guillotine",
  "Razor Wind",
  "Swords Dance",
  "Cut",
  "Gust",
  "Wing Attack",
  "Whirlwind",
  "Fly",
  "Bind",
  "Slam",
  "Vine Whip",
  "Stomp",
  "Double Kick",
  "Mega Kick",
  "Jump Kick",
  "Rolling Kick",
  "Sand Attack",
  "Headbutt",
  "Horn Attack",
  "Fury Attack",
  "Horn Drill",
  "Tackle",
  "Body Slam",
  "Wrap",
  "Take Down",
  "Thrash",
  "Double-Edge",
  "Tail Whip",
  "Poison Sting",
  "Twineedle",
  "Pin Missile",
  "Leer",
  "Bite",
  "Growl",
  "Roar",
  "Sing",
  "Supersonic",
  "Sonic Boom",
  "Disable",
  "Acid",
  "Ember",
  "Flamethrower",
  "Mist",
  "Water Gun",
  "Hydro Pump",
  "Surf",
  "Ice Beam",
  "Blizzard",
  "Psybeam",
  "Bubble Beam",
  "Aurora Beam",
  "Hyper Beam",
  "Peck",
  "Drill Peck",
  "Submission",
  "Low Kick",
  "Counter",
  "Seismic Toss",
  "Strength",
  "Absorb",
  "Mega Drain",
  "Leech Seed",
  "Growth",
  "Razor Leaf",
  "Solar Beam",
  "Poison Powder",
  "Stun Spore",
  "Sleep Powder",
  "Petal Dance",
  "String Shot",
  "Dragon Rage",
  "Fire Spin",
  "Thunder Shock",
  "Thunderbolt",
  "Thunder Wave",
  "Thunder",
  "Rock Throw",
  "Earthquake",
  "Fissure",
  "Dig",
  "Toxic",
  "Confusion",
  "Psychic",
  "Hypnosis",
  "Meditate",
  "Agility",
  "Quick Attack",
  "Rage",
  "Teleport",
  "Night Shade",
  "Mimic",
  "Screech",
  "Double Team",
  "Recover",
  "Harden",
  "Minimize",
  "Smokescreen",
  "Confuse Ray",
  "Withdraw",
  "Defense Curl",
  "Barrier",
  "Light Screen",
  "Haze",
  "Reflect",
  "Focus Energy",
  "Bide",
  "Metronome",
  "Mirror Move",
  "Self-Destruct",
  "Egg Bomb",
  "Lick",
  "Smog",
  "Sludge",
  "Bone Club",
  "Fire Blast",
  "Waterfall",
  "Clamp",
  "Swift",
  "Skull Bash",
  "Spike Cannon",
  "Constrict",
  "Amnesia",
  "Kinesis",
  "Soft-Boiled",
  "High Jump Kick",
  "Glare",
  "Dream Eater",
  "Poison Gas",
  "Barrage",
  "Leech Life",
  "Lovely Kiss",
  "Sky Attack",
  "Transform",
  "Bubble",
  "Dizzy Punch",
  "Spore",
  "Flash",
  "Psywave",
  "Splash",
  "Acid Armor",
  "Crabhammer",
  "Explosion",
  "Fury Swipes",
  "Bonemerang",
  "Rest",
  "Rock Slide",
  "Hyper Fang",
  "Sharpen",
  "Conversion",
  "Tri Attack",
  "Super Fang",
  "Slash",
  "Substitute",
  "Struggle",
  "Sketch",
  "Triple Kick",
  "Thief",
  "Spider Web",
  "Mind Reader",
  "Nightmare",
  "Flame Wheel",
  "Snore",
  "Curse",
  "Flail",
  "Conversion 2",
  "Aeroblast",
  "Cotton Spore",
  "Reversal",
  "Spite",
  "Powder Snow",
  "Protect",
  "Mach Punch",
  "Scary Face",
  "Feint Attack",
  "Sweet Kiss",
  "Belly Drum",
  "Sludge Bomb",
  "Mud-Slap",
  "Octazooka",
  "Spikes",
  "Zap Cannon",
  "Foresight",
  "Destiny Bond",
  "Perish Song",
  "Icy Wind",
  "Detect",
  "Bone Rush",
  "Lock-On",
  "Outrage",
  "Sandstorm",
  "Giga Drain",
  "Endure",
  "Charm",
  "Rollout",
  "False Swipe",
  "Swagger",
  "Milk Drink",
  "Spark",
  "Fury Cutter",
  "Steel Wing",
  "Mean Look",
  "Attract",
  "Sleep Talk",
  "Heal Bell",
  "Return",
  "Present",
  "Frustration",
  "Safeguard",
  "Pain Split",
  "Sacred Fire",
  "Magnitude",
  "Dynamic Punch",
  "Megahorn",
  "Dragon Breath",
  "Baton Pass",
  "Encore",
  "Pursuit",
  "Rapid Spin",
  "Sweet Scent",
  "Iron Tail",
  "Metal Claw",
  "Vital Throw",
  "Morning Sun",
  "Synthesis",
  "Moonlight",
  "Hidden Power",
  "Cross Chop",
  "Twister",
  "Rain Dance",
  "Sunny Day",
  "Crunch",
  "Mirror Coat",
  "Psych Up",
  "Extreme Speed",
  "Ancient Power",
  "Shadow Ball",
  "Future Sight",
  "Rock Smash",
  "Whirlpool",
  "Beat Up",
  "Fake Out",
  "Uproar",
  "Stockpile",
  "Spit Up",
  "Swallow",
  "Heat Wave",
  "Hail",
  "Torment",
  "Flatter",
  "Will-O-Wisp",
  "Memento",
  "Facade",
  "Focus Punch",
  "Smelling Salts",
  "Follow Me",
  "Nature Power",
  "Charge",
  "Taunt",
  "Helping Hand",
  "Trick",
  "Role Play",
  "Wish",
  "Assist",
  "Ingrain",
  "Superpower",
  "Magic Coat",
  "Recycle",
  "Revenge",
  "Brick Break",
  "Yawn",
  "Knock Off",
  "Endeavor",
  "Eruption",
  "Skill Swap",
  "Imprison",
  "Refresh",
  "Grudge",
  "Snatch",
  "Secret Power",
  "Dive",
  "Arm Thrust",
  "Camouflage",
  "Tail Glow",
  "Luster Purge",
  "Mist Ball",
  "Feather Dance",
  "Teeter Dance",
  "Blaze Kick",
  "Mud Sport",
  "Ice Ball",
  "Needle Arm",
  "Slack Off",
  "Hyper Voice",
  "Poison Fang",
  "Crush Claw",
  "Blast Burn",
  "Hydro Cannon",
  "Meteor Mash",
  "Astonish",
  "Weather Ball",
  "Aromatherapy",
  "Fake Tears",
  "Air Cutter",
  "Overheat",
  "Odor Sleuth",
  "Rock Tomb",
  "Silver Wind",
  "Metal Sound",
  "Grass Whistle",
  "Tickle",
  "Cosmic Power",
  "Water Spout",
  "Signal Beam",
  "Shadow Punch",
  "Extrasensory",
  "Sky Uppercut",
  "Sand Tomb",
  "Sheer Cold",
  "Muddy Water",
  "Bullet Seed",
  "Aerial Ace",
  "Icicle Spear",
  "Iron Defense",
  "Block",
  "Howl",
  "Dragon Claw",
  "Frenzy Plant",
  "Bulk Up",
  "Bounce",
  "Mud Shot",
  "Poison Tail",
  "Covet",
  "Volt Tackle",
  "Magical Leaf",
  "Water Sport",
  "Calm Mind",
  "Leaf Blade",
  "Dragon Dance",
  "Rock Blast",
  "Shock Wave",
  "Water Pulse",
  "Doom Desire",
  "Psycho Boost",
  "Roost",
  "Gravity",
  "Miracle Eye",
  "Wake-Up Slap",
  "Hammer Arm",
  "Gyro Ball",
  "Healing Wish",
  "Brine",
  "Natural Gift",
  "Feint",
  "Pluck",
  "Tailwind",
  "Acupressure",
  "Metal Burst",
  "U-turn",
  "Close Combat",
  "Payback",
  "Assurance",
  "Embargo",
  "Fling",
  "Psycho Shift",
  "Trump Card",
  "Heal Block",
  "Wring Out",
  "Power Trick",
  "Gastro Acid",
  "Lucky Chant",
  "Me First",
  "Copycat",
  "Power Swap",
  "Guard Swap",
  "Punishment",
  "Last Resort",
  "Worry Seed",
  "Sucker Punch",
  "Toxic Spikes",
  "Heart Swap",
  "Aqua Ring",
  "Magnet Rise",
  "Flare Blitz",
  "Force Palm",
  "Aura Sphere",
  "Rock Polish",
  "Poison Jab",
  "Dark Pulse",
  "Night Slash",
  "Aqua Tail",
  "Seed Bomb",
  "Air Slash",
  "X-Scissor",
  "Bug Buzz",
  "Dragon Pulse",
  "Dragon Rush",
  "Power Gem",
  "Drain Punch",
  "Vacuum Wave",
  "Focus Blast",
  "Energy Ball",
  "Brave Bird",
  "Earth Power",
  "Switcheroo",
  "Giga Impact",
  "Nasty Plot",
  "Bullet Punch",
  "Avalanche",
  "Ice Shard",
  "Shadow Claw",
  "Thunder Fang",
  "Ice Fang",
  "Fire Fang",
  "Shadow Sneak",
  "Mud Bomb",
  "Psycho Cut",
  "Zen Headbutt",
  "Mirror Shot",
  "Flash Cannon",
  "Rock Climb",
  "Defog",
  "Trick Room",
  "Draco Meteor",
  "Discharge",
  "Lava Plume",
  "Leaf Storm",
  "Power Whip",
  "Rock Wrecker",
  "Cross Poison",
  "Gunk Shot",
  "Iron Head",
  "Magnet Bomb",
  "Stone Edge",
  "Captivate",
  "Stealth Rock",
  "Grass Knot",
  "Chatter",
  "Judgment",
  "Bug Bite",
  "Charge Beam",
  "Wood Hammer",
  "Aqua Jet",
  "Attack Order",
  "Defend Order",
  "Heal Order",
  "Head Smash",
  "Double Hit",
  "Roar of Time",
  "Spacial Rend",
  "Lunar Dance",
  "Crush Grip",
  "Magma Storm",
  "Dark Void",
  "Seed Flare",
  "Ominous Wind",
  "Shadow Force",
  "Hone Claws",
  "Wide Guard",
  "Guard Split",
  "Power Split",
  "Wonder Room",
  "Psyshock",
  "Venoshock",
  "Autotomize",
  "Rage Powder",
  "Telekinesis",
  "Magic Room",
  "Smack Down",
  "Storm Throw",
  "Flame Burst",
  "Sludge Wave",
  "Quiver Dance",
  "Heavy Slam",
  "Synchronoise",
  "Electro Ball",
  "Soak",
  "Flame Charge",
  "Coil",
  "Low Sweep",
  "Acid Spray",
  "Foul Play",
  "Simple Beam",
  "Entrainment",
  "After You",
  "Round",
  "Echoed Voice",
  "Chip Away",
  "Clear Smog",
  "Stored Power",
  "Quick Guard",
  "Ally Switch",
  "Scald",
  "Shell Smash",
  "Heal Pulse",
  "Hex",
  "Sky Drop",
  "Shift Gear",
  "Circle Throw",
  "Incinerate",
  "Quash",
  "Acrobatics",
  "Reflect Type",
  "Retaliate",
  "Final Gambit",
  "Bestow",
  "Inferno",
  "Water Pledge",
  "Fire Pledge",
  "Grass Pledge",
  "Volt Switch",
  "Struggle Bug",
  "Bulldoze",
  "Frost Breath",
  "Dragon Tail",
  "Work Up",
  "Electroweb",
  "Wild Charge",
  "Drill Run",
  "Dual Chop",
  "Heart Stamp",
  "Horn Leech",
  "Sacred Sword",
  "Razor Shell",
  "Heat Crash",
  "Leaf Tornado",
  "Steamroller",
  "Cotton Guard",
  "Night Daze",
  "Psystrike",
  "Tail Slap",
  "Hurricane",
  "Head Charge",
  "Gear Grind",
  "Searing Shot",
  "Techno Blast",
  "Relic Song",
  "Secret Sword",
  "Glaciate",
  "Bolt Strike",
  "Blue Flare",
  "Fiery Dance",
  "Freeze Shock",
  "Ice Burn",
  "Snarl",
  "Icicle Crash",
  "V-create",
  "Fusion Flare",
  "Fusion Bolt",
  "Flying Press",
  "Mat Block",
  "Belch",
  "Rototiller",
  "Sticky Web",
  "Fell Stinger",
  "Phantom Force",
  "Trick-or-Treat",
  "Noble Roar",
  "Ion Deluge",
  "Parabolic Charge",
  "Forest's Curse",
  "Petal Blizzard",
  "Freeze-Dry",
  "Disarming Voice",
  "Parting Shot",
  "Topsy-Turvy",
  "Draining Kiss",
  "Crafty Shield",
  "Flower Shield",
  "Grassy Terrain",
  "Misty Terrain",
  "Electrify",
  "Play Rough",
  "Fairy Wind",
  "Moonblast",
  "Boomburst",
  "Fairy Lock",
  "King's Shield",
  "Play Nice",
  "Confide",
  "Diamond Storm",
  "Steam Eruption",
  "Hyperspace Hole",
  "Water Shuriken",
  "Mystical Fire",
  "Spiky Shield",
  "Aromatic Mist",
  "Eerie Impulse",
  "Venom Drench",
  "Powder",
  "Geomancy",
  "Magnetic Flux",
  "Happy Hour",
  "Electric Terrain",
  "Dazzling Gleam",
  "Celebrate",
  "Hold Hands",
  "Baby-Doll Eyes",
  "Nuzzle",
  "Hold Back",
  "Infestation",
  "Power-Up Punch",
  "Oblivion Wing",
  "Thousand Arrows",
  "Thousand Waves",
  "Land's Wrath",
  "Light of Ruin",
  "Origin Pulse",
  "Precipice Blades",
  "Dragon Ascent",
  "Hyperspace Fury",
  "Breakneck Blitz",
  "Breakneck Blitz",
  "All-Out Pummeling",
  "All-Out Pummeling",
  "Supersonic Skystrike",
  "Supersonic Skystrike",
  "Acid Downpour",
  "Acid Downpour",
  "Tectonic Rage",
  "Tectonic Rage",
  "Continental Crush",
  "Continental Crush",
  "Savage Spin-Out",
  "Savage Spin-Out",
  "Never-Ending Nightmare",
  "Never-Ending Nightmare",
  "Corkscrew Crash",
  "Corkscrew Crash",
  "Inferno Overdrive",
  "Inferno Overdrive",
  "Hydro Vortex",
  "Hydro Vortex",
  "Bloom Doom",
  "Bloom Doom",
  "Gigavolt Havoc",
  "Gigavolt Havoc",
  "Shattered Psyche",
  "Shattered Psyche",
  "Subzero Slammer",
  "Subzero Slammer",
  "Devastating Drake",
  "Devastating Drake",
  "Black Hole Eclipse",
  "Black Hole Eclipse",
  "Twinkle Tackle",
  "Twinkle Tackle",
  "Catastropika",
  "Shore Up",
  "First Impression",
  "Baneful Bunker",
  "Spirit Shackle",
  "Darkest Lariat",
  "Sparkling Aria",
  "Ice Hammer",
  "Floral Healing",
  "High Horsepower",
  "Strength Sap",
  "Solar Blade",
  "Leafage",
  "Spotlight",
  "Toxic Thread",
  "Laser Focus",
  "Gear Up",
  "Throat Chop",
  "Pollen Puff",
  "Anchor Shot",
  "Psychic Terrain",
  "Lunge",
  "Fire Lash",
  "Power Trip",
  "Burn Up",
  "Speed Swap",
  "Smart Strike",
  "Purify",
  "Revelation Dance",
  "Core Enforcer",
  "Trop Kick",
  "Instruct",
  "Beak Blast",
  "Clanging Scales",
  "Dragon Hammer",
  "Brutal Swing",
  "Aurora Veil",
  "Sinister Arrow Raid",
  "Malicious Moonsault",
  "Oceanic Operetta",
  "Guardian of Alola",
  "Soul-Stealing 7-Star Strike",
  "Stoked Sparksurfer",
  "Pulverizing Pancake",
  "Extreme Evoboost",
  "Genesis Supernova",
  "Shell Trap",
  "Fleur Cannon",
  "Psychic Fangs",
  "Stomping Tantrum",
  "Shadow Bone",
  "Accelerock",
  "Liquidation",
  "Prismatic Laser",
  "Spectral Thief",
  "Sunsteel Strike",
  "Moongeist Beam",
  "Tearful Look",
  "Zing Zap",
  "Nature's Madness",
  "Multi-Attack",
  "10,000,000 Volt Thunderbolt",
  "Mind Blown",
  "Plasma Fists",
  "Photon Geyser",
  "Light That Burns the Sky",
  "Searing Sunraze Smash",
  "Menacing Moonraze Maelstrom",
  "Let's Snuggle Forever",
  "Splintered Stormshards",
  "Clangorous Soulblaze"
]

export const GEN_2_HELD_ITEM_MAP = {
  0x00 : '?',
  0x01 : 'Master Ball',
  0x02 : 'Ultra Ball',
  0x03 : 'BrightPowder',
  0x04 : 'Great Ball',
  0x05 : 'Poké Ball',
  0x06 : 'Teru-sama',
  0x07 : 'Bicycle',
  0x08 : 'Moon Stone',
  0x09 : 'Antidote',
  0x0A : 'Burn Heal',
  0x0B : 'Ice Heal',
  0x0C : 'Awakening',
  0x0D : 'Parlyz Heal',
  0x0E : 'Full Restore',
  0x0F : 'Max Potion',
  0x10 : 'Hyper Potion',
  0x11 : 'Super Potion',
  0x12 : 'Potion',
  0x13 : 'Escape Rope',
  0x14 : 'Repel',
  0x15 : 'Max Elixer',
  0x16 : 'Fire Stone',
  0x17 : 'Thunderstone',
  0x18 : 'Water Stone',
  0x19 : 'Teru-sama',
  0x1A : 'HP Up',
  0x1B : 'Protein',
  0x1C : 'Iron',
  0x1D : 'Carbos',
  0x1E : 'Lucky Punch',
  0x1F : 'Calcium',
  0x20 : 'Rare Candy',
  0x21 : 'X Accuracy',
  0x22 : 'Leaf Stone',
  0x23 : 'Metal Powder',
  0x24 : 'Nugget',
  0x25 : 'Poké Doll',
  0x26 : 'Full Heal',
  0x27 : 'Revive',
  0x28 : 'Max Revive',
  0x29 : 'Guard Spec.',
  0x2A : 'Super Repel',
  0x2B : 'Max Repel',
  0x2C : 'Dire Hit',
  0x2D : 'Teru-sama',
  0x2E : 'Fresh Water',
  0x2F : 'Soda Pop',
  0x30 : 'Lemonade',
  0x31 : 'X Attack',
  0x32 : 'Teru-sama',
  0x33 : 'X Defend',
  0x34 : 'X Speed',
  0x35 : 'X Special',
  0x36 : 'Coin Case',
  0x37 : 'Itemfinder',
  0x38 : 'Teru-sama',
  0x39 : 'Exp.Share',
  0x3A : 'Old Rod',
  0x3B : 'Good Rod',
  0x3C : 'Silver Leaf',
  0x3D : 'Super Rod',
  0x3E : 'PP Up',
  0x3F : 'Ether',
  0x40 : 'Max Ether',
  0x41 : 'Elixer',
  0x42 : 'Red Scale',
  0x43 : 'SecretPotion',
  0x44 : 'S.S. Ticket',
  0x45 : 'Mystery Egg',
  0x46 : 'Clear Bell*',
  0x47 : 'Silver Wing',
  0x48 : 'Moomoo Milk',
  0x49 : 'Quick Claw',
  0x4A : 'PSNCureBerry',
  0x4B : 'Gold Leaf',
  0x4C : 'Soft Sand',
  0x4D : 'Sharp Beak',
  0x4E : 'PRZCureBerry',
  0x4F : 'Burnt Berry',
  0x50 : 'Ice Berry',
  0x51 : 'Poison Barb',
  0x52 : 'King\'s Rock',
  0x53 : 'Bitter Berry',
  0x54 : 'Mint Berry',
  0x55 : 'Red Apricorn',
  0x56 : 'TinyMushroom',
  0x57 : 'Big Mushroom',
  0x58 : 'SilverPowder',
  0x59 : 'Blu Apricorn',
  0x5A : 'Teru-sama',
  0x5B : 'Amulet Coin',
  0x5C : 'Ylw Apricorn',
  0x5D : 'Grn Apricorn',
  0x5E : 'Cleanse Tag',
  0x5F : 'Mystic Water',
  0x60 : 'TwistedSpoon',
  0x61 : 'Wht Apricorn',
  0x62 : 'Blackbelt',
  0x63 : 'Blk Apricorn',
  0x64 : 'Teru-sama',
  0x65 : 'Pnk Apricorn',
  0x66 : 'BlackGlasses',
  0x67 : 'SlowpokeTail',
  0x68 : 'Pink Bow',
  0x69 : 'Stick',
  0x6A : 'Smoke Ball',
  0x6B : 'NeverMeltIce',
  0x6C : 'Magnet',
  0x6D : 'MiracleBerry',
  0x6E : 'Pearl',
  0x6F : 'Big Pearl',
  0x70 : 'Everstone',
  0x71 : 'Spell Tag',
  0x72 : 'RageCandyBar',
  0x73 : 'GS Ball*',
  0x74 : 'Blue Card*',
  0x75 : 'Miracle Seed',
  0x76 : 'Thick Club',
  0x77 : 'Focus Band',
  0x78 : 'Teru-sama',
  0x79 : 'EnergyPowder',
  0x7A : 'Energy Root',
  0x7B : 'Heal Powder',
  0x7C : 'Revival Herb',
  0x7D : 'Hard Stone',
  0x7E : 'Lucky Egg',
  0x7F : 'Card Key',
  0x80 : 'Machine Part',
  0x81 : 'Egg Ticket*',
  0x82 : 'Lost Item',
  0x83 : 'Stardust',
  0x84 : 'Star Piece',
  0x85 : 'Basement Key',
  0x86 : 'Pass',
  0x87 : 'Teru-sama',
  0x88 : 'Teru-sama',
  0x89 : 'Teru-sama',
  0x8A : 'Charcoal',
  0x8B : 'Berry Juice',
  0x8C : 'Scope Lens',
  0x8D : 'Teru-sama',
  0x8E : 'Teru-sama',
  0x8F : 'Metal Coat',
  0x90 : 'Dragon Fang',
  0x91 : 'Teru-sama',
  0x92 : 'Leftovers',
  0x93 : 'Teru-sama',
  0x94 : 'Teru-sama',
  0x95 : 'Teru-sama',
  0x96 : 'MysteryBerry',
  0x97 : 'Dragon Scale',
  0x98 : 'Berserk Gene',
  0x99 : 'Teru-sama',
  0x9A : 'Teru-sama',
  0x9B : 'Teru-sama',
  0x9C : 'Sacred Ash',
  0x9D : 'Heavy Ball',
  0x9E : 'Flower Mail',
  0x9F : 'Level Ball',
  0xA0 : 'Lure Ball',
  0xA1 : 'Fast Ball',
  0xA2 : 'Teru-sama',
  0xA3 : 'Light Ball',
  0xA4 : 'Friend Ball',
  0xA5 : 'Moon Ball',
  0xA6 : 'Love Ball',
  0xA7 : 'Normal Box',
  0xA8 : 'Gorgeous Box',
  0xA9 : 'Sun Stone',
  0xAA : 'Polkadot Bow',
  0xAB : 'Teru-sama',
  0xAC : 'Up-Grade',
  0xAD : 'Berry',
  0xAE : 'Gold Berry',
  0xAF : 'SquirtBottle',
  0xB0 : 'Teru-sama',
  0xB1 : 'Park Ball',
  0xB2 : 'Rainbow Wing',
  0xB3 : 'Teru-sama',
  0xB4 : 'Brick Piece',
  0xB5 : 'Surf Mail',
  0xB6 : 'Litebluemail',
  0xB7 : 'Portraitmail',
  0xB8 : 'Lovely Mail',
  0xB9 : 'Eon Mail',
  0xBA : 'Morph Mail',
  0xBB : 'Bluesky Mail',
  0xBC : 'Music Mail',
  0xBD : 'Mirage Mail',
  0xBE : 'Teru-sama',
  0xBF : 'TM01',
  0xC0 : 'TM02',
  0xC1 : 'TM03',
  0xC2 : 'TM04',
  0xC3 : 'TM04',
  0xC4 : 'TM05',
  0xC5 : 'TM06',
  0xC6 : 'TM07',
  0xC7 : 'TM08',
  0xC8 : 'TM09',
  0xC9 : 'TM10',
  0xCA : 'TM11',
  0xCB : 'TM12',
  0xCC : 'TM13',
  0xCD : 'TM14',
  0xCE : 'TM15',
  0xCF : 'TM16',
  0xD0 : 'TM17',
  0xD1 : 'TM18',
  0xD2 : 'TM19',
  0xD3 : 'TM20',
  0xD4 : 'TM21',
  0xD5 : 'TM22',
  0xD6 : 'TM23',
  0xD7 : 'TM24',
  0xD8 : 'TM25',
  0xD9 : 'TM26',
  0xDA : 'TM27',
  0xDB : 'TM28',
  0xDC : 'TM28',
  0xDD : 'TM29',
  0xDE : 'TM30',
  0xDF : 'TM31',
  0xE0 : 'TM32',
  0xE1 : 'TM33',
  0xE2 : 'TM34',
  0xE3 : 'TM35',
  0xE4 : 'TM36',
  0xE5 : 'TM37',
  0xE6 : 'TM38',
  0xE7 : 'TM39',
  0xE8 : 'TM40',
  0xE9 : 'TM41',
  0xEA : 'TM42',
  0xEB : 'TM43',
  0xEC : 'TM44',
  0xED : 'TM45',
  0xEE : 'TM46',
  0xEF : 'TM47',
  0xF0 : 'TM48',
  0xF1 : 'TM49',
  0xF2 : 'TM50',
  0xF3 : 'HM01',
  0xF4 : 'HM02',
  0xF5 : 'HM03',
  0xF6 : 'HM04',
  0xF7 : 'HM05',
  0xF8 : 'HM06',
  0xF9 : 'HM07',
  0xFA : 'HM08',
  0xFB : 'HM09',
  0xFC : 'HM10',
  0xFD : 'HM11',
  0xFE : 'HM12',
  0xFF : 'Cancel',
}