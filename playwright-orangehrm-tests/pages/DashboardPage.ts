import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly myInfoMenu: Locator;
  readonly performanceMenu: Locator;
  readonly directoryMenu: Locator;
  readonly maintenanceMenu: Locator;
  readonly buzzMenu: Locator;
  readonly menuItems: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly userDropdown: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.adminMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.pimMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'PIM' });
    this.leaveMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Leave' });
    this.timeMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Time' });
    this.recruitmentMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Recruitment' });
    this.myInfoMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'My Info' });
    this.performanceMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Performance' });
    this.directoryMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Directory' });
    this.maintenanceMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Maintenance' });
    this.buzzMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Buzz' });
    this.menuItems = page.locator('.oxd-sidepanel-body a.oxd-main-menu-item');
    this.timeAtWorkWidget = page.locator('div.oxd-dashboard-widget:has-text("Time at Work")');
    this.myActionsWidget = page.locator('div.oxd-dashboard-widget:has-text("My Actions")');
    this.userDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutOption = page.locator('a[href*="logout"]');
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutOption.click();
    await this.page.waitForURL(/login/);
  }

  async getMenuItemCount(): Promise<number> {
    await this.page.waitForSelector('.oxd-sidepanel-body a.oxd-main-menu-item', { timeout: 10000 });
    return await this.menuItems.count();
  }

  async getMenuItemTexts(): Promise<string[]> {
    return await this.menuItems.allTextContents();
  }

  async gotoMenu(menuName: string) {
    const item = this.page.locator('a.oxd-main-menu-item').filter({ hasText: menuName });
    await item.click();
    await this.page.waitForLoadState('networkidle');
  }
}
