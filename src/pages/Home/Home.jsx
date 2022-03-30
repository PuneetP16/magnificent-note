import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
	return (
		<div className="home_page">
			<main className="main--home_page">
				<aside className="nav notes_nav">
					<ul className="nav__items">
						<Link to="" className="nav__list_item">
							<i className="bx bx-home"></i>
							<span className="nav__item">Home</span>
						</Link>
						<Link to="" className="nav__list_item">
							<i className="bx bx-label"></i>
							<span className="nav__item">Labels</span>
						</Link>
						<Link to="" className="nav__list_item">
							<i className="bx bx-archive-in"></i>
							<span className="nav__item">Archive</span>
						</Link>
						<Link to="" className="nav__list_item">
							<i className="bx bx-trash-alt"></i>
							<span className="nav__item">Trash</span>
						</Link>
						<Link to="" className="nav__list_item">
							<i className="bx bx-user-circle"></i>
							<span className="nav__item">Profile</span>
						</Link>
					</ul>
				</aside>
				<section className="note_section_container">
					<div className="note_action_container">
						<div>New Note</div>
						<div>List of Notes</div>
					</div>
				</section>
			</main>
		</div>
	);
};
