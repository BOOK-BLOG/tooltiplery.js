/**
 * tooltiplery **main object**, includes **action functions** and **element builders**.
 */
var tooltiplery = {
    /**
     * ```javascript
     * tooltiplery.init(); // We will append an HTML style element to HTML body element.
     * ```
     * Initialize tooltiplery.js
     */
    initialization: {
        /**
         * ```javascript
         * tooltiplery.init.appendStyleSheet()
         * ```
         * Append a style element that contains main style of tooltiplery.
         * @returns {String} tooltiplery tooltip **element id**.
         */
        appendStyleSheet: function () {
            var temp = document.createElement("style");
            temp.innerHTML = ".tooltiplery{border-radius:8px;overflow-y:scroll}.tooltiplery,.tooltiplery *{scrollbar-width:none}.tooltiplery ::-webkit-scrollbar,.tooltiplery::-webkit-scrollbar{display:none}.tooltiplery{background-color:#fff;color:#000;box-shadow:0 8px 32px #80808080}@media (prefers-color-scheme:dark){.tooltiplery{background-color:#202020;color:#e0e0e0;box-shadow:0 8px 32px #00000040}}";
            document.body.appendChild(temp);
        },
    },
    /**
     * tooltiplery tooltip **actions**, use this to **show** and **hide** tooltips.
     */
    action: {
        /**
         * ```javascript
         * tooltiplery.action.showTooltip({
         *     tooltip: tooltiplery.element.tooltip({...})
         * })
         * ```
         * Popup a tooltiplery tooltip.
         * @param {HTMLDivElement} params.tooltip a **HTML div element** created by `tooltiplery.element.tooltip` or **your own HTML element**.
         * @returns {String} tooltiplery tooltip **element id**.
         */
        showTooltip: function (params) {
            var bodyTemp = document.body;

            // set the id for the new tooltip
            var temp = document.getElementsByClassName("tooltiplery");
            var idTemp = 0;
            for (var i = 0; i < temp.length; i++) {
                if (parseInt(temp[i].getAttribute("id").slice(11)) > idTemp) {
                    idTemp = parseInt(temp[i].getAttribute("id").slice(11));
                }
            }
            idTemp++;

            params.tooltip.setAttribute("id", ("tooltiplery" + String(idTemp)));
            bodyTemp.appendChild(params.tooltip);

            function callback() {
                return ("tooltiplery" + String(idTemp));
            }

            if (params.animation) {
                params.animation.animation(params.animation, callback);
            } else { callback(); }
        },
        /**
         * ```javascript
         * tooltiplery.action.hideTooltip({
         *     type: "id",
         *     id: "tooltiplery1",
         *     // or:
         *     type: "HTMLElement",
         *     element: myTooltip,
         * })
         * ```
         * Delete a tooltiplery tooltip.
         * @param {String} params.type the parameters's type.
         * @param {String} params.id if type is "id", give the tooltip's id.
         * @param {HTMLElement} params.element if type is "HTMLElement", give the HTML element.
         * @returns {undefined} no returns.
         */
        hideTooltip: function (params) {
            var temp;
            switch (params.type) {
                case "id":
                    temp = document.getElementById(params.id);
                    break;
                case "HTMLElement":
                    temp = params.element;
                    break;
                default:
                    break;
            }

            function callback() {
                temp.parentNode.removeChild(temp);
            }

            if (params.animation) {
                params.animation.animation(params.animation, callback);
            } else { callback(); }
        },
    },
    /**
     * tooltiplery element controllers.
     */
    controller: {
        /**
         * ```javascript
         * tooltiplery.controller.tooltipController({
         *     type: "hover", // A string, the way you call the tooltip out.
         *     element: document.getElementById("myButton"), // HTML element, the tooltip will popup when you hover on or click this element.
         *     tooltip: tooltiplery.element.tooltip({...}), // tooltiplery tooltip or your own HTML element.
         * })
         * ```
         * Initialize a tooltiplery tooltip and bind the event to the tooltip and your button (or any other HTML element).
         * @param {String} params.type the way you call the tooltip out.
         * @param {HTMLElement} params.element bind the event to this element.
         * @param {HTMLElement} params.tooltip the tooltip to show.
         * @returns {String} the tooltip element's id attribute.
         */
        tooltipController: function (params) {
            var temp;
            var aniTemp = params.animation;
            var aniTempAppear;
            var aniTempDisappear;
            if (aniTemp) {
                aniTempAppear = {
                    animation: aniTemp.appear.animation,
                    duration: aniTemp.appear.duration,
                    element: params.tooltip,
                };
                aniTempDisappear = {
                    animation: aniTemp.disappear.animation,
                    duration: aniTemp.disappear.duration,
                    element: params.tooltip,
                };
            }
            switch (params.type) {
                case "hover":
                    params.element.onmouseover = function () {
                        temp = tooltiplery.action.showTooltip({
                            tooltip: params.tooltip,
                            animation: aniTempAppear,
                        });
                    };
                    params.element.onmouseleave = function () {
                        params.tooltip.onmouseleave = function () {
                            tooltiplery.action.hideTooltip({
                                type: "HTMLElement",
                                element: params.tooltip,
                                animation: aniTempDisappear,
                            });
                        };
                    };
                    break;
                default:
                    break;
            }
            return temp;
        },
    },
    /**
     * tooltiplery element builders.
     */
    element: {
        /**
         * ```javascript
         * tooltiplery.element.tooltip({
         *     child: imageCapView({...}), // tooltiplery elements or any HTML element.
         *     position: "fixed", // A string, CSS position property.
         *     left: (String($(this).offset().left + $(this).width()) + "px"), // A string, CSS left property.
         *     top: (String($(this).offset().top + $(this).height()) + "px"), // A string, CSS top property.
         * })
         * ```
         * tooltiplery **tooltip** builder.
         * @param {HTMLElement} params.child __child element__ of tooltiplery tooltip.
         * @param {String} params.position tooltip element's position property.
         * @param {String} params.left tooltip element's left property.
         * @param {String} params.top tooltip element's top property.
         * @returns {HTMLDivElement} tooltiplery **tooltip element**.
         */
        tooltip: function (params) {
            var temp = document.createElement("div");
            if (params.width) { temp.style.width = params.width; } else { temp.style.width = "350px"; }
            if (params.height) { temp.style.height = params.height; } else { temp.style.height = "500px"; }
            if (params.position) { temp.style.position = params.position; }
            if (params.top) { temp.style.top = params.top; }
            if (params.left) { temp.style.left = params.left; }
            temp.appendChild(params.child);
            temp.classList.add("tooltiplery");
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.imageCapView({
         *     header: [HTMLElement],
         *     content: [HTMLElement],
         *     footer: [HTMLElement],
         * })
         * ```
         * tooltiplery **imageCapView** builder.
         * @param {HTMLElement} params.header image cap element.
         * @param {HTMLElement} params.content content element.
         * @param {HTMLElement} params.footer footer element.
         * @returns {HTMLDivElement} tooltiplery **imageCapView** element.
         */
        imageCapView: function (params) {
            var temp = document.createElement("div");
            temp.style.width = "100%";
            if (params.header) { temp.appendChild(params.header); }
            if (params.content) { temp.appendChild(params.content); }
            if (params.footer) { temp.appendChild(params.footer); }
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.img({
         *     url: [imageUrl], // A string, the URL of the image.
         *     fit: "cover", // A string, CSS object-fit property.
         *     width: "75%", // A string, default is "100%", CSS width property.
         *     height: "128px", // A string, CSS height property
         *     borderRadius: "16px 16px 0 0", // A string, CSS border-radius property.
         * })
         * ```
         * HTML **img** element builder
         * @param {String} params.url image URL.
         * @param {String} params.fit img elements's object-fit property.
         * @param {String} params.width img elements's width property.
         * @param {String} params.height img elements's height property.
         * @param {String} params.borderRadius img elements's border-radius property.
         * @returns {HTMLImageElement} HTML **img** element
         */
        img: function (params) {
            var temp = document.createElement("img");
            temp.setAttribute("src", params.url);
            if (params.fit) { temp.style.objectFit = params.fit; }
            if (params.width) { temp.style.width = params.width; } else { temp.style.width = "100%"; }
            if (params.height) { temp.style.height = params.height; }
            if (params.borderRadius) { temp.style.borderRadius = params.borderRadius; }
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.paragraphBlock({
         *     children: [
         *         [HTMLElement],
         *         // or:
         *         tooltiplery.element.textHeading[1]({
         *             text: "Heading 1",
         *         }),
         *         tooltiplery.element.paragraph({
         *             text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         *         }),
         *         ...
         *     ], // Muitiple children in an array.
         *     padding: "16px", // A string, CSS padding property.
         * })
         * ```
         * tooltiplery **paragraphBlock** builder
         * @param {Array} params.children __children elements__ of tooltiplery paragraphBlock element.
         * @param {String} params.padding tooltiplery paragraphBlock element's padding property.
         * @returns {HTMLDivElement} tooltiplery **paragraphBlock** element
         */
        paragraphBlock: function (params) {
            var temp = document.createElement("div");
            for (var i = 0; i < params.children.length; i++) {
                temp.appendChild(params.children[i]);
            }
            if (params.padding) { temp.style.padding = params.padding; } else { temp.style.padding = "0 16px"; }
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.textHeading[headingLevel]({ // headingLevel is a number, the level of heading.
         *     text: "Lorem ipsum", // A string, the heading text.
         * })
         * ```
         * @param {String} params.text the inner text in the heading element.
         * @returns {HTMLHeadingElement} HTML **heading** element.
         */
        textHeading: [
            undefined,
            function (params) {
                var temp = document.createElement("h1");
                temp.innerHTML = params.text;
                return temp;
            },
            function (params) {
                var temp = document.createElement("h2");
                temp.innerHTML = params.text;
                return temp;
            },
            function (params) {
                var temp = document.createElement("h3");
                temp.innerHTML = params.text;
                return temp;
            },
            function (params) {
                var temp = document.createElement("h4");
                temp.innerHTML = params.text;
                return temp;
            },
            function (params) {
                var temp = document.createElement("h5");
                temp.innerHTML = params.text;
                return temp;
            },
            function (params) {
                var temp = document.createElement("h6");
                temp.innerHTML = params.text;
                return temp;
            },
        ],
        /**
         * ```javascript
         * tooltiplery.element.paragraph({
         *     text: "Lorem ipsum", // A string, the paragraph text.
         * })
         * ```
         * @param {String} params.text the inner text in the paragraph element.
         * @returns {HTMLParagraphElement} HTML **paragraph** element.
         */
        paragraph: function (params) {
            var temp = document.createElement("p");
            temp.innerHTML = params.text;
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.markdownBlock({
         *     markdown: "# *Lorem* `ipsum`\n======", // A string, the markdown source text.
         *     padding: "16px", // A string, CSS padding property.
         * })
         * ```
         * @param {String} params.markdown the markdown source text for the markdown block.
         * @param {String} params.padding tooltiplery paragraphBlock element's padding property.
         * @returns {HTMLDivElement} HTML **div** element.
         */
        markdownBlock: function (params) {
            var temp = document.createElement("div");
            temp.innerHTML = marked(params.markdown);
            if (params.padding) { temp.style.padding = params.padding; } else { temp.style.padding = "0 16px"; }
            return temp;
        },
    },
    /**
     * tooltiplery animations.
     */
    animation: {
        /**
         * ```javascript
         * tooltiplery.animation.fadeIn({
         *     element: [HTMLElement], // The target element of this animation.
         *     duration: 250, // The duration of the animation, the unit is milliseconds.
         * }, function () { // The callback function, run after finishing the animation.
         *     console.log("the animation is finished");
         * })
         * ```
         * tooltiplery **fadeIn** animation
         * @param {Array} params.element the target element of this animation.
         * @param {String} params.duration the duration of the animation, the unit is milliseconds.
         * @param {String} callback the callback function, run after finishing the animation.
         * @returns {undefined} no returns.
         */
        fadeIn: function (params, callback) {
            if (!params.duration) { params.duration = 500; }
            var start;
            var progress;
            function ani(timeStamp) {
                if (!start) { start = timeStamp; }
                progress = timeStamp - start;
                if (progress < params.duration) {
                    params.element.style.opacity = progress / params.duration;
                    window.requestAnimationFrame(ani);
                } else {
                    window.cancelAnimationFrame(ani);
                    params.element.style.opacity = "";
                    if (callback) {
                        callback();
                    }
                }
            }
            window.requestAnimationFrame(ani);
        },
        /**
         * ```javascript
         * tooltiplery.animation.fadeOut({
         *     element: [HTMLElement], // The target element of this animation.
         *     duration: 250, // The duration of the animation, the unit is milliseconds.
         * }, function () { // The callback function, run after finishing the animation.
         *     console.log("the animation is finished");
         * })
         * ```
         * tooltiplery **fadeOut** animation
         * @param {Array} params.element the target element of this animation.
         * @param {String} params.duration the duration of the animation, the unit is milliseconds.
         * @param {String} callback the callback function, run after finishing the animation.
         * @returns {undefined} no returns.
         */
        fadeOut: function (params, callback) {
            if (!params.duration) { params.duration = 500; }
            var start;
            var progress;
            function ani(timeStamp) {
                if (!start) { start = timeStamp; }
                progress = timeStamp - start;
                if (progress < params.duration) {
                    params.element.style.opacity = 1 - progress / params.duration;
                    window.requestAnimationFrame(ani);
                } else {
                    window.cancelAnimationFrame(ani);
                    params.element.style.opacity = "";
                    if (callback) {
                        callback();
                    }
                }
            }
            window.requestAnimationFrame(ani);
        },
    },
};

if (typeof(module) != "undefined") {
    module.exports = tooltiplery;
}
