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
  const [gamerResults, setResults] = useState([])
  const [cache, setCache] = useState(false)
  const [selectedPlayer, setPlayer] = useState({aggScore: 0})
  const [tournies, setTournies] = useState([])
  console.log(gamerResults)
  function toggleSearch() {
    console.log('Changing search')
    let newSearch = !search
    setSearch(newSearch)
  }
  function getGamer(e) {
    e.preventDefault()
    // when invoked, will send a request to get data on the gamer tag given.
    axios.get(`/getGamer?gamerTag=${gamerTag}`).then((res) => {
      //after recieving response, will set player data to display
      setResults(res.data.data.data)
      //check here if the response was cached and then change cache to true if it is.
      console.log(res.data)
      console.log(gamerResults)
    })
  }
  function getAxios() {
    axios.get('/getPlayer').then((res) => {
      console.log(res.data.data)
    })
  }
  const searchList = gamerResults.map((ele, i) => {
    return (
      <ListItem key={i} onClick={e => setPlayer(gamerResults[i])}>
          <ListItemAvatar>
            <Avatar src={`${ele.avatar}`} />
          </ListItemAvatar>
          <ListItemText primary={`${ele.gamerTag}`} secondary={`${ele.name}`} />
      </ListItem>
    )
  })
  return (
    <MainContainer>
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
        <PlayerAvatar>
          <Avatar src={`${selectedPlayer.avatar}`} style={{transform: 'scale(4.9)'}} />
        </PlayerAvatar>
        <InfoTextHolder>
          <BlackText style={{'font-size': '12px'}}>
            A.GG score: {selectedPlayer.aggScore} pts
          </BlackText>
          <BlackText style={{'font-size': '20px'}}>
            {selectedPlayer.gamerTag}
          </BlackText>
          <BlackText>
            {selectedPlayer.name}
          </BlackText>
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