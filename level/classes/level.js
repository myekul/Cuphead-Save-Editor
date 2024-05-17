class Level {
    constructor(levelID, booleanArray, grade, difficultyBeaten, bestTime, bgmPlayListCurrent) {
        this.levelID = levelID;
        this.completed = booleanArray[0];
        this.completedAsChaliceP1 = booleanArray[1];
        this.completedAsChaliceP2 = booleanArray[2];
        this.played = booleanArray[3];
        this.grade = grade;
        this.difficultyBeaten = difficultyBeaten;
        this.bestTime = bestTime;
        this.curseCharmP1 = booleanArray[4];
        this.curseCharmP2 = booleanArray[5];
        this.bgmPlayListCurrent = bgmPlayListCurrent;
        // Miscellaneous variables
        this.levelType = 0; // 0=boss, 1=run 'n gun, 2=other
        this.levelPriority = 0;
    }
    getLevelName() {
        switch (this.levelID) {
            case 2:
                this.levelPriority = 15;
                return "Captain Brineybeard";
            case 5:
                this.levelPriority = 20;
                return "Phantom Express";
            case 6:
                this.levelPriority = 0;
                return "The Root Pack";
            case 7:
                this.levelPriority = 4;
                return "Ribby and Croaks";
            case 1428495827:
                this.levelPriority = 11;
                return "Wally Warbles";
            case 1429976377:
                this.levelPriority = 14;
                return "Rumor Honeybottoms";
            case 1430652919:
                this.levelPriority = 17;
                return "Werner Werman";
            case 1432722919:
                this.levelPriority = 10;
                return "Grim Matchstick";
            case 1446558823:
                this.levelPriority = 19;
                return "Cala Maria";
            case 1449745424:
                this.levelPriority = 2;
                return "Hilda Berg";
            case 1450266910:
                this.levelPriority = 3;
                return "Cagney Carnation";
            case 1450863107:
                this.levelPriority = 1;
                return "Goopy Le Grande";
            case 1451300935:
                this.levelPriority = 7;
                return "Baroness Von Bon Bon";
            case 1452935394:
                this.levelPriority = 18;
                return "Dr. Kahl's Robot";
            case 1456125457:
                this.levelPriority = 8;
                return "Beppi The Clown";
            case 1456740288:
                this.levelPriority = 16;
                return "Sally Stageplay";
            case 1460200177:
                this.levelPriority = 9;
                return "Djimmi The Great";
            case 1464969490:
                this.levelType = 1;
                this.levelPriority = 5;
                return "Forest Follies";
            case 1464969491:
                this.levelType = 1;
                this.levelPriority = 6;
                return "Treetop Trouble";
            case 1464969492:
                this.levelType = 1;
                this.levelPriority = 21;
                return "Perious Piers";
            case 1464969493:
                this.levelType = 1;
                this.levelPriority = 22;
                return "Rugged Ridge";
            case 1465296077:
                this.levelPriority = 23;
                return "King Dice";
            case 1466688317:
                this.levelPriority = 24;
                return "The Devil";
            case 1481199742:
                this.levelType = 2;
                this.levelPriority = 31;
                return "Mausoleum";
            case 1496818712:
                this.levelType = 1;
                this.levelPriority = 13;
                return "Funhouse Frazzle";
            case 1499704951:
                this.levelType = 1;
                this.levelPriority = 12;
                return "Funfair Fever";
            case 1573044456:
                this.levelPriority = 30;
                return "Chef Saltbaker";
            case 1511943573:
                this.levelPriority = 27;
                return "The Howling Aces";
            case 1530096313:
                this.levelPriority = 29;
                return "Esther Winchester";
            case 1523429320:
                this.levelPriority = 25;
                return "Glumstone The Giant";
            case 1518081307:
                this.levelPriority = 26;
                return "Moonshine Mob";
            case 1527591209:
                this.levelPriority = 28;
                return "Mortimer Freeze";
            case 1616405510:
                this.levelType = 2;
                this.levelPriority = 37;
                return "Angel and Demon";
            case 1562078899:
                this.levelType = 2;
                this.levelPriority = 32;
                return "The Pawns";
            case 1560339521:
                this.levelType = 2;
                this.levelPriority = 33;
                return "The Knight";
            case 1526556188:
                this.levelType = 2;
                this.levelPriority = 34;
                return "The Bishop";
            case 1560855325:
                this.levelType = 2;
                this.levelPriority = 35;
                return "The Rook";
            case 1561124831:
                this.levelType = 2;
                this.levelPriority = 36;
                return "The Queen";
            default:
                return null;
        }
    }
    getLetterGrade() {
        return gradeMap.get(this.grade)
    }
    getDifficultyBeaten() {
        return difficultyBeatenMap.get(this.difficultyBeaten)
    }
    getTime() {
        return this.bestTime !== "3.4028234663852887e38" ? deserialize(this.bestTime) : ""
    }
    isPlayed() {
        return this.played;
    }
    isCompleted() {
        return this.completed;
    }
    getLevelType() {
        return this.levelType;
    }
    getlevelPriority() {
        return this.levelPriority;
    }
}