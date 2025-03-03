import './App.css';
import { useState, useEffect } from 'react';

interface Team {
  school: string;
  name: string;
  city: string;
  state: string;
}

function Welcome() {
  return (
    <>
      <h2>March Madness is Starting!</h2>
      <h3>Here's a list of all the teams participating!</h3>
    </>
  );
}

function Team({ school, name, city, state }: Team) {
  return (
    <tr>
      <td style={{ border: '1px solid black', padding: '8px' }}>{school}</td>
      <td style={{ border: '1px solid black', padding: '8px' }}>{name}</td>
      <td style={{ border: '1px solid black', padding: '8px' }}>{city}, {state}</td>
    </tr>
  );
}

function TeamList() {
  const [teamNames, setTeamNames] = useState<Team[]>([]);

  useEffect(() => {
    fetch('/CollegeBasketballTeams.json')
      .then((response) => response.json())
      .then((data) => setTeamNames(data.teams))
      .catch((error) => console.error('Error fetching teams:', error));
  }, []);

  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid black',
      }}
    >
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>School Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Mascot</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Location</th>
        </tr>
      </thead>
      <tbody>
        {teamNames.map((singleTeam) => (
          <Team key={singleTeam.name} {...singleTeam} />
        ))}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <>
      <Welcome />
      <TeamList />
    </>
  );
}

export default App;
