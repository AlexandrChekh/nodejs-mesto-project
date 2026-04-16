export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;

export const INVALID_USER_CREATE_DATA_MESSAGE = 'Переданы некорректные данные при создании пользователя';
export const INVALID_USER_UPDATE_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
export const INVALID_USER_AVATAR_DATA_MESSAGE = 'Переданы некорректные данные при обновлении аватара';
export const INVALID_CARD_CREATE_DATA_MESSAGE = 'Переданы некорректные данные при создании карточки';
export const INVALID_CARD_LIKE_DATA_MESSAGE = 'Переданы некорректные данные для постановки/снятия лайка';
export const USER_BY_ID_NOT_FOUND_MESSAGE = 'Пользователь по указанному _id не найден';
export const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
export const CARD_NOT_FOUND_MESSAGE = 'Карточка с указанным _id не найдена';
export const ROUTE_NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
export const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
export const INVALID_EMAIL_MESSAGE = 'Неправильный формат почты';
export const INVALID_EMAIL_OR_PASSWORD_MESSAGE = 'Передан неверный логин или пароль';
export const DUPLICATE_USER_EMAIL_MESSAGE = 'При регистрации указан email, который уже существует на сервере;';
export const FORBIDDEN_CARD_DELETE_MESSAGE = 'Попытка удалить чужую карточку';

export const URL_REGEX = /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?#?$/;
export const INVALID_URL_MESSAGE = 'Некорректный URL';
