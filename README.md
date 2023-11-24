# aston-project

[![Actions](https://github.com/Ewok1ng/aston-project/actions/workflows/actions.yml/badge.svg)](https://github.com/Ewok1ng/aston-project/actions/workflows/actions.yml)

- Предметная область: приложение комиксов вселенной Marvel.
- Использованное API: [Marvel API](https://developer.marvel.com/docs)

---

## Основной функционал

- Регистрация и авторизация пользователей
- Избранные комиксы: пользователь может добавлять или удалять из списка избранных
- Поиск по названию комикса, выпадающее меню из комиксов
- История поиска: сохранение даты и названия комикса, возможность перейти на страницу поиска после нажатия на название комикса или дату

---

## Реализация требований

### 1 уровень (обязательный - необходимый минимум)

- [ ] Реализованы Требования к функциональности.

#### React

- [x] Пишем функциональные компоненты c хуками: [components](src/components), [pages](src/pages).
- [x] Есть разделение на [умные](src/pages/main/main.tsx) и [глупые](src/components/button/button.tsx) компоненты.
- [x] Есть рендеринг [списков](src/pages/main/main.tsx).
- [x] Реализована хотя бы одна [форма](src/components/form/form.tsx).
- [x] Есть применение Контекст API: [SearchContext](src/context/search-context.ts), [Provider](src/app.tsx), [useContext](src/components/search/search.tsx).
- [x] Есть применение предохранителя: [ErrorBoundary](src/app.tsx), [Fallback](src/components/fallback/).
- [x] Есть хотя бы один кастомный хук: [useAuth](src/hooks/auth.ts).
- [x] Хотя бы несколько компонентов используют PropTypes: [Form](src/components/form/form.tsx), [ItemSuggest](src/components/item-suggest/item-suggest.tsx), [Loader](src/components/loader/loader.tsx).
- [x] Поиск не должен триггерить много запросов к серверу ([debounce](src/components/search/search.tsx)).
- [x] Есть применение [lazy + Suspense](src/routes/routes.tsx).

#### Redux

- [x] Используем Modern Redux with Redux Toolkit: [store](src/store/store.ts).
- [x] Используем слайсы: [userSlise](src/store/reducers/user-slice.ts).
- [x] Есть хотя бы одна кастомная мидлвара: [user-middleware](src/store/middlewares/user-middleware.ts).
- [x] Используется RTK Query: [comicsApi](src/store/api/comics-api.ts), [favouriteApi](src/store/api/favourite-api.ts), [historyApi](src/store/api/history-api.ts).
- [x] Используется Transforming Responses: [userApi](src/store/api/comics-api.ts).

---

### 2 уровень (необязательный)

- [x] Используется TypeScript
- [x] Подключен storybook и созданы два, три сториса с knobs, которые показывают разные состояния компонента: [Form](src/components/form/form.stories.tsx), [Header](src/components/header/header.stories.tsx), [ItemCard](src/components/item-card/item-card.stories.tsx), [ItemSuggest](src/components/item-suggest/item-suggest.stories.tsx).
- [x] Использвуется LS + Firebase: [auth](src/hooks/auth.ts), [favourite](src/store/api/favourite-api.ts), [history](src/store/api/history-api.ts)
- [x] Настроен CI/CD: [actions.yml](.github/workflows/actions.yml)
- [ ] Реализована виртуализация списков
- [ ] Используются мемоизированные селекторы (createSelector).
- [ ] Используется нормализованная структура стейта (createEntityAdapter).
- [ ] Тесты через jest, react-testing-library
