import './App.css';
import { useState, useEffect } from 'react';
import { LatLngExpression, icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Team {
  school: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
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

// New Map component
function Map({ teamNames }: { teamNames: Team[] }) {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <br></br>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {teamNames.map((team) => (
          <Marker
            key={team.name}
            position={[team.latitude, team.longitude] as LatLngExpression}
            icon={icon({
              iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
              iconSize: [8, 8],
              iconAnchor: [4, 4],
              popupAnchor: [0, -10],
            })}
          >
            <Popup>
              <strong>{team.school}</strong>
              <br />
              {team.city}, {team.state}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function App() {
  const [teamNames, setTeamNames] = useState<Team[]>([]);

  useEffect(() => {
    fetch('/CollegeBasketballTeams.json')
      .then((response) => response.json())
      .then((data) => setTeamNames(data.teams))
      .catch((error) => console.error('Error fetching teams:', error));
  }, []);

  return (
    <>
      <Welcome />
      <TeamList />
      <Map teamNames={teamNames} />
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
  justifyContent: 'flex-start',
};

const headerStyle = {
  flexGrow: 1,
  marginBottom: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
};

const locationStyle = {
  marginTop: 'auto',
};

export default App;
