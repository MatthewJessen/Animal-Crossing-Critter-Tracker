import { useState, useEffect } from "react";
import { useRequireUser } from "../hooks/useRequireUser";
import logo from "../assets/logo.png";
import { getMonthsCritters } from "../hooks/getMonthsCritters";
import { splitCatchStatus } from "../hooks/splitCatchStatus";
import { splitDonatedStatus } from "../hooks/splitDonatedStatus";
import CardContainer from "../components/CardContainer";

function Home() {
  const [bugList, setBugList] = useState([]);
  const [fishList, setFishList] = useState([]);
  const [bugHeader, setBugHeader] = useState("This Month's");
  const [fishHeader, setFishHeader] = useState("This Month's");
  const [bugsCaught, setBugsCaught] = useState([]);
  const [bugsDonated,  setBugsDonated] = useState([]);
  const [fishCaught, setFishCaught] = useState([]);
  const [fishDonated, setFishDonated] = useState([]);
  const [month, setMonth] = useState("current");
  const [catchStatus, setCatchStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const user = useRequireUser();

  useEffect(() => {
    setLoading(true);
        async function getData() {
          // Get list of all bugs user has caught
          const bugsCaughtRes = await fetch(`/api/bugs/caught`, { method: "GET", headers: { "Content-Type": "application/json" }});
          const bugsCaughtBody = await bugsCaughtRes.json();
          setBugsCaught(bugsCaughtBody);
      
          // Get list of all bugs user has donated
          const bugsDonatedRes = await fetch(`/api/bugs/donated`, { method: "GET", headers: { "Content-Type": "application/json"}});
          const bugsDonatedBody = await bugsDonatedRes.json();
          setBugsDonated(bugsDonatedBody);
      
          // Get list of all fish user has caught
          const fishCaughtRes = await fetch(`/api/fish/caught`, { method: "GET", headers: { "Content-Type": "application/json" }});
          const fishCaughtBody = await fishCaughtRes.json();
          setFishCaught(fishCaughtBody);
      
          // Get list of all fish user has donated
          const fishDonatedRes = await fetch(`/api/fish/donated`, { method: "GET", headers: { "Content-Type": "application/json"}});
          const fishDonatedBody = await fishDonatedRes.json();
          setFishDonated(fishDonatedBody);

          setLoading(false);
        }
        getData();
  }, []);

  useEffect(() => {
    async function getMonthList() {
      const monthsRes = await getMonthsCritters(month);
      setBugList(monthsRes[0]);
      setFishList(monthsRes[1]);
      readCatchStatus();
    }
    getMonthList();
  }, [month, catchStatus])

  if (!user) {
    return null;
  }

  if (loading) return <div>Loading...</div>

  function changeMonth(e) {
    setMonth(e.target.value);
    setBugHeader(e.target.options[e.target.selectedIndex].text + "'s");
    setFishHeader(e.target.options[e.target.selectedIndex].text + "'s");
  }

  async function readCatchStatus() {
    const splitBugs = splitCatchStatus("bug", bugList, bugsCaught);
    const splitFish = splitCatchStatus("fish", fishList, fishCaught);
    if (catchStatus === "all") {
      return;
    }
    else if (catchStatus === "caught") {
      setBugList(splitBugs[0]);
      setFishList(splitFish[0]);
    }
    else if (catchStatus === "uncaught") {
      setBugList(splitBugs[1]);
      setFishList(splitFish[1]);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <img src={logo} alt="My App" className="home-logo" />
      <h2 className="home-welcome">Welcome to your Critter Collection Helper!</h2>
      <div className="filters-div">
        <label htmlFor="month">Month: </label>
        <select className="filters-month" value={month} onChange={(e) => changeMonth(e)}>
          <option value={"current"}>Current</option>
          <option value={1}>January</option>
          <option value={2}>Febuary</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <label htmlFor="catch-status">Catch Status: </label>
        <input type="radio" id="all" name="catch-status" value="all" checked={catchStatus === "all"} onChange={(e) => setCatchStatus(e.target.value)}/>
        <label htmlFor="all">All</label>
        <input type="radio" id="caught" name="catch-status" value="caught" checked={catchStatus === "caught"} onChange={(e) => setCatchStatus(e.target.value)}/>
        <label htmlFor="caught">Caught</label>
        <input type="radio" id="uncaught" name="catch-status" value="uncaught" checked={catchStatus === "uncaught"} onChange={(e) => setCatchStatus(e.target.value)}/>
        <label htmlFor="uncaught">Uncaught</label>
      </div>
      <h2>{bugHeader} Bugs</h2>
      <CardContainer type={"bug"} CritterList={bugList} CatchList={bugsCaught} DonatedList={bugsDonated} />
      <h2>{fishHeader} Fish</h2>
      <CardContainer type={"fish"} CritterList={fishList} CatchList={fishCaught} DonatedList={fishDonated} />
    </div>
  );
}

export default Home;
