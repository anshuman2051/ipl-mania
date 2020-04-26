import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Tbl from './components/GenTable/GenTable';



class App extends Component {
constructor(props){
    super(props);
    const teamJson = require('./ipl_json_data/teams.json');
    const teamSeasons = require('./ipl_json_data/seasons.json');

    this.state = {
        teams :teamJson,
        seasons: teamSeasons,
        players: null 
    };
  }

  componentDidMount(){
    const teamJson = require('./ipl_json_data/teams.json');
    const teamSeasons = require('./ipl_json_data/seasons.json');
    const players= require('./ipl_json_data/player.json');

    const newPlayers = players.filter( (players)=>(
      players["Is_Umpire"] === 0
    ));
    const finalPlayers = newPlayers.map( (players)=>{
      delete players["Is_Umpire"];
      return players;
    });

    //finding matches for orange caps
    const newTeamSeasons = teamSeasons.map( (season)=>{
      let orangePlayerName = " nothing";
      let purplePlayerName = "";
      let manOfTheSeries = "";

      for(let player of players){
        if(season["Orange_Cap_Id"] === player["Player_Id"]) 
          orangePlayerName = player["Player_Name"] ;
        if( season["Purple_Cap_Id"] === player["Player_Id"]) 
          purplePlayerName =  player["Player_Name"]; 
        if( season["Man_of_the_Series_Id"] === player["Player_Id"]) 
          manOfTheSeries =  player["Player_Name"]; 
      }
      season["Orange_Cap_Id"] = orangePlayerName;
      season["Purple_Cap_Id"] = purplePlayerName;
      season["Man_of_the_Series_Id"] = manOfTheSeries;
      return season;
    }) 
    this.setState({players: finalPlayers, teams: teamJson, seasons : newTeamSeasons});

  }
  render(){

    return (
      <div className="App">
        { this.state.seasons ? 
        <Tbl heading="Teams" names={["id","team","code"]} data={this.state.teams}/> : null
        }
        {this.state.teams ?
        <Tbl heading="seasons" names={["id","year","Orange Cap","Purple cap","Man of the series"]} data={this.state.seasons}/>: null
        }
        {
          this.state.players ? 
          <Tbl heading="Players" names={["id","year","Orange Cap","Purple cap","Man of the series"]} data={this.state.players}/>:null
        }
        
      </div>
    );
    }
}

export default App;
