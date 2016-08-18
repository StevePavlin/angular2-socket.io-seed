import { SeedPage } from './app.po';

describe('seed App', function() {
  let page: SeedPage;

  beforeEach(() => {
    page = new SeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
