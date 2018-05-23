var Maps = (function () {
    var canvasElement = null;
    return {
        Create: function (canvasElementOrElementId) {
            switch (typeof(canvasElementOrElementId)) {
                case 'string':
                if (document.querySelector(canvasElementOrElementId) !== null) {
                    canvasElement = document.querySelector(canvasElementOrElementId);
                    return true;
                } else {
                    throw new Error("[heavylabs Maps]: Invalid ID string or element does'nt exists.");
                }
                break;
                case 'object':
                if (typeof(canvasElementOrElementId.getContext) === 'function') {
                    canvasElement = canvasElementOrElementId;
                    return true;
                } else {
                    throw new Error("[heavylabs Maps]: Invalid Canvas element.");
                }
                break;
                default:
                throw new Error('[heav')
            }
        }
    };
})();