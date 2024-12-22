"use strict";

(() => {

    const getData = (url) => {
        return fetch(url).then(response => response.json())
    }

    const generateHTML = countries => {
        const countriesLength = countries.length
        const countriesPopulation = countries.map(countries => +countries.population)
            .reduce((cum, cur) => cum += cur, 0)
        const countriesAveragePopulation = Math.floor(countriesPopulation / countriesLength)

        return `
    
    Total countries result: ${countriesLength} <br>
            Total Countries Population: ${countriesPopulation} <br>
                Average Population:${countriesAveragePopulation}
                `
    }

    const generateTableHtml = (countries => {
        const regions = countries.reduce((cumulative, current) => {
            const { region } = current
            let existingCountryIndex = cumulative.findIndex(country => country.region === region)
            if (existingCountryIndex === -1) {
                cumulative.push({
                    region,
                    numberOfCountries: 0
                })
                existingCountryIndex = cumulative.findIndex(country => country.region === region)

            }
            cumulative[existingCountryIndex].numberOfCountries++
            return cumulative
        }, [])
            .map(country =>
                `<tr>
                <td>${country.region}</td>
                <td>${country.numberOfCountries}</td>       
            </tr>`
            )
            .reduce((cum, country) => cum + country, '')
        return regions
    })





    /*
        const generateTableOfLanguagesToHtml = countries => {
            countries.reduce((cumulative, current) => {
                current.map(country => country.languages)
                let existingCountryIndex = cumulative.findIndex(languages => languages.language === language)
                if (existingCountryIndex === -1) {
                    cumulative.push({
                        languages,
                        numberOfCountriesUsingTheLanguage: 0
                    })
                    existingCountryIndex = cumulative.findIndex(languages => languages.language === language)
                }
                cumulative[existingCountryIndex].numberOfCountriesUsingTheLanguage++
            })
            return cumulative
        }, [])
            .map(languages =>
            `<tr>
                <td>${languages.language}</td>
                <td>${languages.numberOfCountriesUsingTheLanguage}</td>       
            </tr>`
        )
            .reduce((cum, country) => cum + country, '')
    }
    
    */

    const renderHTML = (newHTML) => {
        document.getElementById("present").innerHTML = newHTML

    }

    const renderHTMLTable = (newHTML) => {
        document.getElementById("tbody").innerHTML = newHTML
    }


    document.getElementById("allTheCountries").addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            const countries = await getData('https://restcountries.com/v3.1/all')
            const newHTML = generateHTML(countries)
            renderHTML(newHTML)
            const newHTMLTable = generateTableHtml(countries)
            renderHTMLTable(newHTMLTable)
            /*const newLanguagesHTMLTable = generateTableOfLanguagesToHtml(countries)
            renderHTML(newLanguagesHTMLTable)*/
        } catch (e) {
            console.warn(e)
        }
    })

    document.getElementById("searchButton").addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            const specificCountry = document.getElementById("searchInput").value
            const countries = await getData(`https://restcountries.com/v3.1/name/${specificCountry}`)
            const newHTML = generateHTML(countries)
            renderHTML(newHTML)
            const newHTMLTable = generateTableHtml(countries)
            renderHTMLTable(newHTMLTable)
            /*const newLanguagesHTMLTable = generateTableOfLanguagesToHtml(countries)
            renderHTML(newLanguagesHTMLTable)*/
        } catch (e) {
            console.warn(e)
        }
    })


})()