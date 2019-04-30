import { TestBed } from '@angular/core/testing';

import { EditorListStateManager2Service } from './editor-list-state-manager2.service';

describe('EditorListStateManager2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorListStateManager2Service = TestBed.get(EditorListStateManager2Service);
    expect(service).toBeTruthy();
  });
});
