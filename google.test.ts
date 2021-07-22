import { Builder, By, Capabilities } from "selenium-webdriver"

const chromedriver=require("chromedriver")

const driver=new Builder().withCapabilities(Capabilities.chrome()).build()
test('Google Search Test', async ()=>
{

await driver.get('https://www.google.com')
//await driver.sleep(1500)

let searchbar = await driver.findElement(By.name('q'))
await searchbar.sendKeys('devmountain\n')
await driver.sleep(5000)



await driver.quit()



})

 