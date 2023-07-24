const profileForm = document.getElementById('profile-form')
const nameInput = document.getElementById('full_name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const cityInput = document.getElementById('city')
const addressResultsContainer = document.getElementById('address_results')

function debounce(callback, timeout = 500) {
    let timer

    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(this, ...args)
        }, timeout)
    }
}

profileForm.addEventListener( 'submit', submitProfileForm )
function submitProfileForm(e) {
    e.preventDefault()

    const name = nameInput.value
    const phone = phoneInput.value
    const email = emailInput.value
    const city = cityInput.value

    /* get the location_grid from mapbox selection */

    const data = {
        name,
        phone,
        email,
    }

    /* submit data to profile API endpoint */

    console.log(data)
}

const processLocation = debounce(getAddressSuggestions)
cityInput.addEventListener( 'input', processLocation )

function getAddressSuggestions(event) {
    const address = event.target.value

    if (address.length < 1) {
        return
    }


    const root = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const settings = '.json?types=country,region,postcode,district,place,locality,neighborhood,address&limit=6&access_token='
    const key = zumeProfile.map_key

    const url = root + encodeURI( address ) + settings + key

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.features.length < 1) {
                addressResultsContainer.innerHTML = `
                    No Locations Found
                ` /* TODO: translate and escape me */
            }

            window.mapbox_results = data

            let locations = ''
            data.features.forEach((feature) => {
                locations += `
                    <div class="address-result" id="${feature.id}" data-place-name="${feature.place_name}">
                        ${feature.place_name}
                    </div>
                ` /* TODO: escape place names */
            })

            addressResultsContainer.innerHTML = locations

            addressResults = document.querySelectorAll('.address-result')
            addressResults.forEach((result) => {
                result.addEventListener('click', (e) => {
                    /* Escape placeName */
                    const placeName = e.target.dataset.placeName

                    cityInput.value = placeName
                    addressResultsContainer.innerHTML = ''
                })
            })
        })

}
