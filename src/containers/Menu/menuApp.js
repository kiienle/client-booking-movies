export const adminMenu = [
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-home"></i>
            </span>
        ),
        index: 1,
        name: "menu.system.dashboard",
        link: "/system/dashboard",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="far fa-user"></i>
            </span>
        ),
        index: 2,
        name: "menu.system.user-manage",
        link: "/system/user-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-tv"></i>
            </span>
        ),
        index: 6,
        name: "menu.cinema.cinema",
        link: "/system/cinema",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-film"></i>
            </span>
        ),
        index: 7,
        name: "menu.cinema.cineplex",
        link: "/system/cineplex",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-video"></i>
            </span>
        ),
        index: 3,
        name: "menu.movie.movie-manage",
        link: "/system/movie-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="fas fa-clock"></i>
            </span>
        ),
        index: 4,
        name: "menu.movie.showtime-manage",
        link: "/system/showtimes-manage",
    },
    {
        icon: (
            <span className="menu-icon">
                <i class="far fa-credit-card"></i>
            </span>
        ),
        index: 5,
        name: "menu.movie.ticket-manage",
        link: "/system/movie-manage",
    },
];

export const homeMenu = [
    {
        index: 1,
        name: "menu.home",
        link: "/",
    },
    {
        index: 2,
        name: "menu.movie.movie",
        link: "/movie",
    },
    {
        index: 3,
        name: "menu.cinema.cineplex",
        link: "/cineplex",
    },
    {
        index: 4,
        name: "menu.movie.show-time",
        link: "/show-time",
    },
];
