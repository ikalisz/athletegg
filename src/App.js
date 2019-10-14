import React, {useState} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import * as Icon from 'react-feather'
import './App.css';

function App() {
  // I will be using React hooks for all my state.
  const [gamerTag, setGamer] = useState('')
  const [search, setSearch] = useState(false)
  const [gamerResults, setResults] = useState([])
  const [cache, setCache] = useState(false)
  function toggleSearch() {
    console.log('Changing search')
    let newSearch = !search
    setSearch(newSearch)
  }
  function getGamer() {
    // when invoked, will send a request to get data on the gamer tag given.
    axios.get(`/getGamer?gamerTag=${gamerTag}`).then((res) => {
      //after recieving response, will set player data to display
      console.log(res.data)
    })
  }
  function getAxios() {
    axios.get('/getPlayer').then((res) => {
      console.log(res.data.data)
    })
  }
  return (
    <MainContainer>
      {
        search ? 
        <SearchHolder>
          <IconSpan onClick={() => toggleSearch()} title='Click this to close the search'>
            <Icon.XCircle  />
          </IconSpan>
        </SearchHolder>
        :
        null
      }
      <RowHolder>
        {
          cache ?
          <IconSpan title='This search was retrieved from the cache'>
            <Icon.AlertCircle title='This search was retrieved from the cache' color='white' />
          </IconSpan>
          :
          <IconSpan></IconSpan>
        }
        <Text header={true}>Athlete.gg</Text>
        <IconSpan onClick={() => toggleSearch()} title='Click this to search a player'>
          <Icon.Search color='white' />
        </IconSpan>
      </RowHolder>
      <PlayerInfo>
        Player Info
      </PlayerInfo>
      <AboutHolder>
        About
      </AboutHolder>
      <TourneyHolder>
        Tournies
      </TourneyHolder>
    </MainContainer>
  )
}

export default App;

//All styling below using styled-components

//The container for the webpage.
const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #7e57c2;
`

//This is the main flexbox component I will adapt my styles off of.
const RowHolder = styled.div`
  height: 4%;
  width: 88%;
  display: flex;
  padding: 0px;
  align-items: center;
  justify-content: space-between
`

//You can adapt styles based on previous styled components you have created.

const PlayerInfo = styled(RowHolder)`
  height: 28%;
  width: 90%;
  background: white;
`

//This will also become a component I will adapt styles off of.
const ColumnHolder = styled(RowHolder)`
  height: 100%;
  width: 55%;
  flex-direction: column;
  justify-content: space-between;
`

const AboutHolder = styled(ColumnHolder)`
  height: 10%;
  width: 90%;
  justify-content: center;
  background: white;
`

const TourneyHolder = styled(ColumnHolder)`
  height: 40%;
  width: 85%;
  justify-content: space-evenly;
  background: white;
`

const SearchHolder = styled(ColumnHolder)`
  height: 95%;
  width: 92%;
  border-radius: 10px;
  background: white;
  position: absolute;
`

const IconSpan = styled.span`
  height: 24px;
  width: 24px;
`

const Text = styled.p`
  font-family: ${props => props.header ? 'Comfortaa' : 'Roboto' };
  color: white;
`