const profileForm = document.getElementById('profile-form')
const nameInput = document.getElementById('full_name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const cityInput = document.getElementById('city')

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

/* Attach mapbox API to city input, for typeahead */