// import Homelogo from 'app/assets/javascripts/homelogo';
// import $ from "jquery";
class Game extends React.Component {

    render () {
        var home_team = this.props.game.home_team;
        var homeLogo =  this.props.game.logo;
      var home_logoSrc = this.props.game.home_team.logoSrc
        var away_team = this.props.game.away_team;
      var away_logoSrc = this.props.game.away_team.logoSrc
        var awayLogo = this.props.game.awayLogo;

        return (
          <tr className={this.getGamePickedClass()} onClick={this.handlePickSelect.bind(this)}>
              <td><i className="game-icon material-icons">{this.getIcon()}</i></td>
              <td id="awayTeam" className={this.getTeamSelectedClass(away_team.id) + " select-team"} data-team-id={away_team.id}>
                <img src={away_team.logo_path} className="logos" />
                 {away_team.name} <br></br> ({away_team.wins}-{away_team.losses})
               </td>
              <td className="score">{this.getScorePretty()}</td>
              <td id="homeTeam" className={this.getTeamSelectedClass(home_team.id) + " select-team"} data-team-id={home_team.id}>
                  <img src={home_team.logo_path} className="logos" />
                 {home_team.name} <br></br> ({home_team.wins}-{home_team.losses})
              </td>
              {/* <td><a data-target="modaxxl1" class="btn modal-trigger">t</a></td> */}
              <td id='homeSpread' className={this.getTeamSelectedClass(home_team.id)}> {this.getSpreadPretty(true)} </td>
              <td className="datePretty"> {this.getDatePretty()} </td>
          </tr>
        );
    }

  componentDidMount() {
  }

  whoIsTheAwayTeam(away_team){
    return away_team.name
  }

  whoIsTheAwayTeam(away_team){
    return away_team.name
  }
  getScorePretty () {
    var homeScore = this.props.game.home_team_score;
    var awayScore = this.props.game.away_team_score;

    if (homeScore || awayScore || homeScore === 0 || awayScore === 0) {
      return homeScore + " - " + awayScore
    }else{
      return "@"
    }
  }
  getSpreadPretty (home) {
      var spread = (home) ? this.props.game.home_spread : this.props.game.home_spread * -1;
      if (spread > 0) {
          return "+" + spread;
      }
      if (spread == 0) {
          return "PK"
      }
      return spread;
  }
  getTeamSelectedClass (winner_id) {
      if (this.props.game.pick && winner_id === this.props.game.pick.winner_id) {
          return 'team-selected';
      }
      return '';
  }
  getLogoClass(){

  }
  getIcon () {
      var game_winner_id = this.props.game.spread_winner_id;
      if ((game_winner_id || this.props.game.push) && this.props.game.pick) {
          var user_winner_id = this.props.game.pick.winner_id;
          if (this.props.game.push) {
              return 'thumbs_up_down';
          } else if (game_winner_id === user_winner_id) {
              return 'thumb_up';
          } else {
              return 'thumb_down';
          }
      }
      return (this.hasGameStarted()) ? 'lock_outline' : 'lock_open';
  }

  hasGameStarted () {
      var game_date = new Date(this.props.game.time);
      var now = new Date();

      return ((now - game_date) > 0) ? true : false;
  }

  getTeamSelectedClass (winner_id) {
      if (this.props.game.pick && winner_id === this.props.game.pick.winner_id) {
          return 'team-selected';
      }

      return '';
  }
  getGamePickedClass () {
      var game_winner_id = this.props.game.spread_winner_id;
      if ((game_winner_id || this.props.game.push) && this.props.game.pick) {
          var user_winner_id = this.props.game.pick.winner_id;
          if (this.props.game.push) {
              return 'pick-draw';
          } else if (game_winner_id === user_winner_id) {
              return 'pick-win';
          } else {
              return 'pick-loss';
          }
      }

      if (this.props.game.pick && this.props.game.pick.winner_id) {
          return 'pick-active';

      }
  }

  getDatePretty () {
    var gameStatus = this.props.game.game_status;
    return (this.hasGameStarted()) ? gameStatus : moment(this.props.game.time).format('ddd. MMM. DD h:mm A');
  }
  handlePickSelect (e) {
      var winner_id = $(e.target).data('team-id');

      // check if they are deselecting
      if (this.props.game.pick && this.props.game.pick.winner_id == winner_id) {
          this.props.removePick(this.props.game.id);
          return;
      }

      var _this = this;
      this.props.addNewPick({
          winner_id: winner_id,
          game_id: _this.props.game.id,
          week: _this.props.game.week
      });
  }
}

Game.propTypes = {
    game: React.PropTypes.object

};
