export const onInputChange = (inputReference, labelNameOfInput, state) => {
    const validity = inputReference.validity;
    state.validityValid = validity.valid;

    const labelNameOfInputUppercase = `${labelNameOfInput.charAt(0).toUpperCase() + labelNameOfInput.slice(1)}`;
    const statePropertyErrorMessage = `${labelNameOfInput}ErrorMessage`;

    if (!validity.valid) {
        if (validity.tooShort) {
            state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} too short`;
        } else if (validity.tooLong) {
            state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} too long`;
        } else if (validity.patternMismatch) {
            state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} should be alphanumeric`;
        }
    } else {
        state[statePropertyErrorMessage] = null;
    }
};
