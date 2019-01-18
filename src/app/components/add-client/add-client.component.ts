import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm') from: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsServvice: SettingsService
    ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsServvice.getSettings().disableBalanceOnAdd
  }

  onSubmit({value, valid}: {value: Client, valid: boolean }){
    if(this.disableBalanceOnAdd){
      value.balance = 0
    }

    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      this.clientService.newClient(value);
      this.flashMessage.show('New user was created', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/']);
    }
  }

}
