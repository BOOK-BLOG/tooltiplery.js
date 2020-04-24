/**
 * tooltiplery **main object**, includes **action functions** and **element builders**.
 */
var tooltiplery = {
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
         * @param {HTMLDivElement} parameters.tooltip a **HTML div element** created by `tooltiplery.element.tooltip` or **your own HTML element**.
         * @returns {String} tooltiplery tooltip **element id**.
         */
        showTooltip: function (parameters) {
            var bodyTemp = document.getElementsByTagName("body")[0];
            var temp = document.getElementsByClassName("tooltiplery");
            var idTemp = 0;
            for (let i = 0; i < temp.length; i++) {
                if (parseInt(temp[i].getAttribute("id").slice(11)) > idTemp) {
                    idTemp = parseInt(temp[i].getAttribute("id").slice(11));
                }
            };
            idTemp++;
            parameters.tooltip.setAttribute("id", ("tooltiplery" + String(idTemp)))
            bodyTemp.appendChild(parameters.tooltip);
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
         * @param {String} parameters.type the parameters's type.
         * @param {String} parameters.id if type is "id", give the tooltip's id.
         * @param {HTMLElement} parameters.element if type is "HTMLElement", give the HTML element.
         * @returns {undefined} no returns.
         */
        hideTooltip: function (parameters) {
            switch (parameters.type) {
                case "id":
                    var temp = document.getElementById(parameters.id);
                    temp.parentNode.removeChild(temp);
                    break;
                case "HTMLElement":
                    parameters.element.parentNode.removeChild(parameters.element);
                    break;
                default:
                    break;
            }
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
         * @param {String} parameters.type the way you call the tooltip out.
         * @param {HTMLElement} parameters.element bind the event to this element.
         * @param {HTMLElement} parameters.tooltip the tooltip to show.
         * @returns {undefined} no returns.
         */
        tooltipController: function (parameters) {
            switch (parameters.type) {
                case "hover":
                    parameters.element.onmouseover = function () {
                        tooltiplery.action.showTooltip({
                            tooltip: parameters.tooltip,
                        });
                    };
                    parameters.element.onmouseleave = function () {
                        parameters.tooltip.onmouseleave = function () { parameters.tooltip.parentNode.removeChild(parameters.tooltip) }
                    };
                    break;
                default:
                    break;
            }
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
         * @param {HTMLElement} parameters.child __child element__ of tooltiplery tooltip.
         * @param {String} parameters.position tooltip element's position property.
         * @param {String} parameters.left tooltip element's left property.
         * @param {String} parameters.top tooltip element's top property.
         * @returns {HTMLDivElement} tooltiplery **tooltip element**.
         */
        tooltip: function (parameters) {
            var temp = document.createElement("div");
            if (parameters.width) { temp.style.width = parameters.width; } else { temp.style.width = "350px"; }
            if (parameters.height) { temp.style.height = parameters.height; } else { temp.style.height = "500px"; }
            if (parameters.position) { temp.style.position = parameters.position };
            if (parameters.top) { temp.style.top = parameters.top };
            if (parameters.left) { temp.style.left = parameters.left };
            temp.appendChild(parameters.child);
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
         * @param {HTMLElement} parameters.header image cap element.
         * @param {HTMLElement} parameters.content content element.
         * @returns {HTMLDivElement} tooltiplery **imageCapView** element.
         */
        imageCapView: function (parameters) {
            var temp = document.createElement("div");
            temp.style.width = "100%";
            if (parameters.header) { temp.appendChild(parameters.header) };
            if (parameters.content) { temp.appendChild(parameters.content) };
            if (parameters.footer) { temp.appendChild(parameters.footer) };
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
         * @param {String} parameters.url image URL.
         * @param {String} parameters.fit img elements's object-fit property.
         * @param {String} parameters.width img elements's width property.
         * @param {String} parameters.height img elements's height property.
         * @param {String} parameters.borderRadius img elements's border-radius property.
         * @returns {HTMLImageElement} HTML **img** element
         */
        img: function (parameters) {
            var temp = document.createElement("img");
            temp.setAttribute("src", parameters.url);
            if (parameters.fit) { temp.style.objectFit = parameters.fit };
            if (parameters.width) { temp.style.width = parameters.width } else { temp.style.width = "100%" };
            if (parameters.height) { temp.style.height = parameters.height };
            if (parameters.borderRadius) { temp.style.borderRadius = parameters.borderRadius };
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
         * @param {Array} parameters.children __children elements__ of tooltiplery paragraphBlock element.
         * @param {String} parameters.padding tooltiplery paragraphBlock element's padding property.
         * @returns {HTMLDivElement} tooltiplery **paragraphBlock** element
         */
        paragraphBlock: function (parameters) {
            var temp = document.createElement("div");
            for (var i = 0; i < parameters.children.length; i++) {
                temp.appendChild(parameters.children[i]);
            }
            if (parameters.padding) { temp.style.padding = parameters.padding } else { temp.style.padding = "0 16px" };
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.textHeader[headingLevel]({ // headingLevel is a number, the level of heading.
         *     text: "Lorem ipsum", // A string, the heading text.
         * })
         * ```
         * @param {String} parameters.text the inner text in the heading element.
         * @returns {HTMLHeadingElement} HTML **heading** element.
         */
        textHeader: [
            undefined,
            function (parameters) {
                var temp = document.createElement("h1");
                temp.innerHTML = parameters.text;
                return temp;
            },
            function (parameters) {
                var temp = document.createElement("h2");
                temp.innerHTML = parameters.text;
                return temp;
            },
            function (parameters) {
                var temp = document.createElement("h3");
                temp.innerHTML = parameters.text;
                return temp;
            },
            function (parameters) {
                var temp = document.createElement("h4");
                temp.innerHTML = parameters.text;
                return temp;
            },
            function (parameters) {
                var temp = document.createElement("h5");
                temp.innerHTML = parameters.text;
                return temp;
            },
            function (parameters) {
                var temp = document.createElement("h6");
                temp.innerHTML = parameters.text;
                return temp;
            },
        ],
        /**
         * ```javascript
         * tooltiplery.element.paragraph({
         *     text: "Lorem ipsum", // A string, the paragraph text.
         * })
         * ```
         * @param {String} parameters.text the inner text in the paragraph element.
         * @returns {HTMLParagraphElement} HTML **paragraph** element.
         */
        paragraph: function (parameters) {
            var temp = document.createElement("p");
            temp.innerHTML = parameters.text;
            return temp;
        },
        /**
         * ```javascript
         * tooltiplery.element.markdownBlock({
         *     markdown: "# *Lorem* `ipsum`\n======", // A string, the markdown source text.
         *     padding: "16px", // A string, CSS padding property.
         * })
         * ```
         * @param {String} parameters.markdown the markdown source text for the markdown block.
         * @param {String} parameters.padding tooltiplery paragraphBlock element's padding property.
         * @returns {HTMLDivElement} HTML **div** element.
         */
        markdownBlock: function (parameters) {
            var temp = document.createElement("div");
            temp.innerHTML = marked(parameters.markdown);
            if (parameters.padding) { temp.style.padding = parameters.padding } else { temp.style.padding = "0 16px" };
            return temp;
        }
    },
};