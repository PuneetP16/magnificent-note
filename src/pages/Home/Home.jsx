import React from "react";
import { NoteEditor, NoteListing, NoteListWrapper } from "../../components";
import "./Home.css";
import { useNote } from "../../contexts";

export const Home = () => {
	const { noteState } = useNote();

	const { noteList } = noteState;
	const pinnedList = noteList.filter((note) => note.isPinned);
	const unPinnedList = noteList.filter((note) => !note.isPinned);
	return (
		<div className="home_page">
			<main className="main--home_page">
				<section className="note_editor_section">
					<div className="note_container">
						<NoteEditor />
					</div>
				</section>
				<section className="note_lisiting_section">
					{pinnedList?.length > 0 ? (
						<>
							<h3>Pinned Notes</h3>
							<NoteListWrapper>
								<NoteListing list={pinnedList} isPinSection={true} />
							</NoteListWrapper>
						</>
					) : null}
				</section>
				<section className="note_lisiting_section">
					{unPinnedList?.length > 0 ? (
						<>
							<h3>Other Notes</h3>
							<NoteListWrapper>
								<NoteListing list={unPinnedList} />
							</NoteListWrapper>
						</>
					) : null}
				</section>
			</main>
		</div>
	);
};
