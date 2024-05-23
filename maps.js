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
    [1487056728, "Pit Saver"], // Unused
    [2147483647, "-"]
]);
const superMap = new Map([
    [1456815409, "Super Art 1: Energy Beam"],
    [1495012282, "Super Art 2: Invincibility"],
    [1467617939, "Super Art 3: Giant Ghost"],
    [2147483647, "-"]
]);
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
    1616405510: { isle: 0, levelType: 2, priority: 37, name: "Angel and Demon" },
    1562078899: { isle: 0, levelType: 2, priority: 32, name: "The Pawns" },
    1560339521: { isle: 0, levelType: 2, priority: 33, name: "The Knight" },
    1526556188: { isle: 0, levelType: 2, priority: 34, name: "The Bishop" },
    1560855325: { isle: 0, levelType: 2, priority: 35, name: "The Rook" },
    1561124831: { isle: 0, levelType: 2, priority: 36, name: "The Queen" }
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