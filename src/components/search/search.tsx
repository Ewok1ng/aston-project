import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

import { SearchContext } from '../../context/search-context';
import { useLazyFetchSuggestComicsByTitleQuery } from '../../store/api/comics-api';
import { useAddToHistoryMutation } from '../../store/api/history-api';
import { FormatEnum, getImage } from '../../utils/images';
import { useAuth } from '../../hooks';
import { Button, ItemSuggest, Loader } from '../../components';

import { SearchIcon } from '../icons/search-icon';

import s from './search.module.css';

export function Search() {
	const navigate = useNavigate();
	const { isAuth, user } = useAuth();

	const autocompleteRef = React.useRef<null | HTMLDivElement>(null);
	const inputRef = React.useRef<null | HTMLInputElement>(null);

	const { searchValue, setSearchValue } = React.useContext(SearchContext);
	const [isSuggestVisible, setIsSuggestVisible] = React.useState(false);

	const [trigger, { currentData, isLoading, isFetching }] =
		useLazyFetchSuggestComicsByTitleQuery();
	const [addHistory] = useAddToHistoryMutation();

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	React.useEffect(() => {
		getSuggestComics(searchValue);
	}, [searchValue]);

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
		debounce((value: string) => {
			trigger(value);
		}, 500),
		[]
	);

	const navigateToSearchPage = () => {
		navigate({
			pathname: '/search',
			search: createSearchParams({
				name: searchValue
			}).toString()
		});
		setIsSuggestVisible(false);
	};

	const onSearchButtonClick = () => {
		navigateToSearchPage();
		saveToHistory();
	};

	const saveToHistory = () => {
		if (isAuth) {
			addHistory({ email: user?.email, name: searchValue });
		}
	};

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const onSearchFocus = () => {
		setIsSuggestVisible(true);
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
					data-cy="search"
					className={s.input}
					placeholder='Enter comics name, example: "Spider-man"'
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
				{isLoading || isFetching || !currentData ? (
					<Loader className={s.loader} />
				) : (
					<ul className={s.list} data-cy="suggest-list">
						{currentData.map(item => (
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
				)}
			</div>
		</div>
	);
}
