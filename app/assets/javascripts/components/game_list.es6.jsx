class GameList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {picks: props.picks, games: props.games, week: props.week};
    }

    componentDidMount() {
    }

    addNewPick (new_pick) {
        // TODO: make this not hacky af
        var existing_pick = _.findWhere(this.state.picks, {game_id: new_pick.game_id})
        var request_type = 'POST';

        if (existing_pick) {
            new_pick.id = existing_pick.id;
            var request_type = 'PUT';
        }

        var _this = this;
        this.sendPickRequest(new_pick, request_type, function(pick){
            var picks = _this.state.picks;
            if (request_type === 'POST') {
                picks.push(pick);
            } else {
                _.findWhere(picks, {id: pick.id}).winner_id = pick.winner_id;
            }

            var games = _this.state.games;
            _.findWhere(games, {id: pick.game_id}).pick = pick;
            _this.setState({picks: picks, games: games})
        })
    }

    removePick (game_id) {
        var pick = _.findWhere(this.state.picks, {
            game_id: game_id
        });

        if (pick.id) {
            this.sendPickRequest(pick, 'DELETE', this.handleDeletePick.bind(this, pick));
        } else {
            this.handleDeletePick(pick);
        }
    }

    handleDeletePick (pick) {
        var picks = _.without(this.state.picks, pick);
        var games = this.state.games;
        var game = _.findWhere(games, {id: pick.game_id});
        delete game.pick;

        this.setState({picks: picks, games: games});
    }

    sendPickRequest (pick, request_type, callback) {
        if (pick.id) {
            var url = this.props.url + '/' + pick.id
        } else {
            var url = this.props.url;
        }

        var _this = this;
        $.ajax({
            url: url,
            dataType: 'json',
            type: request_type,
            data: {
                pick: pick
            },
            success: function(data) {
                callback(data);
            },
            error: function(data, status, err) {
                _this.handleErrors(data.responseJSON.errors);
            }
        })
    }

    handleErrors (errors) {
        var error_message = "";
        _.each(errors, function(val, key){
            _.each(val, function(msg){
                error_message +=  msg + "<br>";
            })
        })

        Materialize.toast(error_message, 4000);
    }



    changeClass(){
      var x = document.querySelector('#test')
      x.id = "hidden10"
      debugger
    }
    render () {
        var _this = this;
        var gameNodes = this.state.games.map(function(game) {
            return (
                <Game key={game.id} game={game} addNewPick={_this.addNewPick.bind(_this)} removePick={_this.removePick.bind(_this)} />
            );
        });

        return (
          <div className="card weekly-picks-card pinned">
                  <div className="title-row">
                      <span className="heading h1">Week {this.props.week} Picks</span>
                      <br/>
                      <table>
                        <tbody id="tableHeader">
                          <th id="tableHeader_lock" className="titleHeader"></th>
                          <th id="tableHeader_visitor" className="titleHeader">Visitor Team</th>
                          <th id="tableHeader_score" className="titleHeader"></th>
                          <th id="tableHeader_home" className="titleHeader">Home Team</th>
                          <th id="tableHeader_HS" className="titleHeader">Home Spread</th>
                          <th id="tableHeader_status" className="titleHeader">Status</th>
                        </tbody>
                      </table>
                  </div>
                  <div className="card-content">
                  <table className="bordered highlight">
                    {/* <thead>
                      <tr className="columnNames">
                          <th data-id="locked"></th>
                          <th>Visiting Team</th>
                            <th className="scoreTitle">Score</th>
                          <th>Home Team</th>
                          <th className="homeSpead_th">Home Spread</th>
                          <th>Status</th>
                      </tr>
                    </thead> */}
                    <tbody id="tableBody">
                          {gameNodes}
                      </tbody>
                  </table>
              </div>
          </div>
        );
    }


}
