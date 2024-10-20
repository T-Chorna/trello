import { darken } from "polished";

const changeCSSVar = (nameVar:string, value:string) => {
    document.documentElement.style.setProperty(
      nameVar,
      value,
    );
  }

export const changeCSSProperties = (styles: {
  borderColor: string,
  backgroundImg: string,
  textColor: string,
  listColor: string,
}) => {
  changeCSSVar('--board-border-color', styles.borderColor);
  changeCSSVar('--main-color', styles.textColor);
  changeCSSVar('--title-color', darken(0.2, styles.textColor));
  changeCSSVar('--sticker-color', styles.listColor);
  changeCSSVar('--add-card-btn-color', darken(0.1, styles.listColor));
  changeCSSVar('--board-background', `url(${styles.backgroundImg})`);
}