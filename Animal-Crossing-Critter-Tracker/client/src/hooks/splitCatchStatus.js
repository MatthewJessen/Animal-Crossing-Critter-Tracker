export function splitCatchStatus(type, critterList, catchList) {
    let caughtList = [];
    let uncaughtList = [];

    if (type === "bug") {
        for (const critter of critterList) {
            let found = false;
            for (const entry of catchList.catchList) {
                if (critter.number === entry.bug_num) {
                    caughtList.push(critter);
                    found = true;
                    break;
                }
            }
            if (!found) {
                uncaughtList.push(critter);
            }
        }
    }
    else if (type === "fish") {
        for (const critter of critterList) {
            let found = false;
            for (const entry of catchList.catchList) {
                if (critter.number === entry.fish_num) {
                    caughtList.push(critter);
                    found = true;
                    break;
                }
            }
            if (!found) {
                uncaughtList.push(critter);
            }
        }
    }

    return [caughtList, uncaughtList];
}