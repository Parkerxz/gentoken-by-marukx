const {default: axios} = require("axios");
const fs = require("fs");
var colors = require('colors');
const playwright = require("playwright");
const chalkAnimation = require("chalk-animation");


(async  function() {
    while (true) {
        await sleep(await GenerateToken("!"));
    }
})();


function GenerateToken(Proxy) {
        return new Promise(async function(resolve) {
        console.log(
          
            `                                                                             
              ╔══════════════════════════════════════════════════════════════════════════════════════════════╗
              ║ ███╗   ███╗     █████╗     ██████╗ ██╗   ██╗    ██╗  ██╗    ██╗  ██╗                         ║
              ║ ████╗ ████║    ██╔══██╗    ██╔══██╗██║   ██║    ██║ ██╔╝    ╚██╗██╔╝                         ║
              ║ ██╔████╔██║    ███████║    ██████╔╝██║   ██║    █████╔╝      ╚███╔╝                          ║
              ║ ██║╚██╔╝██║    ██╔══██║    ██╔══██╗██║   ██║    ██╔═██╗      ██╔██╗                          ║
              ║ ██║ ╚═╝ ██║    ██║  ██║    ██║  ██║╚██████╔╝    ██║  ██╗    ██╔╝ ██╗                         ║
              ║ ╚═╝     ╚═╝    ╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═╝    ╚═╝  ╚═╝                         ║
              ╚══════════════════════════════════════════════════════════════════════════════════════════════╝
            `.rainbow
            );

            chalkAnimation.rainbow ("[STARTED] " + Proxy);
            const PBrowser = await playwright.firefox.launch({headless: false});
            const PContext = await PBrowser.newContext();
            const PPage = await PContext.newPage();
            var startTime = Date.now();
            try {
                try {
                await PPage.goto("https://discord.com/", {"timeout": 60000, "waitUntil": "networkidle"});
                chalkAnimation.rainbow("[WORKING] " + Proxy);
            }
                catch {
                chalkAnimation.rainbow("[BAD] " + Proxy);
                throw false;
            }
            await PPage.click("#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div > div.ctaContainer-3vWJHU > button");
            await sleep(1000);
            await PPage.type("input.username-27KRPU", Math.random().toString(36).substring(2, 7) + " | Hee\n");
            await PPage.waitForSelector("iframe");
            chalkAnimation.rainbow("[CAPTCHA DETECTED] " + Proxy);
            startTime = Date.now();
            await sleep(3000);
            await PPage.click("iframe");
            var email = Math.random().toString(36).substring(2, 12);
            await axios.post("https://api.internal.temp-mail.io/api/v3/email/new", {"domain": "kjkszpjcompany.com", "name": email});
            email += "@kjkszpjcompany.com";
            await sleep(1000);
            await PPage.waitForSelector("#react-select-2-input");
            chalkAnimation.rainbow("[CAPTCHA SOLVED] " + Proxy);
            await PPage.type("#react-select-2-input", "January\n");
            await PPage.type("#react-select-3-input", "1\n");
            await PPage.type("#react-select-4-input", "2000\n\n");
            await PPage.waitForSelector("button.close-hZ94c6");
            await PPage.click("button.close-hZ94c6");
            await sleep(1000);
            await PPage.waitForSelector("input[type='text']");
            await PPage.type("input[type='text']", email);
            await PPage.type("input[type='password']", "lilsky@\n");
            chalkAnimation.rainbow("[EMAIL ADDED] " + Proxy);
            var emailData;
            while (true) {
                var emailData = await axios.get("https://api.internal.temp-mail.io/api/v3/email/" + email + "/messages").then(res => res.data);
                if (emailData.length !== 0) {
                    emailData = emailData[0].body_text.split("Verify Email: ")[1].trim();
                    break;
                }
                await sleep(1000);
            }
            chalkAnimation.rainbow("[EMAIL Request Temp Mail Verify] " + Proxy);
            await PPage.goto(emailData);
            await PPage.waitForSelector("h3.title-jXR8lp");
            while (await PPage.innerText("h3.title-jXR8lp") !== "Email Verified!") {
                try {
                    await PPage.waitForSelector("iframe", {"timeout": 3000});
                    await PPage.click("iframe");
                }
                catch {}
                await sleep(1000);
            }
            chalkAnimation.rainbow("[EMAIL VERIFIED] " + Proxy);
            var Token = await PPage.evaluate(function() {
                var iframe = document.createElement("iframe");
                document.head.append(iframe);
                return iframe.contentWindow.localStorage.getItem("token").replace(/"/g, "");
            });
            fs.appendFileSync("./Tokens.txt", Token +"\n");
            chalkAnimation.rainbow("[Gen Token Success Save To Tokens.txt] " + Proxy);
            await PBrowser.close();
            chalkAnimation.rainbow("[FINISHED] " + Proxy);
        }
        catch {
            chalkAnimation.rainbow("[ERROR] " + Proxy);
            await PBrowser.close();
        }
        resolve(startTime + 150000 - Date.now());
    });
}

function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}