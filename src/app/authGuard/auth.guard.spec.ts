import { AuthGuard } from "./auth.guard";

 describe('Service : AuthGaurd' , ()=>{
   let Service:AuthGuard;
   let authServiceMock :any;
   let routerMock:any;

   beforeEach(() =>{
    authServiceMock = {
      isLoggedIn:jest.fn()
    };
    routerMock = {
      navigate:jest.fn()
    }
   });
   it('should create the app', () => {
    expect(AuthGuard).toBeTruthy();
  });
   describe('Test:canActive', ()=>{
    it('should return true' , () => {
      const spycanActive = jest.spyOn(Service, 'checkLoginIn').mockReturnValue(true);
    })
   })
 })
