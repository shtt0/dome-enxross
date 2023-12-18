import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/planmake" className={styles.link}>
              プランを作る(Dao Member)
            </Link>
            <p>|</p>
            <Link href="/buy" className={styles.link}>
              プランNFT入手(ユーザ)
            </Link>
            <p>|</p>
            <Link href="/shopCheckIn" className={styles.link}>
              CheckIn（店舗）
            </Link>
            <p>|</p>
            <Link href="/pay" className={styles.link}>
              Pay（店舗）
            </Link>
            <p>|</p>
            <Link href="/shopClaim" className={styles.link}>
              Claim（店舗）
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              {/* <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              /> */}
              <p className={styles.address}>| My Wallet</p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
