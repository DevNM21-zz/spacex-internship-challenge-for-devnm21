import React from 'react';
import './Header.css';
import logo from '../logo.png'
const Header = () => {
	return (
		<>
			<div className={'header-div'} >
				<img alt={'SpaceX'} src={logo} />
			</div>
			
		</>
		)
}

export default Header;