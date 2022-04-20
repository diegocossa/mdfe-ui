import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class RemoveConfirmModalData {
  modalTitle: string;
  objectToRemoveName: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './remove-confirm-modal.component.html',
  styleUrls: ['./remove-confirm-modal.component.scss']
})
export class RemoveConfirmModalComponent implements OnInit {
  data: RemoveConfirmModalData;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
