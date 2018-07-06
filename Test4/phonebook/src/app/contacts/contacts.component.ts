import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  persons: Person[] = [
    {name: 'Иван Иванович Иванов', number: '4325123', address: 'Лежневская 138а, 2'},
    {name: 'Петров Петр Петрович', number: '5353423', address: 'Лежневская 138а, 1'},
    {name: 'Григоров Григорий Григоровчич', number: '5435232', address: 'Лежневская 138а, 3'},
  ];

  selectedPerson: Person;

  constructor() { }

  ngOnInit() {
  }

  onSelect(person: Person) {
      this.selectedPerson = person;
  }

  onRemoveSelect(person: Person) {
    let index = -1;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].number === person.number)
      {
        index = i;
        break;
      }
     }

    if (index > -1) {
      this.persons.splice(index, 1);
    this.selectedPerson = null;
  }

}
