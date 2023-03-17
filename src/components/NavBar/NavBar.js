import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import {  NavLink } from "react-router-dom";



export default function NavBar() {
    
    
    
    return (
        <nav>
            <ul className="List">
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : 'inactive'} to="/">Todos los Productos</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : 'inactive'} to="/category/zapatos">Zapatos</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : 'inactive'} to="/category/borcegos">Borcegos</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : 'inactive'} to="/category/botas">Botas</NavLink>
                </li>
                <CartWidget />
            </ul>

        </nav>
    )
}