class Player {
    // Constructor
    constructor(loadout, money, newPurchase, weapons, supers, charms, statistics) {
        // Loadout
        this.primaryWeapon = loadout[0];
        this.secondaryWeapon = loadout[1];
        this.super_ = loadout[2];
        this.charm = loadout[3];

        // Inventory
        this.money = money;
        this.newPurchase = newPurchase;
        this.weapons = weapons;
        this.supers = supers;
        this.charms = charms;

        // Statistics
        this.numDeaths = statistics[0];
        this.numParriesInRow = statistics[1];
    }

    getWeapons(){
        return this.weapons;
    }

    getCharms(){
        return this.charms;
    }

    // Get super by ID
    getSuper(id) {
        const supers = {
            1456815409: "Super Art 1: Energy Beam",
            1495012282: "Super Art 2: Invincibility",
            1467617939: "Super Art 3: Giant Ghost",
            2147483647: "-"
        };
        return supers[id] || null;
    }
}