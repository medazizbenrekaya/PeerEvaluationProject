
import React from "react";
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



function NavBarStudent() {

    return(
        <SideNav
            onSelect={(selected) => {
                if (selected === 'home')
                {
                    document.location.href="/";
                }
                else if (selected === 'profile')
                {
                    document.location.href="/profile-page";
                }
                else if (selected === 'workshops')
                {
                    document.location.href="/Workshop-Page2";
                }
                else if (selected === 'peer')
                {
                    document.location.href="/peer";
                }
                else if (selected === 'SE/CA')
                {
                    document.location.href="/QuizCognitiveAbility";
                }
                else if (selected === 'SE/L')
                {
                    document.location.href="/selfEvaluation";
                }
                else if (selected === 'SE/C')
                {
                    document.location.href="/QuizCommunication";
                }
                else if (selected === 'SE/P')
                {
                    document.location.href="/QuizProfessionalism";
                }
                else if (selected === 'SE/E')
                {
                    document.location.href="/QuizEffectivness";
                }
                else if (selected === 'SE/M')
                {
                    document.location.href="/QuizManaging";
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <i className="fa fa-user" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>

                </NavItem>
                <NavItem eventKey="peer">
                    <NavIcon>
                        <i className="fa fa-check" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        peer Evaluation
                    </NavText>

                </NavItem>

                <NavItem eventKey="SE">
                    <NavIcon>
                        <i className="fa fa-check-circle-o" style={{ fontSize: '1.75em' }}  />
                    </NavIcon>
                    <NavText>
                        Self Evaluation
                    </NavText>
                    <NavItem eventKey="SE/C">

                        <NavText>
                           Communication
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="SE/CA">

                        <NavText>
                           Cognitive ability
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="SE/E">

                        <NavText>
                            Effectivness
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="SE/M">

                        <NavText>
                            Managing
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="SE/P">

                        <NavText>
                            Professionalism
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="SE/L">

                        <NavText>
                            Leadership
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="workshops">
                    <NavIcon>
                        <i className="fa fa-tasks" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Workshops
                    </NavText>

                </NavItem>
            </SideNav.Nav>
        </SideNav>);
}


export default NavBarStudent;
