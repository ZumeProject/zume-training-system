export function useHostProgress() {
    const toggleHost = (hostProgress, onFail) => (event) => {

        const changeHost = (key, value) => {
            const newHostProgress = { ...hostProgress }
            newHostProgress.list = { ...hostProgress.list }
            newHostProgress.list[key] = value
            hostProgress = { ...newHostProgress }
        }

        const { host, additionalHostToCredit } = event.detail
        event.stopImmediatePropagation()
        const {type, subtype, key} = host
        const currentState = hostProgress.list[key]

        if (currentState === false) {
            changeHost(key, true)

            additionalHostToCredit.forEach(({key}) => changeHost(key, true))

            return zumeRequest.post('host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id } )
                .then( ( data ) => {
                    //console.log(data)
                })
                .catch((error) => {
                    changeHost(key, false)
                    additionalHostToCredit.forEach(({key}) => changeHost(key, false))

                    onFail()
                    this.displayError(jsObject.translations.error_with_request)
                })
        }

        if (currentState === true) {
            changeHost(key, false)
            return zumeRequest.delete('host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id } )
                .catch((error) => {
                    changeHost(key, false)

                    onFail()
                })

        }
    }

    return {
        toggleHost,
    }
}