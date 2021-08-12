import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
const http = jest.fn();
  beforeEach(() => {
    service = new AuthenticationService(http as any, Router as any);
    window.localStorage.clear();
  });
  it('should create the app', () => {
    expect(AuthenticationService).toBeTruthy();
  });
  describe('Test:isLoggedIn', () => {
    it('should return false', ()=>{
      expect(service.setUserRole('currentUser')).toEqual(false);
    })
  });
  describe('Test:isLoggedIn', () => {
    it('should return false', ()=>{
      const objUser = {
        user:{name:test}
      }
      expect(window.localStorage.getItem('currentUser')).toBeNull();
      window.localStorage.setItem('currentUser', JSON.stringify(objUser));
      expect(service.setUserRole('currentUser')).toEqual(true)
    })
  });
  describe('Test:logout', () => {
    it('should clear localstorage', ()=>{
      window.localStorage.setItem('currentUser', null);
      service.currentUser = null;
      expect(service.currentUser).toBe(null)
      expect(window.localStorage.getItem('currentUser')).toBe('');
    })
  });
});
