import React from "react";
import {
	FilterPanel,
	NoteEditor,
	NoteListing,
	NoteListWrapper,
} from "../../components";
import "./Home.css";
import { useFilter, useNote } from "../../contexts";
import {
	filterByLabel,
	filterByPriority,
	sortItByDate,
} from "../../utilities/filterOperations";
import { useDocumentTitle } from "../../customHooks";

export const Home = () => {
	useDocumentTitle("Home | MS");

	const { noteState } = useNote();
	const { sortByDate, byPriority, selectedLabel } = useFilter();

	const { noteList } = noteState;
	const pinnedList = noteList.filter((note) => note.isPinned);
	const unPinnedList = noteList.filter((note) => !note.isPinned);

	let filteredList = filterByPriority(unPinnedList, byPriority);
	filteredList = filterByLabel(filteredList, selectedLabel);

	filteredList = sortItByDate(filteredList, sortByDate);
	return (
		<div className="home_page">
			<main className="main--home_page">
				<section className="note_editor_section">
					<div className="note_container">
						<NoteEditor />
					</div>
					<div className="filter_panel__wrapper">
						<FilterPanel />
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
					{filteredList?.length > 0 ? (
						<>
							<h3>Other Notes</h3>
							<NoteListWrapper>
								<NoteListing list={filteredList} />
							</NoteListWrapper>
						</>
					) : null}
				</section>
			</main>
		</div>
	);
};
