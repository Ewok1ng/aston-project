# aston-project 
[![Actions](https://github.com/Ewok1ng/aston-project/actions/workflows/actions.yml/badge.svg)](https://github.com/Ewok1ng/aston-project/actions/workflows/actions.yml)

- Предметная область: приложение комиксов вселенной Marvel.
- Использованное API: [Marvel API](https://developer.marvel.com/docs)

---

## Основной функционал

- Регистрация и авторизация пользователей
- Избранные комиксы: пользователь может добавлять или удалять из списка избранных
- ...

---

## Реализация требований

### 1 уровень (обязательный - необходимый минимум)

- [ ] Реализованы Требования к функциональности.

#### React

- [ ] Реализованы Требования к функциональности.
- [x] Пишем функциональные компоненты c хуками.
- [x] Есть разделение на [умные](src/pages/main/main.tsx) и [глупые](src/components/button/button.tsx) компоненты.
- [x] Есть рендеринг [списков](src/pages/main/main.tsx).
- [x] Реализована хотя бы одна [форма](src/components/form/form.tsx).
- [x] Есть применение Контекст API.
- [ ] Есть применение предохранителя.
- [x] Есть хотя бы один кастомный [хук](src/hooks/auth.ts).
- [ ] Хотя бы несколько компонентов используют PropTypes.
- [x] Поиск не должен триггерить много запросов к серверу (debounce).
- [ ] Есть применение lazy + Suspense.

#### Redux

- [x] Используем Modern Redux with Redux [Toolkit](src/store/store.ts).
- [x] Используем [слайсы](src/store/reducers/all-comics/slice.ts).
- [ ] Есть хотя бы одна кастомная мидлвара.
- [x] Используется RTK Query.
- [x] Используется Transforming Responses.

---

### 2 уровень (необязательный)

- [x] Используется TypeScript
- [ ] Подключен storybook и созданы два, три сториса с knobs, которые показывают разные состояния компонента.
- [x] Использвуется Firebase
- [x] Настроен CI/CD
- [ ] Реализована виртуализация списков
- [ ] Используются мемоизированные селекторы (createSelector).
- [ ] Используется нормализованная структура стейта (createEntityAdapter).
- [ ] Тесты через jest, react-testing-library
