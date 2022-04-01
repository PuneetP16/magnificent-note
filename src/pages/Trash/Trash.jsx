import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import "./Trash.css";

export const Trash = () => {
	const { noteState } = useNote();

	const { noteList } = noteState;
	return (
		<section className="note_lisiting_section">
			<h3>Trashed Notes</h3>
			<NoteListWrapper>
				{noteList?.length > 0 ? (
					<NoteListing
						noteList={noteList
							.filter((note) => note.isTrash)
							.filter((note) => !note.isPinned)}
					/>
				) : null}
			</NoteListWrapper>
		</section>
	);
};
