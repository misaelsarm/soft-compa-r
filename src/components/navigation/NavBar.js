import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, SolutionOutlined, TeamOutlined, HomeOutlined, ShopOutlined, TagsOutlined, FileDoneOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export const NavBar = () => {

    const { name } = useSelector(state => state.auth)

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
                <h3>SOFT-COMPA-R</h3>
                <p>{name || 'Admin'}</p>
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

                <NavLink activeClassName="sidebar-active" to="/empleados">
                    <div className="sidebar-link">
                        <TeamOutlined style={{ fontSize: 24 }} />
                        <p>Empleados</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="sidebar-active" to="/proveedores">
                    <div className="sidebar-link">
                        <SolutionOutlined />
                        <p>Proveedores</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="sidebar-active" to="/gastos-renta">
                    <div className="sidebar-link">
                        <FileDoneOutlined />
                        <p>Rentas</p>
                    </div>
                </NavLink>
            </div>

        </>
    )
}
