// import myimg from './img/logos/49ers.png'

class Topbar extends React.Component {
    render () {
        return (
            <nav>
                <div className="nav-wrapper">
                  <a href="http://www.superpickem.co/picks">
                    <img className="superPickemLogo" src='http://aroncey.com/nfl_pickemL/images/superpickem.png'></img>
                  </a>
                    <a href="#" className="brand-logo title"></a>

                    {/* --- TopBar NAV MENU Start ---*/}
                      {/* <div id="topNav">
                        <a id='topBarBtn' className='topbarPickBtn' href='/picks'>Picks</a>
                        <a id='topBarBtn' className='topbarHistBtn' href='/previous'>History</a>
                        <a id='topBarBtn' className='topbarStanBtn' href='/standings'>Standings</a>
                        <a id='topBarBtn' className='topbarDistBtn' href='/distribution'>Distribution</a>
                      </div> */}
                      {/* <img src={myimg}><p>test</p></img> */}
                    {/* --- TopBar NAV MENU End ---*/}

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/signout">Sign Out</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
