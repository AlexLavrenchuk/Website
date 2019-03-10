import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';

export class NavbarComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._userId;
    }
    async beforeRender() {
        this._userId = this._authService.userId;
    }
    render() {
        if (!this._authService.token) return "";

        return `
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">App</a>
            <ul class="navbar-nav d-flex flex-row">
                
                <li class="nav-item ml-3">
                    <a class="nav-link" href="/#/">Home</a>
                </li>

                <li class="nav-item ml-3">
                    <a class="nav-link" href="/#/users/${this._userId}">My profile</a>
                </li>

                <li class="nav-item ml-3">
                    <a class="nav-link" href="/#/payment">Payment</a>
                </li>

                <li class="nav-item ml-3">
                    <a class="nav-link" href="/#/news">News</a>
                </li>
                
                <li class="nav-item ml-3">
                    <a class="nav-link" href="/#/winners">Winners</a>
                </li>

            </ul>
            <button class="btn btn-primary logout-btn">Logout</button>
        </nav>
        `;
    }
    afterRender() {
        if (!this._authService.token) return;

        document.querySelector('.logout-btn').addEventListener('click', (event) => {
            this._authService.logout()
                .then(() => this._routing.navigate('/login'));
        });
    }
}