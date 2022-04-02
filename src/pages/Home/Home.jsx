import React from "react";
import { NoteEditor, NoteListing, NoteListWrapper } from "../../components";
import "./Home.css";
import { useNote } from "../../contexts";

export const Home = () => {
	const { noteState } = useNote();

	const { noteList } = noteState;
	return (
		<div className="home_page">
			<main className="main--home_page">
				<section className="note_editor_section">
					<div className="note_container">
						<NoteEditor />
					</div>
				</section>
				<section className="note_lisiting_section">
					<h3>Pinned Notes</h3>
					<NoteListWrapper>
						{noteList?.length > 0 ? (
							<NoteListing
								noteList={noteList
									.filter((note) => !note.isTrash)
									.filter((note) => note.isPinned)}
								isPinSection={true}
							/>
						) : null}
					</NoteListWrapper>
				</section>
				<section className="note_lisiting_section">
					<h3>Other Notes</h3>
					<NoteListWrapper>
						{noteList?.length > 0 ? (
							<NoteListing
								noteList={noteList.filter((note) => !note.isTrash)}
							/>
						) : null}
					</NoteListWrapper>
				</section>
			</main>
		</div>
	);
};
