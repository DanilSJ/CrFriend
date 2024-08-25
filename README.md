# CrFriend

## Предварительные требования

Перед тем как запустить проект, убедитесь, что у вас установлены следующие инструменты:

- [Node.js](https://nodejs.org/) (версия 16 или выше)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (если вы работаете с Expo)

## Установка

1. Клонируйте репозиторий на ваш локальный компьютер:

   `bash
     ``` git clone https://github.com/DanilSJ/CrFriend.git```

    Перейдите в директорию проекта:

    bash

cd CrFriend

Установите зависимости:

Если вы используете npm:

bash

  ```npm install```

Если вы используете yarn:

bash

```yarn install```

# Запуск проекта
1. Запуск проекта с Expo

Если ваш проект создан на основе Expo, запустите его с помощью следующей команды:

bash

```expo start```

Это откроет браузер с Expo Dev Tools, где вы сможете запустить приложение на эмуляторе или физическом устройстве.
2. Запуск проекта с использованием EAS (Expo Application Services)

Если ваш проект настроен для сборки через EAS, используйте следующие команды:
Инициализация EAS (если еще не выполнено)

bash

```eas build:configure```

Сборка проекта для iOS

bash

```eas build -p ios```

Сборка проекта для Android

bash

```eas build -p android```

После завершения сборки вы получите ссылку для загрузки .apk или .ipa файла.
