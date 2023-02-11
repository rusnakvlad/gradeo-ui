import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private messageService: MessageService) {
  }

  success(message: string = "Changes saved") {
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
  }

  error(message: string = "Changes not saved") {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Record not created', life: 3000});
  }
}
