import { FormControl } from '@angular/forms';
import { Injectable } from '../../node_modules/@angular/core';


@Injectable()
export class Pwdvalidation {
     MatchPassword(AC: FormControl) {
        return new Promise(resolve => {
            let password = AC.value.newpwd; // to get value in input tag
            let confirmPassword = AC.value.confirmnewpwd; // to get value in input tag
            if (password === confirmPassword) {
                return resolve(false); // All ok, passwords match!!!
            } else {
                return resolve(true)
            }
        });

    }
}