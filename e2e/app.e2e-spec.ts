import { ScribblePage } from './app.po';

describe('scribble App', function() {
  let page: ScribblePage;

  beforeEach(() => {
    page = new ScribblePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sc works!');
  });
});
