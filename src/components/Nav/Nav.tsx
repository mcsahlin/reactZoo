import { Link } from 'react-router-dom';
import monkey from './../../assets/img/monkey.png';
import './Nav.scss';
export const Nav = () => {
	return (
		<nav className='nav'>
			<nav className='nav__container'>
				<img
					className='nav__logo'
					src={monkey}
					alt='En apa som logotyp'
				/>
				<ul className='nav__menu'>
					<li className='nav__menu-item'>
						<Link
							to='/'
							className='nav__link'
						>
							The<span className='nav__zoo'>Zoo</span>
						</Link>
					</li>
				</ul>
			</nav>
		</nav>
	);
};
