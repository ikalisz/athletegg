import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import * as Icon from 'react-feather'
import './App.css'
import { Input, Button, Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
  // I will be using React hooks for all my state.
  const [gamerTag, setGamer] = useState('')
  const [search, setSearch] = useState(false)
  const [about, setAbout] = useState(false)
  const [gamerResults, setResults] = useState([])
  const [selectedPlayer, setPlayer] = useState({aggScore: 0, tournies: [], about: 'Nothing here!'})
  // Making a toggle for the search and about components, that way they can toggle on when you click an icon
  function toggleSearch() {
    let newSearch = !search
    setSearch(newSearch)
  }
  function toggleAbout() {
    let newAbout = !about
    setAbout(newAbout)
  }
  function getGamer(e) {
    e.preventDefault()
    // when invoked, will send a request to get data on the gamer tag given.
    axios.get(`/getGamer?gamerTag=${gamerTag}`).then((res) => {
      //after recieving response, will set player data to display
      setResults(res.data.data.data)
      //Check for a cached player here
    })
  }
  function getPlacings(player) {
    // This will toggle search off and then get the placings of a player, combining both info into one object.
    toggleSearch()
    axios.get(`/getPlacing?id=${player.id}`).then(res => {
      setPlayer({
        ...player,
        tournies: res.data.data.data
      })
    })

  }
  // This is to create a list of the players that come from the search.
  const searchList = gamerResults.map((ele, i) => {
    return (
      <ListItem key={i} onClick={e => getPlacings(gamerResults[i])}>
          <ListItemAvatar>
            <Avatar src={`${ele.avatar}`} />
          </ListItemAvatar>
          <ListItemText primary={`${ele.gamerTag}`} secondary={`${ele.name}`} />
      </ListItem>
    )
  })
  // This creates a displayable list of the placings for a player.
  const tourneyDisplay = selectedPlayer.tournies.map((ele, i) => {
    console.log(ele.place)
    return (
      <TourneyRow key={i}>
        <Avatar src={ele.event.avatar} />
        <BlackText style={{fontSize: '12px', width: '70%'}}>
          {ele.event.name} {ele.place && ele.place > 0 ? `placed #${ele.place}` : 'No data for placement'}
        </BlackText>
      </TourneyRow>
    )
  })
  return (
    <MainContainer>
      {/* This will only show the search component if search is true */}
      {
        search ? 
        <SearchHolder>
          <RowHolder style={{ flexDirection: 'row-reverse', height: '30px', width: '97%'}}>
            <IconSpan onClick={() => toggleSearch()} title='Click this to close the search'>
              <Icon.XCircle  />
            </IconSpan>
          </RowHolder>
          <GamerSearch onSubmit={getGamer}>
            <Input variant='outlined' value={gamerTag} onChange={e => setGamer(e.target.value)} />
            <Button variant='outlined' type='submit'>Search</Button>
          </GamerSearch>
          {
            gamerResults.length > 0 ?
            <SearchResults>
              <InfiniteScroll
                  dataLength={searchList.length} //This is important field to render the next data
                  hasMore={false}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
                  }
              >
                {searchList}
              </InfiniteScroll>
            </SearchResults>
            :
            <SearchResults>
              <BlackText>
                Please search a player!
              </BlackText>
            </SearchResults>
          }
        </SearchHolder>
        :
        null
      }
      { about ?
      //Shows the about information of a player.
      <AboutWindowHolder onClick={toggleAbout}>
        <AboutWindowBackground/>
        <AboutWindow onClick={e => e.stopPropagation()}>
          <BlackText>
            {selectedPlayer.about}
          </BlackText>
        </AboutWindow>
      </AboutWindowHolder>
      :
      null
      }
      <RowHolder>
        {
          //Shows if a player is cached
          selectedPlayer.cached ?
          <IconSpan title='This search was retrieved from the cache'>
            <Icon.AlertCircle title='This search was retrieved from the cache' color='white' />
          </IconSpan>
          :
          <IconSpan></IconSpan>
        }
        {/* Header for the app */}
        <Text header={true}>Athlete.gg</Text>
        <IconSpan onClick={() => toggleSearch()} title='Click this to search a player'>
          <Icon.Search color='white' />
        </IconSpan>
      </RowHolder>
      <PlayerInfo>
        {/* Player Picture */}
        <PlayerAvatar>
          <Avatar src={`${selectedPlayer.avatar}`} style={{transform: 'scale(4.9)'}} />
        </PlayerAvatar>
        {/* One block containing the player info */}
        <InfoTextHolder>
          <BlackText style={{'fontSize': '12px'}}>
            A.GG score: {selectedPlayer.aggScore} pts
          </BlackText>
          <BlackText style={{'fontSize': '20px'}}>
            {selectedPlayer.gamerTag}
          </BlackText>
          <BlackText>
            {selectedPlayer.name}
          </BlackText>
          <AboutMeHover onClick={toggleAbout}>
            About me!
          </AboutMeHover>
        </InfoTextHolder>
      </PlayerInfo>
      {
        selectedPlayer.cover ?
          <AboutHolder style={{'backgroundImage': `url(${selectedPlayer.cover.image})`}}>
            
          </AboutHolder>
          :
          null
      }
      <TourneyHolder>
        {tourneyDisplay}
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
  background-size: cover;
  background-position: center;  
  @media (min-width: 1000px) {
    height: 15%;
  }
`

const TourneyHolder = styled(ColumnHolder)`
  height: 40%;
  width: 85%;
  justify-content: space-evenly;
  background: white;
`

const InfoTextHolder = styled(TourneyHolder)`
  height: 100%;
  width: 50%;
`

const SearchHolder = styled(ColumnHolder)`
  height: 95%;
  width: 92%;
  border-radius: 10px;
  background: white;
  position: absolute;
  z-index: 2;
`

const IconSpan = styled.span`
  height: 24px;
  width: 24px;
`

const PlayerAvatar = styled.div`
  height: 100%;
  width: 43%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
`

const TourneyRow = styled(RowHolder)`
  height: 8%;
  width: 90%;
`

const Text = styled.p`
  font-family: ${props => props.header ? 'Comfortaa' : 'Roboto' };
  color: white;
`

const BlackText = styled(Text)`
  color: black;
`

const GamerSearch = styled.form`
  height: 30px;
  width: 90%;
  display: flex;
  justify-content: space-between;
`

const SearchResults = styled(RowHolder)`
  height: 70%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`

//About Components

const AboutWindow = styled(SearchResults)`
  min-height: 1%;
  max-height: 50%;
  width: 60%;
  padding: 0 10px;
  background: white;
  position: absolute;
  z-index: 20;
  border-radius: 5px;
  overflow: scroll;
  opacity: 1.3;
`

const AboutWindowBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: #333333;
  opacity: 0.7;
`

const AboutWindowHolder = styled.div`
  height: 100%;
  width: 100%;
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AboutMeHover = styled(BlackText)`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`