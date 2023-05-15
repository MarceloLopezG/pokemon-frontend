import Router from 'next/router';
import styles from '../../styles/navbar.module.css';

const Navbar = () => {
    const handleChickLogOut = (event: any) => {
        event.preventDefault();
        localStorage.clear();
        Router.push('/components/login') //Redirect to login 
    }

    return (
        <>
            <nav className={styles.menu} tabIndex={0}>
                <div>
                    <img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921428/whatthecode/Menu_qklqew.svg" alt="menu" className={styles.menuTrigger} />
                </div>
                <header className={styles.avatar}>
                    <div className={styles.rowImg}>
                        <img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921415/whatthecode/logo_dclpjg.png" alt='logo' className={styles.pokemonLogo} />
                    </div>

                    <img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921407/whatthecode/avatar_wpjlkt.png" alt='avatar' className={styles.avatarImg} />
                    <div className={styles.textUserData}>
                        <h2>ASHK123</h2>
                        <h3>Level 1</h3>
                        <span>"Work hard on your test"</span>
                    </div>
                    <button className={styles.btnLogout} onClick={handleChickLogOut}><img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921428/whatthecode/Logout_wa8wqi.svg" alt="logout" className={styles.imgLogout} /><span className={styles.textLogout}>LOG OUT</span></button>
                </header>
            </nav>
        </>
    )
}

export default Navbar;