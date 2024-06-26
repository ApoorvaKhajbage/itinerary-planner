import styles from '../styles/layout.module.css';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-200">
            <div className="m-auto bg-slate-50 rounded-lg w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}>
                        <div className={styles.cloudOne}>

                        </div>
                        <div className={styles.cloudTwo}>

                        </div>

                    </div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10 ">
                        {children}
                    </div>

                </div>

            </div>
          
        </div>
    );
}