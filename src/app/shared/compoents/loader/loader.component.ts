import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadService } from 'src/app/core/services/load.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  MatProgressSpinnerModule

  isLoading: boolean = true;
  private subscriptionLoading: Subscription;
  constructor(private loadService: LoadService
  ) { }

  ngOnInit(): void {
    this.subscriptionLoading = this.loadService.loaderSubject.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }


  ngOnDestroy(): void {
    this.subscriptionLoading.unsubscribe();
  }
}