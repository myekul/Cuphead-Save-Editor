class Player {
    constructor(loadout, money, newPurchase, weapons, supers, charms, statictics) {
        // Loadout
        this.primary = loadout[0];
        this.secondary = loadout[1];
        this.super = loadout[2];
        this.charm = loadout[3];

        // Inventory
        this.money = money;
        this.newPurchase = newPurchase;
        this.weapons = weapons;
        this.supers = supers;
        this.charms = charms;

        // Statictics
        this.numDeaths = statictics[0];
        this.numParriesInRow = statictics[1];
    }
}