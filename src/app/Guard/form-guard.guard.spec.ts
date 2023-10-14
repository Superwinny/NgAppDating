import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formGuardGuard } from './form-guard.guard';

describe('formGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
