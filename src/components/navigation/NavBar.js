import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, SolutionOutlined, TeamOutlined, HomeOutlined, ShopOutlined, TagsOutlined, FileDoneOutlined } from '@ant-design/icons';

export const NavBar = () => {

    const signout = async () => {
        /* await db.collection('users').doc(uid).update({
            lastLogout: new Date().getTime()
        }) */
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <span onClick={signout}>Sign out</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <nav className="nav">
                {/* <img alt="Global Tracking Logo" src={globalTrackingLogo} /> */}
                {/* <Dropdown overlay={menu} trigger={['click']}>
                    <button style={{ color: "white", background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }} className="ant-dropdown-link">
                        {name} <DownOutlined />
                    </button>
                </Dropdown> */}
            </nav>


            <div className="sidebar">

                <NavLink activeClassName="sidebar-active" to="/inicio">
                    <div className="sidebar-link">
                        <HomeOutlined />
                        <p>Inicio</p>
                    </div>
                </NavLink>

                <NavLink activeClassName="sidebar-active" to="/sucursales">
                    <div className="sidebar-link">
                        <ShopOutlined />
                        <p>Sucursales</p>
                    </div>
                </NavLink>

                <NavLink activeClassName="sidebar-active" to="/usuarios">
                    <div className="sidebar-link">
                        <TeamOutlined style={{ fontSize: 24 }} />
                        <p>Usuarios</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="sidebar-active" to="/proveedores">
                    <div className="sidebar-link">
                    <SolutionOutlined />
                        <p>Proveedores</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="sidebar-active" to="/rentas">
                    <div className="sidebar-link">
                        <FileDoneOutlined />
                        <p>Rentas</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="sidebar-active" to="/mercancias">
                    <div className="sidebar-link">
                        <TagsOutlined />
                        <p>Mercancias</p>
                    </div>
                </NavLink>

            </div>

        </>
    )
}
