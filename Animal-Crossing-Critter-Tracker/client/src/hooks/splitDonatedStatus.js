export function splitDonatedStatus(type, critterList, donateList) {
    let donatedList = [];
    let undonatedList = [];

    if (type === "bug") {
        for (const critter of critterList) {
            let found = false;
            for (const entry of donatedList.donatedList) {
                if (critter.number === entry.bug_num) {
                    donatedList.push(critter);
                    found = true;
                    break;
                }
            }
            if (!found) {
                undonatedList.push(critter);
            }
        }
    }
    else if (type === "fish") {
        for (const critter of critterList) {
            let found = false;
            for (const entry of donatedList.donatedList) {
                if (critter.number === entry.fish_num) {
                    donatedList.push(critter);
                    found = true;
                    break;
                }
            }
            if (!found) {
                undonatedList.push(critter);
            }
        }
    }

    return [donatedList, undonatedList];
}