import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = false;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }
  

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    })

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  } 

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this.flashMessage.show('Fill up form correctly!', {
        cssClass: 'alert-warning', timeout: 4000
      })
    } else {
      this.clientService.updateClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
