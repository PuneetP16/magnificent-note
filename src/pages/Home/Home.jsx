import React from "react";
import { useState } from "react";
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
	const [showFilter, setShowFilter] = useState(false);

	const closeFilter = () => {
		showFilter && setShowFilter((visible) => !visible);
	};

	const toggleFilterPanel = (e) => {
		const isFilterPanelBtn = e.currentTarget.className === "bx bx-filter";
		if (isFilterPanelBtn) setShowFilter(false);

		if (
			e.currentTarget.className ===
			"filter__icon btn btn--icon btn--primary btn--circular btn--floating"
		)
			setShowFilter(true);
	};

	return (
		<div className="home_page">
			<main className="main--home_page">
				<section className="note_editor_section">
					<div className="note_container">
						<NoteEditor />
					</div>

					<div
						onClick={closeFilter}
						className={`filter__modal ${showFilter ? "modal_container" : ""}`}
						style={{ display: "flex" }}
					>
						<button
							onClick={toggleFilterPanel}
							className="filter__icon btn btn--icon btn--primary btn--circular btn--floating"
						>
							<i className="bx bx-filter"></i>
						</button>
						{showFilter ? (
							<div
								onClick={(e) => e.stopPropagation()}
								className="filter_panel__wrapper filter_panel_mobile"
							>
								<FilterPanel />
							</div>
						) : null}
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
