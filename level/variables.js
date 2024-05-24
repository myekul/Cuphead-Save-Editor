const nullItem=2147483647;
const nullTime="3.4028234663852887e38";

let currentEquip = {
    p1primary:nullItem,
    p2primary:nullItem,
    p1secondary:nullItem,
    p2secondary:nullItem,
    p1super:nullItem,
    p2super:nullItem,
    p1charm:nullItem,
    p2charm:nullItem
};

let unlockedWeapons=[];
let unlockedSupers=[];
let unlockedCharms=[];

let modifiedArray=[];

let curseScore={
    p1:0,
    p2:0
};