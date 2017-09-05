function keymapper(event) {
    let keycode = event.keyCode || event.which;
    return {
        isCtrlShiftL: (keycode === 76 || keycode === 108) && event.ctrlKey && event.shiftKey,
        isEscape: keycode === 27
    };
}
module.exports = keymapper;