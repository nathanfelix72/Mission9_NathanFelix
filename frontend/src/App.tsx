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

function TeamCard({ school, name, city, state }: Team) {
  return (
    <div style={cardStyle as React.CSSProperties}>
      <h2 style={headerStyle}>
        {school} {name}
      </h2>
      <p style={locationStyle}>
        {city}, {state}
      </p>
    </div>
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
    <div style={teamListStyle as React.CSSProperties}>
      {teamNames.map((singleTeam) => (
        <TeamCard key={singleTeam.name} {...singleTeam} />
      ))}
    </div>
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

// Styles for card layout
const teamListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

const cardStyle = {
  border: '1px solid black',
  borderRadius: '8px',
  padding: '20px',
  width: '200px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Ensures the card doesn't have extra space
};

const headerStyle = {
  flexGrow: 1, // Allows the header to expand and take available space
  marginBottom: '10px', // Space between name and location
  overflow: 'hidden', // Prevents overflow of text
  textOverflow: 'ellipsis', // Adds ellipsis if the text is too long
  whiteSpace: 'normal', // Allows text wrapping
};

const locationStyle = {
  marginTop: 'auto', // Keeps the city/state at the bottom
};

export default App;
