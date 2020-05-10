
import React from "react";
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



function NavBarAdmin() {

    return(
        <SideNav
            onSelect={(selected) => {
                if (selected === 'dashboard')
                {
                    document.location.href="/admin";
                }
                else if (selected === 'historique')
                {
                    document.location.href="/historique";
                }
                else if (selected === 'statistique')
                {
                    document.location.href="/Workshop-Page2";
                }

            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav >
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <i className="fa fa-dashboard" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Dashboard
                    </NavText>
                </NavItem>
                <NavItem eventKey="historique">
                    <NavIcon>
                        <i className="fa fa-history" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Historique
                    </NavText>

                </NavItem>

                <NavItem eventKey="statistique">
                    <NavIcon>
                        <i className="fa fa-bar-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Statistique
                    </NavText>

                </NavItem>
            </SideNav.Nav>
        </SideNav>);
}


export default NavBarAdmin;
