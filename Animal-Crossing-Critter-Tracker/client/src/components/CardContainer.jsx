import BugCard from "./BugCard";
import FishCard from "./FishCard";

function CardContainer({ type, CritterList, CatchList, DonatedList }) {
    if (type === "bug") {
        return (
            <div className="card-container">
                {CritterList.map((critter, index) => (
                    <BugCard bugData={critter} bugsCaught={CatchList} bugsDonated={DonatedList} key={index} />
                ))}
            </div>
        );
    }
    else if (type === "fish") {
        return (
            <div className="card-container">
                {CritterList.map((critter, index) => (
                    <FishCard FishData={critter} FishCaught={CatchList} FishDonated={DonatedList} key={index} />
                ))}
            </div>
        );
    } 
    else {
        return <div>Fix your code dingus.</div>;
    }
}

export default CardContainer;