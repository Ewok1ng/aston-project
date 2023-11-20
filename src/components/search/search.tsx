import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

import { Button, ItemSuggest } from '../../components';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import {
	fetchComicsByTitle,
	fetchSuggestComicsByTitle
} from '../../store/reducers/search/action-creators';
import { addHistory } from '../../store/reducers/history/action-creators';
import { FormatEnum, getImage } from '../../utils/images';

import s from './search.module.css';
import { SearchIcon } from './search-icon';

export function Search() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth } = useAuth();
	const { suggestList } = useAppSelector(state => state.searchReducer);

	const autocompleteRef = React.useRef<null | HTMLDivElement>(null);
	const inputRef = React.useRef<null | HTMLInputElement>(null);

	const [searchValue, setSearchValue] = React.useState('');
	const [isSuggestVisible, setIsSuggestVisible] = React.useState(false);

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			autocompleteRef.current &&
			!autocompleteRef.current.contains(e.target as Element) &&
			e.target !== inputRef.current
		) {
			setIsSuggestVisible(false);
		}
	};

	const getSuggestComics = React.useCallback(
		debounce(value => {
			dispatch(fetchSuggestComicsByTitle(value));
		}, 500),
		[]
	);

	const navigateToSearchPage = () => {
		navigate({
			pathname: '/search',
			search: createSearchParams({ name: searchValue }).toString()
		});
		setIsSuggestVisible(false);
	};

	const onSearchButtonClick = () => {
		navigateToSearchPage();
		dispatch(fetchComicsByTitle(searchValue));
		saveToHistory();
	};

	const saveToHistory = () => {
		if (isAuth) {
			dispatch(addHistory(searchValue));
		}
	};

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		getSuggestComics(e.target.value);
	};

	const onSearchFocus = () => {
		setIsSuggestVisible(true);
		dispatch(fetchSuggestComicsByTitle(searchValue));
	};

	const onClickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			onSearchButtonClick();
		}
	};

	const onSuggestItemClick = () => {
		navigateToSearchPage();
		setSearchValue('');
	};

	return (
		<div className={s.search}>
			<div className={s.container}>
				<input
					className={s.input}
					ref={inputRef}
					type="search"
					value={searchValue}
					onChange={onChangeSearchValue}
					onFocus={onSearchFocus}
					onKeyDown={onClickEnter}
				/>
				<Button
					className={s.button}
					buttonType="icon"
					onClick={onSearchButtonClick}
				>
					<SearchIcon />
				</Button>
			</div>
			<div
				className={classNames(s.suggest, {
					[s.visible]: isSuggestVisible && searchValue.length > 0
				})}
				ref={autocompleteRef}
			>
				<ul className={s.list}>
					{suggestList.map(item => (
						<ItemSuggest
							className={s.item}
							key={item.id}
							id={item.id}
							title={item.title}
							image={getImage(item, FormatEnum.portrait)}
							onClick={onSuggestItemClick}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
