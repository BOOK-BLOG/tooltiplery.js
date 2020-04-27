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
    init: function () {
        var temp = document.createElement("style");
        temp.innerHTML = ".tooltiplery{border-radius:8px;overflow-y:scroll}.tooltiplery,.tooltiplery *{scrollbar-width:none}.tooltiplery ::-webkit-scrollbar,.tooltiplery::-webkit-scrollbar{display:none}.tooltiplery{background-color:#fff;color:#000;box-shadow:0 8px 32px #80808080}@media (prefers-color-scheme:dark){.tooltiplery{background-color:#202020;color:#e0e0e0;box-shadow:0 8px 32px #00000040}}";
        document.getElementsByTagName("body")[0].appendChild(temp);
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
            var bodyTemp = document.getElementsByTagName("body")[0];
            var temp = document.getElementsByClassName("tooltiplery");
            var idTemp = 0;
            for (let i = 0; i < temp.length; i++) {
                if (parseInt(temp[i].getAttribute("id").slice(11)) > idTemp) {
                    idTemp = parseInt(temp[i].getAttribute("id").slice(11));
                }
            };
            idTemp++;
            params.tooltip.setAttribute("id", ("tooltiplery" + String(idTemp)))
            // bodyTemp.appendChild(params.tooltip);
            var appendTemp = bodyTemp.appendChild(params.tooltip);
            appendTemp.onload = appendTemp.onreadystatechange = function () {
                switch (params.animation) {
                    case "fadeIn":
                        params.tooltip.style.transition = "all 0.25s";
                        params.tooltip.style.opacity = "1";
                        break;
                    default:
                        console.error("Uncaught ReferenceError: " + params.animation + " is not a supported animation.")
                        break;
                }
            }
            return ("tooltiplery" + String(idTemp));
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
            var delay = 0;
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
            switch (params.animation) {
                case "fadeOut":
                    temp.style.transition = "all 0.25s";
                    temp.style.opacity = "0";
                    delay = 250;
                    break;
                default:
                    console.error("Uncaught ReferenceError: " + params.animation + " is not a supported animation.")
                    break;
            }
            setTimeout(function () {
                temp.parentNode.removeChild(temp);
                // temp.style.transition = "";
                // temp.style.opacity = "0";
            }, delay)
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
         *     element: document.getElementById("myButton"), // HTML elemant, the tooltip will popup when you hover on or click this element.
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
            switch (params.type) {
                case "hover":
                    params.element.onmouseover = function () {
                        temp = tooltiplery.action.showTooltip({
                            tooltip: params.tooltip,
                            animation: params.appear,
                        });
                    };
                    params.element.onmouseleave = function () {
                        params.tooltip.onmouseleave = function () {
                            tooltiplery.action.hideTooltip({
                                type: "HTMLElement",
                                element: params.tooltip,
                                animation: params.disappear,
                            })
                        }
                    };
                    break;
                default:
                    break;
            };
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
         *     child: imageCapView({...}), // tooltiplery tooltip elements or any HTML element.
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
            if (params.position) { temp.style.position = params.position };
            if (params.top) { temp.style.top = params.top };
            if (params.left) { temp.style.left = params.left };
            temp.appendChild(params.child);
            temp.classList.add("tooltiplery");
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.imageCapView({
         *     header: [HTMLElement],
         *     content: [HTMLElement],
         * })
         * ```
         * tooltiplery **imageCapView** builder.
         * @param {HTMLElement} params.header image cap element.
         * @param {HTMLElement} params.content content element.
         * @returns {HTMLDivElement} tooltiplery **imageCapView** element.
         */
        imageCapView: function (params) {
            var temp = document.createElement("div");
            temp.style.width = "100%";
            if (params.header) { temp.appendChild(params.header) };
            if (params.content) { temp.appendChild(params.content) };
            if (params.footer) { temp.appendChild(params.footer) };
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.img({
         *     url: [imageUrl],
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
            if (params.fit) { temp.style.objectFit = params.fit };
            if (params.width) { temp.style.width = params.width } else { temp.style.width = "100%" };
            if (params.height) { temp.style.height = params.height };
            if (params.borderRadius) { temp.style.borderRadius = params.borderRadius };
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.paragraphBlock({
         *     children: [
         *         [HTMLElement],
         *         // or: 
         *         tooltiplery.element.textHeader[1]({
         *             text: "Heading 1",
         *         }),
         *         tooltiplery.element.paragraph({
         *             text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         *         }),
         *         ...
         *     ], // Muitiple children by an array.
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
            if (params.padding) { temp.style.padding = params.padding } else { temp.style.padding = "0 16px" };
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.textHeader[headingLevel]({ // headingLevel is a number, the level of heading.
         *     text: "Lorem ipsum", // A string, the heading text.
         * })
         * ```
         * @param {String} params.text the inner text in the heading element.
         * @returns {HTMLHeadingElement} HTML **heading** element.
         */
        textHeader: [
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
            if (params.padding) { temp.style.padding = params.padding } else { temp.style.padding = "0 16px" };
            return temp;
        },
    },
};

module.exports = tooltiplery;