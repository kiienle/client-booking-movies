export const adminMenu = [
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-home"></i>
            </span>
        ),
        isActive: false,
        name: "menu.system.dashboard",
        link: "/system/dashboard",
    },
    {
        icon: (
            <span className="menu-icon">
                <i className="fas fa-user"></i>
            </span>
        ),
        isActive: false,
        name: "menu.system.user-manage",
        link: "/system/user-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-video"></i>
            </span>
        ),
        isActive: false,
        name: "menu.movie.movie-manage",
        link: "/system/movie-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-clock"></i>
            </span>
        ),
        isActive: false,
        name: "menu.movie.showtime-manage",
        link: "/system/movie-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-credit-card"></i>
            </span>
        ),
        isActive: false,
        name: "menu.movie.ticket-manage",
        link: "/system/movie-manage",
    },
];
