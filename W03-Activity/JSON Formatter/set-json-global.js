"use strict";
(() => {
    (() => {
        let r = document.getElementById("jsonFormatterRaw")?.querySelector("pre");
        r && setTimeout(() => {
            try {
                let e = JSON.parse(r.innerText);
                Object.defineProperty(window, "json", {
                    value: e,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }),
                    console.log('JSON Formatter: Type "json" to inspect')
            } catch (e) {
                console.error("JSON Formatter: Failed to expose JSON global", e)
            }
        }
            , 120)
    }
    )();
}
)();
