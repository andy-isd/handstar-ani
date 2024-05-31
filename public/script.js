
function prn(o) {
    if (window.console && window.console.log) window.console.log(o);
}
function getViewPort() {
    var e = window,
        a = 'inner';if (!('innerWidth' in window)) {
        a = 'client';e = document.document || document.body;
    }return { w: e[a + 'Width'], h: e[a + 'Height'] };
}
var BgSeq = function BgSeq(p) {

    var self = this;

    self.$ = {};
    self.screenw = 0;
    self.screenh = 0;
    self.screenk = 0;

    self.events = function () {
        // $(window).resize(self.onResize);
        self.onResize();
    };

    self.onResize = function (screenSize) {
        self.screenw = window.innerWidth;
        self.screenh = window.innerHeight;
        self.screenk = self.screenw / self.screenh;
    };

    self.item_on_frame = function(data) {
        if(data.el.getAttribute('pause') == "1") return;
        data.direction = (data.el.getAttribute('reverse') == "1") ? -1 : 1;
        data.frame += data.direction;
        if(data.frame > data.max) {
            if(data.el.getAttribute('playonce') == '1') {
                data.el.setAttribute('pause', '1');
                return;
            }
            data.frame = 0;
        }
        if(data.frame < 0) {
            if(data.el.getAttribute('playonce') == '1') {
                data.el.setAttribute('pause', '1');
                return;
            }
            data.frame = data.max;
        }
        var path = data.path.replace(data.replacement, String(data.frame).padStart(data.pad, '0'));
        data.el.style.backgroundImage = "url(" + path + ")";
    };

    self.items = 0;
    self.init_item = function(el, i) {
        self.items++;
        var max = el.getAttribute("data-bgseq-max");
        var path = el.getAttribute("data-bgseq");
        var data = {
            id: self.items,
            el: el,
            replacement: "{" + "".padStart(max.toString().length, "X") + "}",
            path: path,
            pad: max.length,
            min: 0,
            max: max,
            frame: 0,
            direction: 1,
            preload: [],
            preloaded: 0
        }
        console.log(data.replacement)
        for(var i = data.min; i <= data.max; i++) {
            data.preload[i] = new Image();
            data.preload[i].onload = function() {
                data.preloaded++;
                if(data.preloaded >= data.preload.length) {
                    console.log("start animate " + data.id)
                    setInterval(self.item_on_frame, 1000/25, data);
                }
                else {
                    //console.log("preloaded " + data.preloaded)
                }
            };
            data.preload[i].src = path.replace(data.replacement, String(i).padStart(data.pad, '0'));
        }
        return data.id;
    };

    self.init = function(p) {
        self.events();
        window.addEventListener('load', function (e) {
            var els = document.querySelectorAll("[data-bgseq]").forEach(function(el){
                self.init_item(el);
            });
        })
    };

    self.init(p);

};

var App = function App() {

    var self = this;

    self.$ = {};

    self.events = function () {
        self.onResize();
    };

    (function init() {
        self.events();
    })();

};

window.bgseq = new BgSeq();
//window.app = new App();
