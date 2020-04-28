
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
                    document.location.href="/";
                }
                else if (selected === 'peer')
                {
                    document.location.href="/peer";
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
