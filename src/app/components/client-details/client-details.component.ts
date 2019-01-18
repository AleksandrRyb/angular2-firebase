import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }
  id: string;
  client: Client;
  hasBalance: boolean = false;
  balanceUpdatedInput: boolean = false;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
        this.client = client;
      }
    })
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Balance Updated", {
      cssClass: 'alert-success', timeout: 4000
    })
  }

  onDeleteClick(){
    this.clientService.deleteClient(this.client);
    this.flashMessage.show("User was deleted", {
      cssClass: 'alert-success', timeout: 4000
    })
    this.router.navigate(['/'])
  }

}
