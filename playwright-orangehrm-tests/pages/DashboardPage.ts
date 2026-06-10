import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly userDropdown: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.adminMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.pimMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'PIM' });
    this.timeAtWorkWidget = page.locator('div.oxd-dashboard-widget').filter({ hasText: 'Time at Work' });
    this.myActionsWidget = page.locator('div.oxd-dashboard-widget').filter({ hasText: 'My Actions' });
    this.userDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutOption = page.locator('a[href*="logout"]');
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutOption.click();
    await this.page.waitForURL(/login/);
  }

  async getMenuItemCount(): Promise<number> {
    return await this.page.locator('a.oxd-main-menu-item').count();
  }
}
