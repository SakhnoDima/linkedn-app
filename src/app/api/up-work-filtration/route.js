require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
import { NextResponse } from "next/server";

require("dotenv").config();
puppeteer.use(StealthPlugin());

let totalClicks = 0;

export const POST = async (req, res) => {
    console.log("Function is called");
    const requestBody = req.body;

    const secret =
        requestBody.secret !== null
            ? requestBody.secret
            : (() => {
                throw new Error("ID is null");
            })();
    const id =
        requestBody.id !== null
            ? requestBody.id
            : (() => {
                throw new Error("ID is null");
            })();
    const email =
        requestBody.email !== null
            ? requestBody.email
            : (() => {
                throw new Error("Email is null");
            })();
    const password =
        requestBody.password !== null
            ? requestBody.password
            : (() => {
                throw new Error("Password is null");
            })();
    const searchTags =
        requestBody.searchTags !== null
            ? requestBody.searchTags
            : (() => {
                throw new Error("Search Tags are null");
            })();
    const searchFilters =
        requestBody.searchFilters !== null
            ? requestBody.searchFilters
            : (() => {
                throw new Error("Search Filters are null");
            })();
    const totalLettersPerDay =
        requestBody.totalLettersPerDay !== null
            ? requestBody.totalLettersPerDay
            : (() => {
                throw new Error("Total Letters Per Day is null");
            })();

    console.log(id);
    // console.log(totalLettersPerDay, searchTags, searchFilters);

    let responseBody = {
        error: null,
        time: null,
        id: id,
        publisher: requestBody.publisher,
        agency: requestBody.agency,
        targetName: requestBody.targetName,
        levelOfTarget: requestBody.levelOfTarget,
        totalClicks: 0,
        totalLettersPerDay: totalLettersPerDay,
        totalInvitationSent: 0,
        searchTags: searchTags,
        searchFilters: searchFilters,
        userNames: [],
    };

    const userDataDir = `./user_data_${requestBody.id}`;

    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: userDataDir,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 760,
        deviceScaleFactor: 1,
    });

    await page.exposeFunction("incrementClickCount", () => {
        responseBody.totalClicks += 1;
        // console.log(`Total clicks: ${responseBody.totalClicks}`);
    });

    const countClicks = async (page) => {
        await page.evaluate(() => {
            document.addEventListener("click", () => {
                window.incrementClickCount();
            });
        });
    };
    try {
        responseBody.time = await getTime();

        let title = await page.title();

        if (title === "Upwork") {
            // Keyword search
            const addSearchWordsPage = await addSearchWords(page, requestBody.searchWords);
            if (addSearchWordsPage) {
                console.log("Searched words added successful!");
                await countClicks(addSearchWordsPage);
            } else {
                console.log("Searched words did not loaded.");
            }

            // Filtration
            const addSearchFiltersPage = await addSearchFilters(page, requestBody.searchFilters);
            if (addSearchFiltersPage) {
                console.log("Searched filters added successful!");
                await countClicks(addSearchFiltersPage);
            } else {
                console.log("Searched filters did not loaded.");
            }
        } else {
            console.log("Not authorized");
            responseBody.error = "Not authorized";
            await endFunction(page, false, responseBody);
        }
    } catch (error) {
        await endFunction(page, error, responseBody);
    }

    await endFunction(page, false, responseBody);
};


const endFunction = async (page, error, responseBody) => {
    const responseJson = {
        ...responseBody,
        execution: {
            screenshotSaved: false,
            userDataUploaded: false,
            tmpDirCleaned: false,
            responseSended: true,
        },
    };

    console.log("Function ended!");

    if (error) {
        console.error("Error:", error);
        responseJson.execution.error = error;
        return NextResponse.json(
            { message: JSON.stringify(responseJson) },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: JSON.stringify(responseJson) },
        { status: 200 }
    );
};

const delayer = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scrollToElement = async (page, element) => {
    await page.evaluate((el) => {
        el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }, element);
    await delayer(1000);
};

const getTime = async () => {
    const time = new Date();

    const optionsTime = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return new Intl.DateTimeFormat('en-US', optionsTime).format(time);
};

const addSearchWords = async (page, searchWords) => {
    try {
        const searchHeader = await page.$('.main-header')
        const advancedSearchButton = await searchHeader.$('button[type="button"]')
        await advancedSearchButton.click();
        await delayer(1500);

        console.log(searchWords);
        const advancedSearchForm = await page.$('div[data-test="AdvancedSearchForm"]')
        for (const [key, value] of Object.entries(searchWords)) {
            if (key === "allOfTheseWords") {
                const allWords = await advancedSearchForm.$("input#allWords");
                await allWords.type(value);
            } else if (key === "anyOfTheseWords") {
                const anyWords = await advancedSearchForm.$("input#anyWords");
                await anyWords.type(value);
            } else if (key === "noneOfTheseWords") {
                const excludeWords = await advancedSearchForm.$("input#excludeWords");
                await excludeWords.type(value);
            } else if (key === "theExactPhrase") {
                const exactPhrase = await advancedSearchForm.$("input#exactPhrase");
                await exactPhrase.type(value);
            } else if (key === "titleSearch") {
                const titlePhrase = await advancedSearchForm.$("input#titlePhrase");
                await titlePhrase.type(value);
            } else if (key === "skillSearch") {
                const skillSearch = await advancedSearchForm.$('input[type="search"]');
                await scrollToElement(page, skillSearch);
                await delayer(1000);
                await skillSearch.click();
                await delayer(500);
                for (let skill of value) {
                    await skillSearch.focus();
                    await delayer(500);
                    await skillSearch.type(skill);
                    try {
                        await page.waitForFunction(
                            () => {
                                let spanElement = document.querySelector('div[aria-live="polite"] > span');
                                return spanElement && spanElement.textContent.includes('10 results filtered');
                            },
                            {timeout: 3000}
                        );
                    } catch (error) {
                        // Тут скоріш за все, потрібно збивати фокус з поля, але поки працює так
                        console.error(`The drop-down menu was not detected, the value "${skill}" was set manually`);
                    }
                    await page.keyboard.press("ArrowDown");
                    await delayer(200);
                    await page.keyboard.press("Enter");
                    // await delayer(500);
                    // await advancedSearchForm.click(); // Спроба збивати фокус, ловить баги
                    await delayer(1000);
                }
            } else {
                console.error(`The ${key} key does not exist`);
            }
            await delayer(200);
        }

        await page.click('button[data-test="submit-button"]');
        await delayer(5000);

        return page;
    } catch (error) {
        console.error(error);
    }
}

const addSearchFilters = async (page, searchFilters) => {
    try {
        const filtersList = await page.$('.filters-list')

        for (const [key, value] of Object.entries(searchFilters)) {
            if (key === "category") {
                const filterContainer = await filtersList.$('div[data-test-key="categories"]');
                if (filterContainer) {
                    await scrollToElement(page, filterContainer);
                    const dropdownToggle = await filterContainer.$('div[data-test="dropdown-toggle UpCDropdownToggle"]');
                    await setInputFields(page, dropdownToggle, value);
                } else {
                    console.log(`Filter "${key}" not found.`);
                }
            } else if (key === "jobType") {
                let filterContainer = await filtersList.$('div[data-test-key="jobType"]');
                if (filterContainer) {
                    await scrollToElement(page, filterContainer);
                    for (let [jobType, range] of Object.entries(value)) {
                        if (jobType === "hourlyJobType") {
                            let filterElement = await filtersList.$('label[data-test="filter-hourly-range UpCCheckbox FilterRange"]');
                            await setInputRange(filterElement, range);
                        } else if (jobType === "fixedJobType") {
                            let filterElement = await filtersList.$('label[data-test="filter-fixed-price-custom UpCCheckbox FilterRange"]');
                            await setInputRange(filterElement, range);
                        } else {
                            console.log(`"${jobType}" not found in job types.`);
                        }
                    }
                } else {
                    console.log(`Filter "${key}" not found.`);
                }
            } else if (key === "clientLocation") {
                const filterContainer = await filtersList.$('div[data-test-key="location"]');
                if (filterContainer) {
                    await scrollToElement(page, filterContainer);
                    const dropdownToggle = await filterContainer.$('div[data-test="dropdown-toggle UpCDropdownToggle"]');
                    await setInputFields(page, dropdownToggle, value);
                } else {
                    console.log(`Filter "${key}" not found.`);
                }
            } else if (key === "clientTimeZones") {
                const filterContainer = await filtersList.$('div[data-test-key="timezones"]');
                if (filterContainer) {
                    await scrollToElement(page, filterContainer);
                    const dropdownToggle = await filterContainer.$('div[data-test="dropdown-toggle UpCDropdownToggle"]');
                    await setInputFields(page, dropdownToggle, value);
                } else {
                    console.log(`Filter "${key}" not found.`);
                }
            } else {
                const filterContainer = await filtersList.$(`div[data-test-key="${key}"]`);
                if (filterContainer) {
                    await scrollToElement(page, filterContainer);
                    await setCheckBoxes(filterContainer, value);
                } else {
                    console.log(`Filter "${key}" not found.`);
                }
            }
        }
    } catch (error) {
        console.error(error)
    }

    await delayer(5000);
    return page;
};

const setCheckBoxes = async (filterContainer, value) => {
    for (const [property, isEnabled] of Object.entries(value)) {
        if (isEnabled) {
            let filter = await filterContainer.$(`label[data-test-key="${property}"]`);
            if (filter) {
                await filter.click();
                await delayer(500);
            } else {
                console.log(`Label with data-test-key="${property}" not found.`);
            }
        }
    }
}

const setInputFields = async (page, dropdownToggle, value) => {
    for (let property of value) {
        await dropdownToggle.click();
        await delayer(500);
        await page.keyboard.type(property);
        await delayer(1000);
        await page.keyboard.press("ArrowDown");
        await delayer(200);
        await page.keyboard.press("Enter");
        await delayer(500);
        await dropdownToggle.click();
        await delayer(500);
    }
}

const setInputRange = async (filterContainer, range) => {
    let inputFiled;
    for (let [rangeLimits, limit] of Object.entries(range)) {
        if (rangeLimits === "min") {
            inputFiled = await filterContainer.$('input[data-test="filter-range-min-value"]')
            await inputFiled.type(limit.toString());
        } else if (rangeLimits === "max") {
            inputFiled = await filterContainer.$('input[data-test="filter-range-max-value"]')
            await inputFiled.type(limit.toString());
        } else {
            console.log("Invalid range.")
        }
    }
}