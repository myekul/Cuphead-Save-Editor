const weaponMap = new Map([
    [1456773641, "Peashooter"],
    [1456773649, "Spread"],
    [1460621839, "Chaser"],
    [1467024095, "Lobber"],
    [1466416941, "Charge"],
    [1466518900, "Roundabout"],
    [1614768724, "Crackshot"],
    [1487081743, "Converge"],
    [1568276855, "Twist-Up"],
    [1458758183, "Arc"], // Unused
    [1465906052, "Exploder"], // Unused
    [1457006169, "Machine Gun"],
    [1492758857, "Plane Bomb"],
    [2147483647, "-"]
]);
const superMap = new Map([
    [1456815409, "Super Art 1: Energy Beam"],
    [1495012282, "Super Art 2: Invincibility"],
    [1467617939, "Super Art 3: Giant Ghost"],
    [2147483647, "-"]
]);
const charmMap = new Map([
    [1460832742, "Heart"],
    [1460880866, "Coffee"],
    [1461001046, "Smoke Bomb"],
    [1487051212, "P. Sugar"],
    [1500641115, "Twin Heart"],
    [1500621999, "Whetstone"],
    [1522153206, "Astral Cookie"],
    [1569309672, "Relic"],
    [1568891766, "Heart Ring"],
    [1487056728, "Shield"], // Unused
    [2147483647, "-"]
]);
const tooltipMap = {
    "1456773641": {
        name: "PEASHOOTER",
        subtitle: "EX: Mega Blast",
        description: "Standard issue weapon. Long range<br>with average damage."
    },
    "1456773649": {
        name: "SPREAD",
        subtitle: "EX: Eight Way",
        description: "Short range with great damage - if<br>you can keep close to your target."
    },
    "1460621839": {
        name: "CHASER",
        subtitle: "EX: Chaos Orbit",
        description: "Long range with below-average<br>damage. No aiming required."
    },
    "1467024095": {
        name: "LOBBER",
        subtitle: "EX: Kablooey",
        description: "Medium range and good damage with<br>a slower rate of fire."
    },
    "1466416941": {
        name: "CHARGE",
        subtitle: "EX: Radial Barrage",
        description: "Hold attack to increase damage. No<br>rapid fire, so precision is key."
    },
    "1466518900": {
        name: "ROUNDABOUT",
        subtitle: "EX: Jumbo Rebound",
        description: "Great coverage with average damage.<br>Aim backward for maximum range."
    },
    "1614768724": {
        name: "CRACKSHOT",
        subtitle: "EX: P. Turret",
        description: "Straight shot with good damage. Breaks<br>into weaker aimed projectiles."
    },
    "1487081743": {
        name: "CONVERGE",
        subtitle: "EX: Electro-Bolt",
        description: "Full-screen piercing 3-way shot. Hold<br>lock button to narrow spread."
    },
    "1568276855": {
        name: "TWIST-UP",
        subtitle: "EX: Cyclone Spiral",
        description: "Rapid-fire shot with arced pathway and<br>average damage."
    },
    "1458758183": {
        name: "ARC",
        subtitle: "",
        description: ""
    },
    "1465906052": {
        name: "EXPLODER",
        subtitle: "",
        description: ""
    },
    "1456815409": {
        name: "SUPER ART I",
        subtitle: "Energy Beam",
        description: "A devastating attack spills from your<br>head. Horizontal only (ground or air)."
    },
    "1495012282": {
        name: "SUPER ART II",
        subtitle: "Invincibility",
        description: "Cross the astral plane to become<br>invulnerable for a short time."
    },
    "1467617939": {
        name: "SUPER ART III",
        subtitle: "Giant Ghost",
        description: "Maneuver your spirit and body<br>simultaneously for maximum damage."
    },
    "1460832742": {
        name: "HEART",
        subtitle: "Extra Hit Point",
        description: "Adds an additional hit point but<br>lightly weakens your attack power."
    },
    "1460880866": {
        name: "COFFEE",
        subtitle: "Autofill Meter",
        description: "Super meter continuously fills - in<br>addition to what you earn."
    },
    "1461001046": {
        name: "SMOKE BOMB",
        subtitle: "Invisible Dash",
        description: "You will not take damage during a<br>dash. A great defense maneuver."
    },
    "1487051212": {
        name: "P. SUGAR",
        subtitle: "Automatic Parry",
        description: "The first parry move is automatic -<br>all you need to do is jump."
    },
    "1500641115": {
        name: "TWIN HEART",
        subtitle: "Extra Hit Points",
        description: "Adds two additional hit points but<br>weakens your attack power."
    },
    "1500621999": {
        name: "WHETSTONE",
        subtitle: "Parry Attack",
        description: "Your first parry move doubles as a<br>damaging axe attack."
    },
    "1522153206": {
        name: "ASTRAL COOKIE",
        subtitle: "Play As Ms. Chalice",
        description: "Grants access to her double jump, dash<br>parry, and invincible roll."
    },
    "1569309672": {
        name: "DIVINE RELIC",
        subtitle: "Bestows Power",
        description: "Wondrous talisman that grants a variety<br>of abilities."
    },
    "1568891766": {
        name: "HEART RING",
        subtitle: "Parry for HP",
        description: "Gain 1 HP on your first, third, and sixth<br>parry."
    },
    "1487056728": {
        name: "SHIELD",
        subtitle: "",
        description: ""
    }
};

const levelMap = {
    2: { isle: 3, levelType: 0, priority: 15, name: "Captain Brineybeard" },
    5: { isle: 3, levelType: 0, priority: 20, name: "Phantom Express" },
    6: { isle: 1, levelType: 0, priority: 0, name: "The Root Pack" },
    7: { isle: 1, levelType: 0, priority: 4, name: "Ribby and Croaks" },
    1428495827: { isle: 2, levelType: 0, priority: 11, name: "Wally Warbles" },
    1429976377: { isle: 3, levelType: 0, priority: 14, name: "Rumor Honeybottoms" },
    1430652919: { isle: 3, levelType: 0, priority: 17, name: "Werner Werman" },
    1432722919: { isle: 2, levelType: 0, priority: 10, name: "Grim Matchstick" },
    1446558823: { isle: 3, levelType: 0, priority: 19, name: "Cala Maria" },
    1449745424: { isle: 1, levelType: 0, priority: 2, name: "Hilda Berg" },
    1450266910: { isle: 1, levelType: 0, priority: 3, name: "Cagney Carnation" },
    1450863107: { isle: 1, levelType: 0, priority: 1, name: "Goopy Le Grande" },
    1451300935: { isle: 2, levelType: 0, priority: 7, name: "Baroness Von Bon Bon" },
    1452935394: { isle: 3, levelType: 0, priority: 18, name: "Dr. Kahl's Robot" },
    1456125457: { isle: 2, levelType: 0, priority: 8, name: "Beppi The Clown" },
    1456740288: { isle: 3, levelType: 0, priority: 16, name: "Sally Stageplay" },
    1460200177: { isle: 2, levelType: 0, priority: 9, name: "Djimmi The Great" },
    1464969490: { isle: 1, levelType: 1, priority: 5, name: "Forest Follies" },
    1464969491: { isle: 1, levelType: 1, priority: 6, name: "Treetop Trouble" },
    1464969492: { isle: 3, levelType: 1, priority: 21, name: "Perilous Piers" },
    1464969493: { isle: 3, levelType: 1, priority: 22, name: "Rugged Ridge" },
    1465296077: { isle: 4, levelType: 0, priority: 23, name: "King Dice" },
    1466688317: { isle: 4, levelType: 0, priority: 24, name: "The Devil" },
    1481199742: { isle: 5, levelType: 2, priority: 31, name: "Mausoleum" },
    1496818712: { isle: 2, levelType: 1, priority: 13, name: "Funhouse Frazzle" },
    1499704951: { isle: 2, levelType: 1, priority: 12, name: "Funfair Fever" },
    1573044456: { isle: 0, levelType: 0, priority: 30, name: "Chef Saltbaker" },
    1511943573: { isle: 0, levelType: 0, priority: 27, name: "The Howling Aces" },
    1530096313: { isle: 0, levelType: 0, priority: 29, name: "Esther Winchester" },
    1523429320: { isle: 0, levelType: 0, priority: 25, name: "Glumstone The Giant" },
    1518081307: { isle: 0, levelType: 0, priority: 26, name: "Moonshine Mob" },
    1527591209: { isle: 0, levelType: 0, priority: 28, name: "Mortimer Freeze" },
    1616405510: { isle: 0, levelType: 2, priority: 46, name: "Angel and Demon" },
    1562078899: { isle: 0, levelType: 2, priority: 41, name: "The Pawns" },
    1560339521: { isle: 0, levelType: 2, priority: 42, name: "The Knight" },
    1526556188: { isle: 0, levelType: 2, priority: 43, name: "The Bishop" },
    1560855325: { isle: 0, levelType: 2, priority: 44, name: "The Rook" },
    1561124831: { isle: 0, levelType: 2, priority: 45, name: "The Queen" },
    1458719430: { isle: 0, levelType: 3, priority: 32, name: "Tispy Troop" },
    1458336090: { isle: 0, levelType: 3, priority: 33, name: "Chips Bettigan" },
    1458551456: { isle: 0, levelType: 3, priority: 34, name: "Mr. Wheezy" },
    1458062114: { isle: 0, levelType: 3, priority: 35, name: "Pip and Dot" },
    1459928905: { isle: 0, levelType: 3, priority: 36, name: "Hopus Pocus" },
    1463479514: { isle: 0, levelType: 3, priority: 37, name: "Phear Lap" },
    1459105708: { isle: 0, levelType: 3, priority: 38, name: "Pirouletta" },
    1468483834: { isle: 0, levelType: 3, priority: 39, name: "Mangosteen" },
    1464322003: { isle: 0, levelType: 3, priority: 40, name: "Mr. Chimes" },
};
const gradeMap = new Map([
    [0, "D-"],
    [1, "D"],
    [2, "D+"],
    [3, "C-"],
    [4, "C"],
    [5, "C+"],
    [6, "B-"],
    [7, "B"],
    [8, "B+"],
    [9, "A-"],
    [10, "A"],
    [11, "A+"],
    [12, "S"],
    [13, "P"]
]);
const difficultyBeatenMap = new Map([
    [0, "Simple"],
    [1, "Regular"],
    [2, "Expert"]
]);