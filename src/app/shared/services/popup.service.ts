import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private messageService: MessageService) {
  }

  success(message: string) {
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
  }

  error(message: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Record not created', life: 3000});
  }
}
