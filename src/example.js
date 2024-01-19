import { useState, useEffect } from "react";

import "./styles.css";

// 1. Render list of the teams using TeamsCard component
// 2. Remove Team from the list of the Teams using onRemoveHander
// 3. Add logic for red cards counter, by pressing the "Add red card"
//    counter should be incremented
// Don't use:
// - if-else
// - loops (for, while, until)

//Team object example
/*
id: 1
abbreviation: "ATL"
city: "Atlanta"
conference: "East"
division: "Southeast"
full_name: "Atlanta Hawks"
name: "Hawks"
*/

const TeamCard = ({
                      id,
                      fullName,
                      city,
                      onRemove,
                      redCards,
                      onRedCardPress
                  }) => (
    <div>
        <h3>{fullName}</h3>
        <ul>
            <li>City - {city}</li>
            <li>Red Cards - {redCards}</li>
        </ul>
        <button onClick={onRemove.bind(null, id)}>Remove</button>
        <button onClick={onRedCardPress.bind(null, id)}>Add red card</button>
    </div>
);

export default function App() {
    const [teams, setTeams] = useState([]);
    console.log(teams);

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/teams")
            .then((response) => response.json())
            .then((response) =>
                setTeams(response.data.map((team) => ({ ...team, redCards: 0 })))
            );
    }, []);


    // Use this handler to remove team from the list
    const onRemoveHander = (id) => {
        return teams.filter(a=>a.id!=id)
    };

    // Use this handler to increment team's red card counter
    const redCardHandler = (id) => {
        return teams[id-1].redCards++
    };

    return (
        <div className="App">
            {teams.map((a)=><div>
                {TeamCard(a.id,a.full_name,a.city,onRemoveHander(),a.redCards,redCardHandler())}
            </div>)}
        </div>
    );
}