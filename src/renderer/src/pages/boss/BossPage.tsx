import { pageShell, pageTitle } from '../../common.css';
import { FilterKeysCard } from './components/FilterKeysCard';
import * as styles from './BossPage.css';

export function BossPage() {
  return (
    <section className={pageShell} aria-labelledby="boss-page-title">
      <div className={styles.content}>
        <h1 className={pageTitle} id="boss-page-title">
          Boss
        </h1>

        <FilterKeysCard />
      </div>
    </section>
  );
}
