// $(".demo").hover(function () {
// tooltiplery.action.showTooltip({
//     tooltip: tooltiplery.element.tooltip({
//         position: "fixed",
//         top: (String($(this).offset().top + $(this).height()) + "px"),
//         left: (String($(this).offset().left + $(this).width()) + "px"),
//         child: tooltiplery.element.imageCapView({
//             header: tooltiplery.element.img({
//                 url: "https://www.bing.com/th?id=OHR.BluebellWood_ZH-CN8128422960_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=HpEdgeAn",
//                 fit: "cover",
//                 height: "256px",
//             }),
//             content: tooltiplery.element.paragraphBlock({
//                 children: [
//                     tooltiplery.element.textHeader[1]({
//                         text: "Demo Text",
//                     }),
//                     tooltiplery.element.paragraph({
//                         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//                     }),
//                 ],
//             })
//         }),
//     }),
// })
// }, function () {
//     $(".tooltiplery").hover(function () { }, function () {
//         $(".tooltiplery").remove()
//     })
// })

tooltiplery.controller.tooltipController({
    type: "hover",
    element: $(".demo")[0],
    tooltip: tooltiplery.element.tooltip({
        position: "fixed",
        top: (String($(".demo").offset().top + $(".demo").height()) + "px"),
        left: (String($(".demo").offset().left + $(".demo").width()) + "px"),
        child: tooltiplery.element.imageCapView({
            header: tooltiplery.element.img({
                url: "https://www.bing.com/th?id=OHR.BluebellWood_ZH-CN8128422960_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=HpEdgeAn",
                fit: "cover",
                height: "256px",
            }),
            content: tooltiplery.element.paragraphBlock({
                children: [
                    tooltiplery.element.textHeader[1]({
                        text: "Demo Text",
                    }),
                    tooltiplery.element.paragraph({
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    }),
                ],
            })
        }),
    }),
})