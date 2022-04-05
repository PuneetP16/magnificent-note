import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import { useDocumentTitle } from "../../customHooks";
import { bxIcons } from "../../data/icons";
import "./Archive.css";

export const Archive = () => {
	const { noteState } = useNote();
	useDocumentTitle("Archive | MS");

	const { archiveList } = noteState;
	return (
		<section className="note_lisiting_section">
			{archiveList?.length > 0 ? (
				<>
					<h3>Archived Notes</h3>
					<NoteListWrapper>
						<NoteListing list={archiveList} isArchive="true" />
					</NoteListWrapper>
				</>
			) : (
				<div className="empty_list archive_list">{bxIcons.archive}</div>
			)}
		</section>
	);
};
