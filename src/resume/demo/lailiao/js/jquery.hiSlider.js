// 顶部轮播图
;(function($){
    function Slider($container, options){
        this.$container = $container;
        this.options = $.extend({
            //开始索引 0开始
            startSlide: 0,
            //子元素选择器
            item: '.hiSlider-item',
            //是否全屏
            isFullScreen: false,
            //是否自适应
            isFlexible: false,
            //是否支持触摸 html5 transform:
            isSupportTouch: '__proto__' in {},
            //是否显示分页按钮
            isShowPage: true,
            //是否显示标题栏
            isShowTitle: true,
            //标题文本存放的属性 或者回调函数(需要返回值)
            titleAttr: 'data-title',
            //是否显示左右控制按钮
            isShowControls: true,
            //是否自动播放
            isAuto: true,
            //自动播放间隔时间
            intervalTime: 5000,
            //特效时间 
            affectTime: 300,
            //特效类型 string : fade || move
            mode: 'move',
            //方向 string: left || top
            direction: 'left',
            //开始滑动回调
            onSwipeStart: $.noop,
            //滑动中回调
            onSwipeMove: $.noop,
            //正常滑动的最小值
            minSwipeLength: 30,
            //滑动取消回调 和 minSwipeLength值有关
            onSwipeCancel: $.noop,
            //触摸结束回调 (正常触摸)
            onSwipeEnd: $.noop,
            //向左滑动回调
            onSwipeLeft: $.noop,
            //向右滑动回调
            onSwipeRight: $.noop,
            //向上滑动回调
            onSwipeTop: $.noop,
            //向下滑动回调
            onSwipeBottom: $.noop,
            //初始化后回调
            onInited:  $.noop,
            //运动前回调
            onMoveBefore: $.noop,
            //运动后回调
            onMoveAfter: $.noop,
            //分页选中回调
            onSelected: $.noop
        }, options);
        this.init();
    }

    Slider.prototype = {
        init: function(){
            this.$item    = this.$container.find(this.options.item);
            this.size     = this.$item.size();
            this.curIndex = this.options.startSlide;
            this.setLayout();
            this.playTimer = null;
            this.options.isAuto && this.autoPlay();
            this.options.isFlexible && $(window).on('resize.hiSlider', $.proxy(this, 'resize'));
            this.options.isSupportTouch && this.touch();
        },
        touch: function(){
            var self  = this;
            var touch = {};
            var opt   = this.options;
            var min   = opt.minSwipeLength;
            this.$container.on('touchstart', function(e){
                var touches = e.originalEvent.touches[0];
                touch.x1 = touches.pageX;
                touch.y1 = touches.pageY;
                opt.onSwipeStart.call(this, touch);
            }).on('touchmove', function(e){
                var touches = e.originalEvent.touches[0];
                touch.x2 = touches.pageX;
                touch.y2 = touches.pageY;
                opt.onSwipeMove.call(this, touch);
            }).on('touchend', function(e){
                if((touch.x2 && Math.abs(touch.x1 - touch.x2) > min) ||
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > min)){
                    var dir = self.swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
                    opt['onSwipe'+dir].call(this, touch);
                    self.moveTo(dir);
                    opt.onSwipeEnd.call(this, touch);
                }else{
                    opt.onSwipeCancel.call(this, touch);
                }
                touch = {};
            });
        },
        moveTo: function(dir){
            var self      = this;
            var direction = self.options.direction;
            if(direction == 'top'){
                if(dir == 'Bottom'){
                    self[self.options.mode+'Prev']();
                }else if(dir == 'Top'){
                    self[self.options.mode]();
                }
            }else if(direction == 'left'){
                if(dir == 'Right'){
                    self[self.options.mode+'Prev']();
                }else if(dir == 'Left'){
                    self[self.options.mode]();
                }
            }
        },
        swipeDirection: function (x1, x2, y1, y2){
            var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
            return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Top' : 'Bottom')
        },
        move: function(){
            var self = this, cidx;
            self.options.isAuto && self.autoPlay();
            if(++self.curIndex == self.size){
                self.curIndex = 0;
                self.$container.css(self.getMove());
                self.curIndex++;
            }
            self.setTitle();
            self.setPages();
            cidx = self.curIndex == self.size - 1 ? 0 : self.curIndex;
            self.options.onMoveBefore.call(self.$container, self.$item, cidx);
            self.$container.stop(false, true).animate(self.getMove(), self.options.affectTime, function(){
                self.options.onMoveAfter.call(this, self.$item, cidx)
            });
        },
        movePrev: function(flag){
            var self = this;
            if(flag != true){
                if(self.options.mode == 'move'){
                    if(self.curIndex == 0){
                        self.curIndex = (self.size - 1);
                        self.$container.css(self.getMove());
                    }
                }else{
                    (self.curIndex == 0) && (self.curIndex = self.size);
                }
                self.curIndex--;
            }
            self.options.isAuto && self.autoPlay();
            self.setTitle();
            self.setPages();
            self.options.onMoveBefore.call(self.$container, self.$item, self.curIndex);
            self.$container.stop(false, true).animate(self.getMove(), self.options.affectTime, function(){
                self.options.onMoveAfter.call(this, self.$item, self.curIndex)
            });
        },
        getMove: function(flag){
            var move = {};
            var size = this.getSize();
            var dir  = this.options.direction;
            if(dir == 'top'){
                move.top  = -this.curIndex*size.height;
                flag && (move.width = size.width);
            }else{
                move.left = -this.curIndex*size.width;
                flag && (move.height = size.height);
            }
            return move;
        },
        fade: function(){
            var self = this;
            self.options.isAuto && self.autoPlay();
            self.curIndex++;
            (self.curIndex > self.size - 1) && (self.curIndex = 0);
            self.setTitle();
            self.setPages();
            self.options.onMoveBefore.call(self.$container, self.$item, self.curIndex);
            self.$item.fadeOut(self.options.affectTime)
            .eq(self.curIndex).fadeIn(self.options.affectTime, function(){
                self.options.onMoveAfter.call(this, self.$item, self.curIndex)
            });
        },
        fadePrev: function(flag){
            var self = this;
            if(flag != true){
                if(self.options.mode == 'move'){
                    if(self.curIndex == 0){
                        self.curIndex = (self.size - 1);
                        self.$container.css(self.getMove());
                    }
                }else{
                    if(self.curIndex == 0){
                        self.curIndex = self.size;
                    }
                }
                self.curIndex--;
            }
            self.options.isAuto && self.autoPlay();
            self.setTitle();
            self.setPages();
            self.options.onMoveBefore.call(self.$container, self.$item, self.curIndex);
            self.$item.fadeOut(self.options.affectTime)
            .eq(self.curIndex).fadeIn(self.options.affectTime, function(){
                self.options.onMoveAfter.call(this, self.$item, self.curIndex)
            });
        },
        setPages: function(){
            if(!this.options.isShowPage || !this.$pages)return;
            var idx = this.curIndex;
            (idx == this.size - 1 && this.options.mode == 'move')  && (idx = 0);
            $('a', this.$pages).eq(idx).addClass('active').siblings().removeClass('active');
        },
        setTitle: function(){
            if(!this.options.isShowTitle || !this.$title)return;
            var $curItem = this.$item.eq(this.curIndex);
            this.$title.html($.isFunction(this.options.titleAttr) ? this.options.titleAttr.call($curItem, this.curIndex) : $curItem.attr(this.options.titleAttr) );
        },
        setLayout: function(){
            var opt = this.options;
            var css = this.getSetCss();
            this.$item.css(css.item)
            this.$container.css(css.container).wrap('<div class="hiSlider-wrap"/>');
            this.$wrap = this.$container.parent();
            this.$wrap.css(css.wrap);
            if(this.options.isShowTitle){
                // this.$title = $('<div class="hiSlider-title"/>').insertAfter(this.$container);
                this.setTitle();
            }
            if(this.options.isShowPage){
                // this.$pages = $('<div class="hiSlider-pages">'+this.getPages()+'</div>').insertAfter(this.$container);
                this.pagesSwitch();
            }
            if(this.options.isShowControls){
                this.$prev = $('<a href="javascript:;" class="hiSlider-btn-prev">prev</a>');
                this.$next = $('<a href="javascript:;" class="hiSlider-btn-next">next</a>');
                this.$container.after(this.$prev.add(this.$next));
                this.controlsSwitch();
            }
            if(this.options.mode == 'move'){
                this.$container.append(this.$item.eq(0).clone().addClass('item-clone'));
                this.$item = this.$container.find(this.options.item);
                this.size  = this.$item.size();
            }else{
                this.setFade();
            }
            this.options.onInited.call(this.$container, this.$item, this.options.startSlide);
        },
        resize: function(){
            var timer, self = this;
            clearTimeout(timer);
            timer = setTimeout(function(){
                self.$wrap.add(self.$item).css(self.getSize(self.options.direction));
                self.$container.css(self.getMove(true));
            }, 300);
        },
        setFade: function(){
            this.$item.hide().eq(this.curIndex).show();
        },
        getSetCss: function(){
            var size  = this.getSize(), css = {};
            var start = Math.min(this.options.startSlide, this.size);
            if(this.options.mode == 'fade'){
                size.position = 'absolute';
                css.height = size.height;
                css.width = size.width;
            }else{
                if(this.options.direction == 'top'){
                    css.height = (this.size+1)*100 + '%';
                    css.width = size.width;
                    css.top = -(start*size.height);
                }else{
                    css.height = size.height;
                    css.width = (this.size+1)*100 + '%';
                    css.left = -(start*size.width);
                    size.float = 'left';
                }
                /*if(this.options.isSupportTouch){
                    if(this.options.direction == 'top'){
                        css.transform = 'translateY(-'+(start*size.height)+'px)';
                    }else{
                        css.transform = 'translateX(-'+(start*size.width)+'px)';
                    }
                }else{
                    if(this.options.direction == 'top'){
                        css.top = -(start*size.height);
                    }else{
                        css.left = -(start*size.width);
                    }
                }*/
                css.position = 'relative';
            }
            return {
                item: size,
                container: css,
                wrap: {'overflow': 'hidden', 'position': 'relative', 'width': size.width, 'height': size.height}
            }
        },
        autoPlay: function(){
            var self = this;
            clearTimeout(self.playTimer);
            self.playTimer = setTimeout($.proxy(self, self.options.mode), self.options.intervalTime);
        },
        controlsSwitch: function(){
            var self = this;
            this.$next.on('click', $.proxy(self, self.options.mode));
            this.$prev.on('click', $.proxy(self, self.options.mode+'Prev'));
        },
        pagesSwitch: function(){
            if(!this.options.isShowPage || !this.$pages)return;
            var self = this;
            $('a', this.$pages).on('click', function(){
                self.curIndex = $(this).index();
                self.options.onSelected.call(this, self.curIndex);
                self[self.options.mode+'Prev'](true);
            })
        },
        getPages: function(){
            var arr      = [];
            var curIndex = this.curIndex;
            $(this.$item).each(function(idx){
                var cls = idx == curIndex ? 'class="active"' : '';
                arr.push('<a href="javascript:;" '+cls+'>'+(idx+1)+'</a>');
            });
            return arr.join('');
        },
        getSize: function(){
            var $elem = this.$item.eq(0), size;
            if(this.options.isFullScreen){
                size = {width: $(window).width(), height: $(window).height()}
            }else{
                if(this.options.isFlexible){
                    var $elem = this.$wrap ? this.$wrap.parent() : this.$container.parent();
                    size = this.options.direction == 'top' ? {height: $elem.height()} : {width: $elem.width()}
                }
            }
            return size || {width: $elem.width(), height: $elem.height()}
        }
    }

    $.fn.hiSlider = function(options){
        this.each(function(){
            $(this).data('mr.slider', new Slider($(this), options));
        });
        return this;
    }
}(window.jQuery))



! function(t) {
    function i(i, e) {
        this.$container = i, this.options = t.extend({
            startSlide: 0,
            item: ".hiSlider-item",
            isFullScreen: !1,
            isFlexible: !1,
            isSupportTouch: "__proto__" in {},
            isShowPage: !0,
            isShowTitle: !0,
            titleAttr: "data-title",
            isShowControls: !0,
            isAuto: !0,
            intervalTime: 5e3,
            affectTime: 300,
            mode: "move",
            direction: "left",
            onSwipeStart: t.noop,
            onSwipeMove: t.noop,
            minSwipeLength: 30,
            onSwipeCancel: t.noop,
            onSwipeEnd: t.noop,
            onSwipeLeft: t.noop,
            onSwipeRight: t.noop,
            onSwipeTop: t.noop,
            onSwipeBottom: t.noop,
            onInited: t.noop,
            onMoveBefore: t.noop,
            onMoveAfter: t.noop,
            onSelected: t.noop
        }, e), this.init()
    }
    i.prototype = {
        init: function() {
            this.$item = this.$container.find(this.options.item), this.size = this.$item.size(), this.curIndex = this.options.startSlide, this.setLayout(), this.playTimer = null, this.options.isAuto && this.autoPlay(), this.options.isFlexible && t(window).on("resize.hiSlider", t.proxy(this, "resize")), this.options.isSupportTouch && this.touch()
        },
        touch: function() {
            var t = this,
                i = {},
                e = this.options,
                o = e.minSwipeLength;
            this.$container.on("touchstart", function(t) {
                var o = t.originalEvent.touches[0];
                i.x1 = o.pageX, i.y1 = o.pageY, e.onSwipeStart.call(this, i)
            }).on("touchmove", function(t) {
                var o = t.originalEvent.touches[0];
                i.x2 = o.pageX, i.y2 = o.pageY, e.onSwipeMove.call(this, i)
            }).on("touchend", function() {
                if (i.x2 && Math.abs(i.x1 - i.x2) > o || i.y2 && Math.abs(i.y1 - i.y2) > o) {
                    var n = t.swipeDirection(i.x1, i.x2, i.y1, i.y2);
                    e["onSwipe" + n].call(this, i), t.moveTo(n), e.onSwipeEnd.call(this, i)
                } else e.onSwipeCancel.call(this, i);
                i = {}
            })
        },
        moveTo: function(t) {
            var i = this,
                e = i.options.direction;
            "top" == e ? "Bottom" == t ? i[i.options.mode + "Prev"]() : "Top" == t && i[i.options.mode]() : "left" == e && ("Right" == t ? i[i.options.mode + "Prev"]() : "Left" == t && i[i.options.mode]())
        },
        swipeDirection: function(t, i, e, o) {
            var n = Math.abs(t - i),
                s = Math.abs(e - o);
            return n >= s ? t - i > 0 ? "Left" : "Right" : e - o > 0 ? "Top" : "Bottom"
        },
        move: function() {
            var t, i = this;
            i.options.isAuto && i.autoPlay(), ++i.curIndex == i.size && (i.curIndex = 0, i.$container.css(i.getMove()), i.curIndex++), i.setTitle(), i.setPages(), t = i.curIndex == i.size - 1 ? 0 : i.curIndex, i.options.onMoveBefore.call(i.$container, i.$item, t), i.$container.stop(!1, !0).animate(i.getMove(), i.options.affectTime, function() {
                i.options.onMoveAfter.call(this, i.$item, t)
            })
        },
        movePrev: function(t) {
            var i = this;
            1 != t && ("move" == i.options.mode ? 0 == i.curIndex && (i.curIndex = i.size - 1, i.$container.css(i.getMove())) : 0 == i.curIndex && (i.curIndex = i.size), i.curIndex--), i.options.isAuto && i.autoPlay(), i.setTitle(), i.setPages(), i.options.onMoveBefore.call(i.$container, i.$item, i.curIndex), i.$container.stop(!1, !0).animate(i.getMove(), i.options.affectTime, function() {
                i.options.onMoveAfter.call(this, i.$item, i.curIndex)
            })
        },
        getMove: function(t) {
            var i = {},
                e = this.getSize(),
                o = this.options.direction;
            return "top" == o ? (i.top = -this.curIndex * e.height, t && (i.width = e.width)) : (i.left = -this.curIndex * e.width, t && (i.height = e.height)), i
        },
        fade: function() {
            var t = this;
            t.options.isAuto && t.autoPlay(), t.curIndex++, t.curIndex > t.size - 1 && (t.curIndex = 0), t.setTitle(), t.setPages(), t.options.onMoveBefore.call(t.$container, t.$item, t.curIndex), t.$item.fadeOut(t.options.affectTime).eq(t.curIndex).fadeIn(t.options.affectTime, function() {
                t.options.onMoveAfter.call(this, t.$item, t.curIndex)
            })
        },
        fadePrev: function(t) {
            var i = this;
            1 != t && ("move" == i.options.mode ? 0 == i.curIndex && (i.curIndex = i.size - 1, i.$container.css(i.getMove())) : 0 == i.curIndex && (i.curIndex = i.size), i.curIndex--), i.options.isAuto && i.autoPlay(), i.setTitle(), i.setPages(), i.options.onMoveBefore.call(i.$container, i.$item, i.curIndex), i.$item.fadeOut(i.options.affectTime).eq(i.curIndex).fadeIn(i.options.affectTime, function() {
                i.options.onMoveAfter.call(this, i.$item, i.curIndex)
            })
        },
        setPages: function() {
            if (this.options.isShowPage && this.$pages) {
                var i = this.curIndex;
                i == this.size - 1 && "move" == this.options.mode && (i = 0), t("a", this.$pages).eq(i).addClass("active").siblings().removeClass("active")
            }
        },
        setTitle: function() {
            if (this.options.isShowTitle && this.$title) {
                var i = this.$item.eq(this.curIndex);
                this.$title.html(t.isFunction(this.options.titleAttr) ? this.options.titleAttr.call(i, this.curIndex) : i.attr(this.options.titleAttr))
            }
        },
        setLayout: function() {
            var i = (this.options, this.getSetCss());
            this.$item.css(i.item), this.$container.css(i.container).wrap('<div class="hiSlider-wrap"/>'), this.$wrap = this.$container.parent(), this.$wrap.css(i.wrap), this.options.isShowTitle && (this.$title = t().insertAfter(this.$container), this.setTitle()), this.options.isShowPage && (this.$pages = t('<div class="hiSlider-pages">' + this.getPages() + "</div>").insertAfter(this.$container), this.pagesSwitch()), this.options.isShowControls && (this.$prev = t(''), this.$next = t(), this.$container.after(this.$prev.add(this.$next)), this.controlsSwitch()), "move" == this.options.mode ? (this.$container.append(this.$item.eq(0).clone().addClass("item-clone")), this.$item = this.$container.find(this.options.item), this.size = this.$item.size()) : this.setFade(), this.options.onInited.call(this.$container, this.$item, this.options.startSlide)
        },
        resize: function() {
            var t, i = this;
            clearTimeout(t), t = setTimeout(function() {
                i.$wrap.add(i.$item).css(i.getSize(i.options.direction)), i.$container.css(i.getMove(!0))
            }, 300)
        },
        setFade: function() {
            this.$item.hide().eq(this.curIndex).show()
        },
        getSetCss: function() {
            var t = this.getSize(),
                i = {},
                e = Math.min(this.options.startSlide, this.size);
            return "fade" == this.options.mode ? (t.position = "absolute", i.height = t.height, i.width = t.width) : ("top" == this.options.direction ? (i.height = 100 * (this.size + 1) + "%", i.width = t.width, i.top = -(e * t.height)) : (i.height = t.height, i.width = 100 * (this.size + 1) + "%", i.left = -(e * t.width), t.float = "left"), i.position = "relative"), {
                item: t,
                container: i,
                wrap: {
                    overflow: "hidden",
                    position: "relative",
                    width: t.width,
                    height: t.height
                }
            }
        },
        autoPlay: function() {
            var i = this;
            clearTimeout(i.playTimer), i.playTimer = setTimeout(t.proxy(i, i.options.mode), i.options.intervalTime)
        },
        controlsSwitch: function() {
            var i = this;
            this.$next.on("click", t.proxy(i, i.options.mode)), this.$prev.on("click", t.proxy(i, i.options.mode + "Prev"))
        },
        pagesSwitch: function() {
            if (this.options.isShowPage && this.$pages) {
                var i = this;
                t("a", this.$pages).on("click", function() {
                    i.curIndex = t(this).index(), i.options.onSelected.call(this, i.curIndex), i[i.options.mode + "Prev"](!0)
                })
            }
        },
        getPages: function() {
            var i = [],
                e = this.curIndex;
            return t(this.$item).each(function(t) {
                var o = t == e ? 'class="active"' : "";
                i.push('<a href="javascript:;" ' + o + ">" + (t + 1) + "</a>")
            }), i.join("")
        },
        getSize: function() {
            var i, e = this.$item.eq(0);
            if (this.options.isFullScreen) i = {
                width: t(window).width(),
                height: t(window).height()
            };
            else if (this.options.isFlexible) {
                var e = this.$wrap ? this.$wrap.parent() : this.$container.parent();
                i = "top" == this.options.direction ? {
                    height: e.height()
                } : {
                    width: e.width()
                }
            }
            return i || {
                width: e.width(),
                height: e.height()
            }
        }
    }, t.fn.hiSlider = function(e) {
        return this.each(function() {
            t(this).data("mr.slider", new i(t(this), e))
        }), this
    }
}(window.jQuery);
