// components/AccountPannel.js

import Link from 'next/link';
import styles from '../../styles/Account.module.css';

function AccountPannel({ isVisible, toggleVisibility }) {
    return (
      <>
        {isVisible ? (
          <div className={styles.panelVisible}>
            <div className={styles.iconContainer} onClick={toggleVisibility}>
              <img src="/icons/remove.svg" alt="Hide Icon" className={styles.icon} />
            </div>
            <ul>
              <li>
                <Link href="/account/mes-informations" passHref>
                  <div className={styles.linkButton}>Mes informations</div>
                </Link>
              </li>
              <li>
                <Link href="/account/mes-challenges" passHref>
                  <div className={styles.linkButton}>Mes challenges</div>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className={styles.showPanelButton} onClick={toggleVisibility}>
          </div>
        )}
      </>
    );
  }
  
  export default AccountPannel;