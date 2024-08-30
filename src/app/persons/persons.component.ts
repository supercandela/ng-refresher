import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PersonsService } from "./persons.service";

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html'
})

export class PersonsComponent implements OnInit, OnDestroy {
   personList!: string[];
   isFetching: boolean = false;
   private personListSubs!: Subscription;
//    private personService: PersonsService;

   constructor(private prsService: PersonsService) {
    // this.personService = prsService;
   }

   ngOnInit() {
       this.personListSubs = this.prsService.personsChanged.subscribe(persons => {
           this.personList = persons;
           this.isFetching = false;
        });
        this.isFetching = true;
        this.prsService.fetchPersons();
   }

   onRemovePerson(personName: string) {
    this.prsService.removePerson(personName);
   }

   ngOnDestroy() {
       this.personListSubs.unsubscribe();
   }
}

