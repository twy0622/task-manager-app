import mainLogo from'./assets/icon.png';

function Header() {
    return (
        <header>
            <p className="h1 mb-4 text-center display-3 text-primary-emphasis bg-primary-subtle">
                Task Manager
                &nbsp;
                <img src={mainLogo} width="80" height="80"/>
            </p>
        </header>
    );
}

export default Header