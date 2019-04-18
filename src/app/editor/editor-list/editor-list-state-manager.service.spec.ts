import { TestBed } from '@angular/core/testing';

import { EditorListStateManagerService } from './editor-list-state-manager.service';

describe('EditorListStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorListStateManagerService = TestBed.get(EditorListStateManagerService);
    expect(service).toBeTruthy();
  });
});
