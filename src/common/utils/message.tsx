import Swal from 'sweetalert2';

export const showSuccessMessage = (messageTitle:string, messageText:string)=>{
    Swal.fire(messageTitle, messageText, 'success');
}

export const showErrorMessage = (messageTitle:string, messageText:string)=>{
    Swal.fire({
        icon: 'error',
        title: messageTitle,
        text: messageText,
      });
}

const showErrorByStatus = (status:number)=>{
    switch (status) {
        case 400:
          showErrorMessage('Помилка!', 'Запит некоректний. Перевірте введені дані.');
          break;
        case 404:
          showErrorMessage('Помилка!', 'Ресурс не знайдено.');
          break;
        case 500:
          showErrorMessage('Помилка!', 'На сервері виникла помилка. Спробуйте пізніше.');
          break;
        case 503:
          showErrorMessage('Помилка!', 'Сервер тимчасово недоступний. Спробуйте пізніше.');
          break;
        default:
          showErrorMessage('Помилка!', 'Щось пішло не так. Спробуйте ще раз.');
          break;
      }
}

export const handleError = (err:any)=>{
    console.error("Failed to fetch boards", err);
    // Перевіряємо, чи є відповідь від сервера і чи вона містить статус-код
    if (err.response) {
      const status = err.response.status;
      // Обробка різних статус-кодів
      showErrorByStatus(status);
    } else if (err.request) {
      // Запит був зроблений, але не отримано відповіді (наприклад, проблеми з мережею)
      showErrorMessage('Помилка!', 'Не вдалося підключитися до сервера. Перевірте інтернет-з’єднання.');
    } else {
      // Щось інше пішло не так
      showErrorMessage('Помилка!', 'Виникла невідома помилка. Спробуйте ще раз.');
    }
  }

  export const showMessageDelete = async (messageTitle: string) => {
    const result = await Swal.fire({
      title: messageTitle,
      text: 'Цю дію не можна буде скасувати!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, видалити!',
      cancelButtonText: 'Скасувати',
    });
  
    // Повертаємо true, якщо користувач підтвердив дію
    return result.isConfirmed;
  };