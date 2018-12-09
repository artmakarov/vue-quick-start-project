export class ResponseObject {
  constructor({ data = null, error = null }) {
    return { isSuccess: !error, data, error };
  }
}

export class ResponseRequestError {
  constructor(errorMessage) {
    let error = null;

    if (/404/.test(errorMessage) || errorMessage === 'Network Error') {
      error = 'Сервис недоступен';
    } else if (/401/.test(errorMessage)) {
      error = 'Ошибка аутентификации';
    } else {
      error = errorMessage;
    }

    return new ResponseObject({ error });
  }
}
