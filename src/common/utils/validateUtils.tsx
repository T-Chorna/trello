export function validateBoardTitle(name: string): boolean {
    if (name.trim() === '') {
      return false;
    }
    const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s._-]+$/;
  
    return regex.test(name);
  }