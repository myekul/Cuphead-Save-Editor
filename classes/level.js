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
    }
    getLevelID(){
        return this.levelID;
    }
    getName(){
        if(levelMap[this.levelID]){
            const levelInfo = levelMap[this.levelID]
            return levelInfo.name;
        }
        return null;
    }
    getGrade() {
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
    getIsle() {
        return this.isle;
    }
    getLevelType() {
        const levelInfo = levelMap[this.levelID];
        return levelInfo.levelType;
    }
    getPriority() {
        const levelInfo = levelMap[this.levelID];
        return levelInfo.priority;
    }
}