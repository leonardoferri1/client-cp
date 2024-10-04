import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  spinnerState: boolean = true;

  constructor(
    private spinnerService: SpinnerService,
    private detectRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinnerService.getSpinnerState().subscribe((state: boolean) => {
      if (this.spinnerState != state) {
        this.spinnerState = state;
        this.detectRef.detectChanges();
      }
    });
  }
}
