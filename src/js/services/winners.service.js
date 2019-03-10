import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class WinnersService {

    getWinners(option) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners${option}`)
                .then((response) => {
                    resolve(response);
                    console.log(response);
                })
                .catch((err) => reject(err));
        });
    }
}