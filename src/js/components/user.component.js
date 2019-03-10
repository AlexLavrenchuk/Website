import { AuthService } from './../services/auth.service';
import { ActiveRoute } from './../core/active.route.service';
import { UserService } from './../services/user.service';
import { DeleteImageModalComponent } from './deleteImageModal.component';

export class UserComponent {
    constructor() {
        this._activeRoute = new ActiveRoute();
        this._authService = new AuthService();
        this._userService = new UserService();

        this._authUserId = this._authService.userId;
        this._activeUserId;
        this._user;
        this._userImages = [];
        this._imagesTemplate;
        this._deleteImageModalComponent;
    }
    async beforeRender() {
        this._activeUserId = this._activeRoute.parseRequestURL().id;

        this._user = await this._userService.getUser(this._activeUserId);
        this._userImages = await this._userService.getUserImeges(this._activeUserId);

        this._imagesTemplate = this._userImages.images.map((image) => this.__singleImageTemplate(image));

        this._deleteImageModalComponent = new DeleteImageModalComponent();
    }
    render() {
        return `
            <!-- Component styles -->
            <style>
                ${this.style()}
            </style>
            <!-- Component html -->
            <div class="user-cover-container"
                style="background: url(${this._user.cover}) no-repeat center / cover;"
            >
            </div>
            <div class="user-avatar-container d-flex justify-content-center">
                <div class="user-avatar">
                    <img src="${this._user.avatar}">
                </div>
            </div>
            <div class="images-container container">
                <div class="row">
                    ${this._imagesTemplate.join('')}
                </div>
            </div>

            <div class="delete-image-modal-container"></div>
        `;
    }
    style() {
        return `
            img {
                max-width: 100%;
            }
            .user-cover-container {
                height: 400px;
                width: 100%;
            }
            .user-avatar-container {
                transform: translateY(-50%);
            }
            .user-avatar {
                width: 138px;
                height: 138px;
                border-radius: 50%;
                overflow: hidden;
            }
            .img-item {
                height: 200px;
                text-align: center;
                overflow: hidden;
                background-color: #000;
                margin-bottom: 30px;
                position: relative;
            }
            .img-item img {
                height: 100%;
                max-width: none;
            }
            .img-item-hover {
                opasity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                color: #fff;
                background: rgba(0, 0, 0, .5);
                transition: all .3 ease-in;
            }
            .img-item:hovet .img-item-hover {
                opasity: 1;
            }
        `;
    }

    _singleImageTemplate(image) {
        return `
            <div class="col col-4">
                <div class="img-item" data-imadeId="${image._id}">
                    <img src="${image.url}">
                    <div class="img-item-hover">
                        <span>
                            <i class="fas fa-eye"></i>
                            ${image.views.length}
                        </span>
                        <span>
                            <i class="fas fa-thumbs-up"></i>
                            ${image.likes.length}
                        </span>
                        <span>
                            <i class="fas fa-trach-alt delete-image" data-toggle="modal" data-target="#deleteImageModal"></i>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
    afterRender() {
        document.querySelectorAll(".delete-image").forEach((icon) => icon.addEventListener('click', (e) => {
            const imageId = e.target.closest('[data-imageId]').dataset.imageid;
            const [image] = this._userImages.images.filter((img) => img._id === imageId);
            this._deleteImageModalComponent.imageForDelete = image;
            document.querySelector('.delete-image-modal-container').innerHTML = this._deleteImageModalComponent.render();
        }));
    }
}