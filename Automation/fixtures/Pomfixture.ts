import { test as baseTest} from '@playwright/test';
import { LoginPage } from '../tests/pages/login-page';


type pages = {
    loginPage: LoginPage;
}

const testPages = baseTest.extend<pages>({
    loginPage:async({page},use) =>{
        await use(new LoginPage(page));
    },
})
export const test = testPages;
export const expect = testPages.expect;
