/* eslint-disable no-unused-vars */
// Menu.js
import React from 'react';
import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = ({ open, isLoggedin, isAdmin }) => {
	return (
		<StyledMenu open={open}>
			<div>
				<header>
					{isLoggedin ? (
						<Link to="/carts">
							<h3>My Cart</h3>
						</Link>
					) : (
						<Link to="/guestcart">
							<h3>Cart</h3>
						</Link>
					)}
				</header>
			</div>
			<div>
				<header>
					<Link to="/">
						<h3>All Items</h3>
					</Link>
				</header>
			</div>
			{isAdmin && (
				<div>
					<header>
						<Link to="/addItem">
							<h3>Add Item</h3>
						</Link>
					</header>
				</div>
			)}
		</StyledMenu>
	);
};

const mapStateToProps = (state) => {
	const { auth } = state.auth;
	const isLoggedin = !!auth.id;
	const isAdmin = auth.role === 'Admin';
	return {
		isLoggedin,
		isAdmin,
	};
};

export default connect(mapStateToProps, null)(Menu);
