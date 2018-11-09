import { TestBed } from '@angular/core/testing';

import { ContainersService } from './containers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DockerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ContainersService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ContainersService = TestBed.get(ContainersService);
    expect(service).toBeTruthy();
  });
});
