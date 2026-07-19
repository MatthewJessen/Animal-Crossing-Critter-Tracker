import { useState, useEffect } from "react";
import rod from "../assets/rod.png"
import donateLogo from "../assets/donate.png"

function FishCard({ FishData, FishCaught, FishDonated }) {
    const [isCaught, setIsCaught] = useState(false);
    const [isDonated, setIsDonated] = useState(false);

    // Determine current states from database
    useEffect(() => {
        if (FishCaught.catchList !== []) {
            for (const entry of FishCaught.catchList) {
                if (FishData.number === entry.fish_num) {setIsCaught(true)}
            }
        }
        if (FishDonated.donatedList !== []) {
            for (const entry of FishDonated.donatedList) {
                if (FishData.number === entry.fish_num) {setIsDonated(true)}
            }
        }
    }, []);

    // Flip Catch status in database and states
    async function changeCaught() {
        if (isCaught === false) {
            const res = await fetch(`/api/fish/${FishData.number}/caught`, { method: "POST" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsCaught(true);
        }
        else {
            const res = await fetch(`/api/fish/${FishData.number}/uncaught`, { method: "DELETE" });
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
            const res = await fetch(`/api/fish/${FishData.number}/donated`, { method: "POST" });
            if (!res.ok) {
                const body = await res.json();
                return(<div className="error-message">{body.error}</div>);
            }
            setIsDonated(true);
        }
        else {
            const res = await fetch(`/api/fish/${FishData.number}/undonated`, { method: "DELETE" });
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

    function populateAvailablity(fishData, hemisphere) {
        let availability_array;
        if (hemisphere === "north") {availability_array = fishData.north.availability_array}
        else {availability_array = fishData.south.availability_array}

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
            <div className="sub-card bug-card-name">{capitalizeWords(FishData.name)}</div>
            <div className="bug-card-body">
                <div className="bug-card-div">
                    <div className="sub-card fish-card-photo-div">
                        <img src={FishData.render_url} alt={capitalizeWords(FishData.name)} className="fish-card-photo" />
                        <span className="fish-card-shadow">Shadow : {FishData.shadow_size}</span>
                    </div>
                </div>
                <div className="bug-card-div">
                    <div className="sub-card bug-card-availability">{populateAvailablity(FishData, "north")}</div>
                    <div className="sub-card fish-card-location">{FishData.location}</div>
                    <div className="sub-card bug-card-sell">{FishData.sell_nook.toLocaleString()} Bells</div>
                </div>
            </div>
            <div className="bug-card-button-div">
                <button onClick={() => {changeCaught()}} data-pressed={isCaught} className="sub-card bug-card-button caught-button">
                    <img src={rod} alt="Caught/Uncaught" className="button-logo"/>
                </button>
                <button onClick={() => {changeDonation()}} data-pressed={isDonated} className="sub-card bug-card-button donated-button">
                    <img src={donateLogo} alt="Donated/Undonated" className="button-logo"/>
                </button>
            </div>
        </div>
    )
}

export default FishCard;