import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class PersonsService{
    personsChanged = new Subject<string[]>();
    persons!: string[];

    constructor(private httpClient: HttpClient) {

    }

    fetchPersons() {
        this.httpClient.get<any>('https://swapi.dev/api/people')
            .pipe(map(resData => {
                return resData.results.map((character: { name: string; }) => character.name);
            }))
            .subscribe(transformedData => {
                this.personsChanged.next(transformedData);
            });
    }

    addPerson (name: string) {
        this.persons.push(name);
        this.personsChanged.next(this.persons);
    }

    removePerson (name: string) {
        this.persons = this.persons.filter(person =>{
            return person !== name;
        });
        this.personsChanged.next(this.persons);
    }
}