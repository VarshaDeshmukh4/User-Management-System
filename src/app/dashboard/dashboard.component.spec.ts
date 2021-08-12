import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let fixture: DashboardComponent;
  let autheServicesMock:any;
  beforeEach( () => {
    autheServicesMock = {
    isLoggedIn:jest.fn()
   };

   fixture = new DashboardComponent(
     autheServicesMock
   )
  });
  it('should create the app', () => {
    expect(fixture).toBeTruthy();
  });
}
)
