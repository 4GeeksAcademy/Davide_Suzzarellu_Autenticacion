import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SignUpModal } from "./SignUpModal.jsx";
import { LoginModal } from "./LoginModal.jsx";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const [ signupModalShow, setSignpModalShow ] = useState(false);
	const [ loginModalShow, setLoginModalShow ] = useState(false);
	const { store, actions } = useContext(Context)
	const { logged } = store
	const { setLogged, setUser } = actions

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Title</span>
				</Link>
					{logged
					? 
					(
						<Button
							variant="danger"
							onClick={() => {
								setLogged(false);
								setUser([]);
							}}
							>
							Log Out
						</Button>
					)
					:
					(
						<div className="d-flex flex-row gap-2">
							<Button variant="success" onClick={() => setSignpModalShow(true)}>
									Sign In
							</Button>
							<Button onClick={() => setLoginModalShow(true)} className="btn btn-primary">
								Log In
							</Button>
						</div>
					)}	
					<SignUpModal show={signupModalShow} onHide={() => setSignpModalShow(false)}/>
					<LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)}/>
			</div>
		</nav>
	);
};
