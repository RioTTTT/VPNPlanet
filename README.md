# Planet VPN · Playwright UI Automation

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-Report-ff6f00)
![Node](https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=node.js&logoColor=white)

Проект автоматизации UI-тестирования личного кабинета [Planet VPN](https://personal.freevpnplanet.com/).
Основной фокус: **оформление и оплата подписки**: выбор страны, валюты и периода, проверка доступных способов оплаты и открытие формы оплаты для каждого метода, включая криптовалюты.

## Возможности

- **Page Object Model**: локаторы и проверки живут в Page-классах, в сценариях остаются только шаги
- **Параметризованные тесты**: один сценарий, набор кейсов из типизированных матриц
- **Allure-отчёты** с пошаговой детализацией (`test.step`)
- **Кастомные фикстуры** для переиспользования Page-объектов и окружения
- **Генерация данных**: `@faker-js/faker`, `randomstring`, `date-fns`
- **Качество кода**: ESLint (Airbnb) + Prettier
- **CI**: GitHub Actions

## Подход к тестам

Полный перебор «страна × валюта × период × метод × криптовалюта × сеть» даёт сотни сценариев, поэтому набор построен на матрицах и осознанных допущениях:

| Слой | Что проверяет |
|---|---|
| Матрица доступности методов | какие способы оплаты доступны и заблокированы для валюты и периода |
| Матрица криптовалют | пары «валюта × сеть» и их отображение в UI |
| Кейсы | комбинации параметров так, чтобы каждое значение страны, валюты и периода встречалось минимум раз |

Критерий успешного сценария: **открылась форма оплаты выбранного метода** с корректными данными.
Сами платежи, webhook и активация услуги в UI-набор не входят.

## Требования

- Node.js 18+
- npm 9+ (рекомендуется)
- Chromium (устанавливается отдельной командой)

## Установка

```bash
git clone https://github.com/RioTTTT/AQA-Demo-Typescript
cd AQA-Demo-Typescript
npm install
npm run playwright:install
# или: npx playwright install chromium
```

## Конфигурация

Основные настройки находятся в `playwright.config.ts`:

| Параметр | Значение | Описание |
|---|---|---|
| `baseURL` | `https://personal.freevpnplanet.com/` | Базовый URL приложения |
| `workers` | `1` | Тесты выполняются последовательно |
| `timeout` | `300000` (5 мин) | Таймаут одного теста |
| `expect.timeout` | `30000` (30 сек) | Таймаут проверок `expect` |
| `actionTimeout` / `navigationTimeout` | `30000` | Таймаут действий и навигации |
| `slowMo` | `100` мс | Замедление действий браузера |
| `headless` | `true` | Запуск без интерфейса |
| `trace` | `retain-on-failure` | Трассировка только для упавших тестов |

Дополнительно:

- Chromium запускается с флагами `--use-fake-ui-for-media-stream` и `--use-fake-device-for-media-stream`
- Выданы разрешения `clipboard-read` и `clipboard-write` (нужны для проверки кнопки «Копировать»)
- В CI (`process.env.CI`) запрещён `test.only` (`forbidOnly`)

## Запуск тестов

| Задача | Команда |
|---|---|
| Все тесты | `npm test` |
| Только UI-проект | `npm run test:ui` |
| С видимым браузером | `npm run test:headed` |
| Режим отладки | `npm run test:debug` |
| По названию | `npm run test:grep "название теста"` |
| По тегу | `npx playwright test -g "@smoke"` |

### Теги

Проект `ui` запускает только тесты с тегом `@uitests` и пропускает тесты с тегом `@bug` (известные дефекты).
Теги задаются в параметрах теста:

```typescript
test('Заголовок тестового сценария', { tag: tags }, async ({ page }) => {
  // ...
});
```

| Тег | Назначение |
|---|---|
| `@uitests` | UI-тесты, входят в проект `ui` |
| `@bug` | известные дефекты, исключаются из прогона |

## Allure-отчёт

Результаты сохраняются в `allure-results`.

```bash
npm run report:generate   # сгенерировать отчёт
npm run report:open       # открыть отчёт
npm run report:serve      # сгенерировать и открыть одной командой
```

## Качество кода

```bash
npm run lint        # проверка ESLint
npm run lint:fix    # автоисправление ESLint
npm run format      # форматирование Prettier
```

## Структура проекта

```
.
├── .github/workflows/        # CI (GitHub Actions)
├── tests/
│   ├── const/                # Константы
│   ├── modules/
│   │   ├── crypto/           # Матрицы и наборы кейсов для крипто-оплаты
│   │   ├── types.ts          # Типы тестовых сценариев
│   │   ├── utils.ts          # Хелперы
│   │   └── fixtures.ts       # Кастомные фикстуры
│   └── client/
│       ├── pages/            # Page Object классы
│       └── ui-tests/         # Сценарии UI-тестов
├── playwright.config.ts      # Конфигурация Playwright
├── .eslintrc.json            # Конфигурация ESLint
├── .prettierrc               # Конфигурация Prettier
├── tsconfig.json             # Конфигурация TypeScript
└── package.json
```

## Технологии

- [Playwright](https://playwright.dev/): автоматизация браузера и тест-раннер
- TypeScript
- [Allure Playwright](https://allurereport.org/): отчётность
- [Faker.js](https://fakerjs.dev/): генерация данных
- ESLint + Prettier: линтинг и форматирование

## CI

Workflow `.github/workflows/payment-cases.yml` (GitHub Actions) запускает UI-тесты проекта `ui` в Chromium.

| Событие | Что запускается |
|---|---|
| Pull request в `main`
| Push в `main` | весь проект `ui` |
| Nightly (03:00 UTC) | весь проект `ui` |
| Ручной запуск (`workflow_dispatch`) | тест по введённому тегу или названию, пусто = весь проект `ui` |

Новый пуш в тот же PR отменяет предыдущий прогон.

**Артефакты и отчёт:**
- `allure-results` и Allure-отчёт сохраняются как артефакты прогона (14 дней)
- трейсы упавших тестов сохраняются как артефакт `playwright-traces` (7 дней)
- для push в `main` и nightly отчёт публикуется на GitHub Pages: `https://riotttt.github.io/AQA-Demo-Typescript/`

Для публикации отчёта в настройках репозитория должно быть включено **Settings → Pages → Source: GitHub Actions**.

## Автор

[RioTTTT](https://github.com/RioTTTT)
