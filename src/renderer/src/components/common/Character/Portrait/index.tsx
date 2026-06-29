import * as styles from './index.css';

interface CharacterPortraitProps {
  src?: string;
}

export function CharacterPortrait({ src }: CharacterPortraitProps) {
  if (!src) {
    return null;
  }

  return (
    <span className={styles.frame}>
      <img alt="" className={styles.image} src={src} />
    </span>
  );
}
