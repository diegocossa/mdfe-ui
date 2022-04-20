import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from '../../../services/util/loading.service';

@Component({
  selector: 'app-admin-layout-sidebar-compact',
  templateUrl: './admin-layout-sidebar-compact.component.html',
  styleUrls: ['./admin-layout-sidebar-compact.component.scss']
})
export class AdminLayoutSidebarCompactComponent implements OnInit {
  moduleLoading: boolean;

  constructor(
    public navService: NavigationService,
    public searchService: SearchService,
    private router: Router,
    public loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.moduleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.moduleLoading = false;
      }
    });
  }

}
