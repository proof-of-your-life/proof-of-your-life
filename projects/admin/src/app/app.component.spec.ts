import { RenderResult, render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let appComponent: AppComponent;

  describe('Initial state', () => {
    beforeEach(async () => {
      renderResult = await render(AppComponent);
      appComponent = renderResult.fixture.componentInstance;
    });

    it('should create the app', async () => {
      expect(appComponent).toBeTruthy();
    });

    it(`should have the 'admin' title`, async () => {
      expect(appComponent.title).toEqual('admin');
    });

    it('should render title', async () => {
      expect(screen.getByText('Welcome to admin!')).toBeDefined();
    });

    it('should render environment', async () => {
      expect(screen.getByText('Environment: dev')).toBeDefined();
    });

    it('should render useEmulator', async () => {
      expect(screen.getByText('useEmulator: true')).toBeDefined();
    });

    it('should render Blockchain Symbol Network', async () => {
      expect(
        screen.getByText('Blockchain Symbol Network: testnet'),
      ).toBeDefined();
    });
  });
});
