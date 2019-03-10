import { WinnersService }  from './../services/winners.service';

export class WinnersComponent {
    constructor(option) {
        this._winnersService = new WinnersService();
        this._option = option || "?part=1&limit=15";
        this._winners = [];
        this._winnersTemplate;
    }
    async beforeRender() {
        this._winners = await this._winnersService.getWinners(this._option);

        this._winnersTemplate = this._winners.winners.map((item) => this._singleWinnersTemplate(item));
    }
    render() {
        return `
            <style>
                ${this._style()}
            </style>
            <div class="title">
                <img src="${this._winners.winners[0].member_id.images[0].image_basic.url}" alt="img"/>
            </div>

            <div class="images-container container">
                <div class="row">
                    ${this._winnersTemplate.join('')}
                </div>
            </div>
            
        `;
    }

    _style() {
        return `
            .title {
                height: 500px;
                overflow: hidden;
                margin-bottom: 100px;
            }
            .title img {
                width: 100%
            }
            .img-item img {
                max-width: 100%;
            }   
        `;
    }

    _singleWinnersTemplate({member_id: { images } }) {
        let res = '';
        images.forEach(item => {
        res += `
            <div class="col col-4">
                <div class="img-item">
                    <img src="${item.image_basic.url}">
                    <div class="img-item-hover">
                        <span>
                            <i class="fas fa-eye"></i>
                        </span>
                        <span>
                            <i class="fas fa-thumbs-up"></i>
                        </span>
                        <span>
                            <i class="far fa-heart"></i>
                        </span>
                    </div>
                </div>
            </div>
        `;
        });

        return res;
    }

    afterRender() {
        
    }
}