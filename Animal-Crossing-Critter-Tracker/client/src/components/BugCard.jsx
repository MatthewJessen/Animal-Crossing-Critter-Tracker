import { useState, useEffect } from "react";
import net from "../assets/net.png"
import donateLogo from "../assets/donate.png"

function BugCard({ bugData, bugsCaught, bugsDonated }) {
    const [isCaught, setIsCaught] = useState(false);
    const [isDonated, setIsDonated] = useState(false);

    // Determine current states from database
    useEffect(() => {
        if (bugsCaught.catchList !== []) {
            for (const entry of bugsCaught.catchList) {
                if (bugData.number === entry.bug_num) {setIsCaught(true)}
            }
        }
        if (bugsDonated.donatedList !== []) {
            for (const entry of bugsDonated.donatedList) {
                if (bugData.number === entry.bug_num) {setIsDonated(true)}
            }
        }
    }, []);

    // Flip Catch status in database and states
    async function changeCaught() {
        if (isCaught === false) {
            const res = await fetch(`/api/bugs/${bugData.number}/caught`, { method: "POST" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsCaught(true);
        }
        else {
            const res = await fetch(`/api/bugs/${bugData.number}/uncaught`, { method: "DELETE" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsCaught(false);
        }
    }

    // Flip Donation status in database and states
    async function changeDonation() {
        if (isDonated === false) {
            const res = await fetch(`/api/bugs/${bugData.number}/donated`, { method: "POST" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsDonated(true);
        }
        else {
            const res = await fetch(`/api/bugs/${bugData.number}/undonated`, { method: "DELETE" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsDonated(false);
        }
    }

    function capitalizeWords(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function populateAvailablity(bugData, hemisphere) {
        let availability_array;
        if (hemisphere === "north") {availability_array = bugData.north.availability_array}
        else {availability_array = bugData.south.availability_array}

        let resStr = '';
        for (const entry of availability_array) {
            if (entry.months.length >= 20) {
                resStr += `${entry.months}\n${entry.time}\n`;
            }
            else {
                resStr += `${entry.months} : ${entry.time}\n`;
            }
        }

        return resStr;
    }

    return (
        <div className="card bug-card">
            <div className="sub-card bug-card-name">{capitalizeWords(bugData.name)}</div>
            <div className="bug-card-body">
                <div className="bug-card-div">
                    <div className="sub-card bug-card-photo-div">
                        <img src={bugData.render_url} alt={capitalizeWords(bugData.name)} className="bug-card-photo" />
                    </div>
                </div>
                <div className="bug-card-div">
                    <div className="sub-card bug-card-availability">{populateAvailablity(bugData, "north")}</div>
                    <div className="sub-card bug-card-location">{bugData.location}</div>
                    <div className="sub-card bug-card-sell">{bugData.sell_nook.toLocaleString()} Bells</div>
                </div>
            </div>
            <div className="bug-card-button-div">
                <button onClick={() => {changeCaught()}} data-pressed={isCaught} className="sub-card bug-card-button caught-button">
                    <img src={net} alt="Caught/Uncaught" className="button-logo"/>
                </button>
                <button onClick={() => {changeDonation()}} data-pressed={isDonated} className="sub-card bug-card-button donated-button">
                    <img src={donateLogo} alt="Donated/Undonated" className="button-logo"/>
                </button>
            </div>
        </div>
    )
}

export default BugCard;