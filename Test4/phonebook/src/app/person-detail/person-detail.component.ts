import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  name: string;
  number: string;
  address: string;

  @Input() person: Person;

  constructor(private contact: ContactsComponent) { }

  ngOnInit() {
  }

  Clear() {
    this.person = null;
    this.name = null;
    this.number = null;
    this.address = null;
  }

  onAddNewPerson(name: string, number: string, address: string) {
      this.contact.persons.push({name: name, number: number, address: address});
      this.Clear();
  }
}
