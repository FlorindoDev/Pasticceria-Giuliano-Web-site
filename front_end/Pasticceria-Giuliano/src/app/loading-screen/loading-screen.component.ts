import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '../_services/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading-screen',
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class LoadingScreen {

  constructor(protected loading_service: LoadingService) { }



}
