import { TestBed } from '@angular/core/testing';

import { MdfeService } from './mdfe.service';

describe('MdfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdfeService = TestBed.get(MdfeService);
    expect(service).toBeTruthy();
  });
});
