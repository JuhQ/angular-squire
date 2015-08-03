/**
* @preserve angular-squire - angularjs directive for squire rich text editor
* @version v0.7.0
* @link https://github.com/HourlyNerd/angular-squire
* @license MIT
**/
(function(){var e,n,t,i;i=window.angular,e=window.jQuery,t=window._,n=window.Squire,i.module("angular-squire",[]).directive("squire",["squireService",function(e){return{restrict:"E",require:"ngModel",scope:{height:"@",width:"@",body:"=",placeholder:"@",editorClass:"@",buttons:"@"},replace:!0,transclude:!0,templateUrl:"/modules/angular-squire/editor.html",controller:["$scope",function(n){var i,s;return i={},n.buttons&&(i=n.$eval(n.buttons)),n.buttonVis=t.defaults(i||{},e.getButtonDefaults()),s=!0,n.isEditorVisible=function(){return s},n.editorVisibility=this.editorVisibility=function(e){var t;return 1!==arguments.length?s:(s=e,e&&null!=(t=n.editor)?t.focus():void 0)}}],link:function(s,r,o,a){var l,u,d,c,v,g,f,h,m,p,b,k,L,w,C,V;return d="http://",u="angular-squire-iframe",l="h4",c=s.editor=null,s.data={link:d},C=function(n){return n=e.sanitize.input(n,c),s.$evalAsync(function(){return a.$setViewValue(n),a.$isEmpty(n)?r.removeClass("squire-has-value"):r.addClass("squire-has-value")})},a.$render=function(){return null!=c?c.setHTML(a.$viewValue||""):void 0},a.$isEmpty=function(e){return i.isString(e)?0===i.element("<div>"+e+"</div>").text().trim().length:!e},v=function(){return c?i.element(c.getSelection().commonAncestorContainer).closest("a").attr("href"):d},s.canRemoveLink=function(){var e;return e=v(),e&&e!==d},s.canAddLink=function(){return s.data.link&&s.data.link!==d},s.$on("$destroy",function(){return null!=c?c.destroy():void 0}),s.showPlaceholder=function(){return a.$isEmpty(a.$viewValue)},s.popoverHide=function(e,n){var t;return t=function(){return i.element(e.target).closest(".popover-visible").removeClass("popover-visible"),s.action(n)},e.keyCode?13===e.keyCode?t():void 0:t()},s.popoverShow=function(e){var n,t;n=i.element(e.currentTarget),i.element(e.target).closest(".squire-popover").length||n.hasClass("popover-visible")||(n.addClass("popover-visible"),s.data.link=/>A\b/.test(c.getPath())||c.hasFormat("A")?v():d,t=r.find(".squire-popover").find("input").focus().end(),t.css({left:-1*(t.width()/2)+n.width()/2+2}))},V=function(e){var n;return n=e.head,t.each(i.element("link"),function(t){var i;return i=e.createElement("link"),i.setAttribute("href",t.href),i.setAttribute("type","text/css"),i.setAttribute("rel","stylesheet"),n.appendChild(i)}),e.childNodes[0].className=u+" ",s.editorClass?e.childNodes[0].className+=s.editorClass:void 0},f=r.find("iframe"),L=r.find(".menu"),g=!1,h=function(){var t;return t=f[0].contentWindow.document,V(t),a.$setPristine(),c=s.editor=new n(t),c.defaultBlockTag="P",s.body&&(c.setHTML(s.body),C(s.body),g=!0),c.addEventListener("willPaste",function(n){return e.sanitize.paste(n,c)}),c.addEventListener("input",function(){var e;return g?(e=c.getHTML(),C(e)):void 0}),c.addEventListener("focus",function(){return r.addClass("focus").triggerHandler("focus"),s.editorVisibility(!0),g=!0}),c.addEventListener("blur",function(){return r.removeClass("focus").triggerHandler("blur"),a.$pristine&&!a.$isEmpty(a.$viewValue)?a.$setTouched():a.$setPristine(),g=!0}),c.addEventListener("pathChange",function(){var e,n;return e=c.getPath(),/>A\b/.test(e)||c.hasFormat("A")?r.find(".add-link").addClass("active"):r.find(".add-link").removeClass("active"),L.attr("class","menu "+(null!=(n=e.split("BODY")[1])?n.replace(/>|\.|html|body|div/gi," ").replace(RegExp(l,"g"),"size").toLowerCase():void 0))}),c.alignRight=function(){return c.setTextAlignment("right")},c.alignCenter=function(){return c.setTextAlignment("center")},c.alignLeft=function(){return c.setTextAlignment("left")},c.alignJustify=function(){return c.setTextAlignment("justify")},c.makeHeading=function(){var e;return e=!L.hasClass("size"),c.forEachBlock(function(n){return e?i.element(n).addClass(l):i.element(n).removeClass(l)},!0),c.focus()}},w=navigator.userAgent,m=/Chrome/.test(w)||/Safari/.test(w),b=/rv:11.0|IE/.test(w),p=!m&&!b,k=!1,f.on("load",function(){return k=!0}),m?h():r.one("mouseenter",function(){return p?k?h():f.on("load",h):h()}),n.prototype.testPresenceinSelection=function(e,n,t,i){var s,r;return s=this.getPath(),r=i.test(s)|this.hasFormat(t),e===n&&r},s.action=function(e){var n,t,r,o,a;if(c)if(a={value:e,testBold:c.testPresenceinSelection("bold",e,"B",/>B\b/),testItalic:c.testPresenceinSelection("italic",e,"I",/>I\b/),testUnderline:c.testPresenceinSelection("underline",e,"U",/>U\b/),testOrderedList:c.testPresenceinSelection("makeOrderedList",e,"OL",/>OL\b/),testUnorderedList:c.testPresenceinSelection("makeUnorderedList",e,"UL",/>UL\b/),testLink:c.testPresenceinSelection("removeLink",e,"A",/>A\b/),testQuote:c.testPresenceinSelection("increaseQuoteLevel",e,"blockquote",/>blockquote\b/),isNotValue:function(n){return n===e&&""!==this.value}},a.testBold||a.testItalic||a.testUnderline||a.testOrderedList||a.testUnorderedList||a.testQuote||a.testLink){if(a.testBold&&c.removeBold(),a.testItalic&&c.removeItalic(),a.testUnderline&&c.removeUnderline(),a.testOrderedList&&c.removeList(),a.testUnorderedList&&c.removeList(),a.testQuote&&c.decreaseQuoteLevel(),a.testLink)return c.removeLink(),c.focus()}else if(!a.isNotValue("removeLink")){if("makeLink"===e){if(!s.canAddLink())return;return t=i.element(c.getSelection().commonAncestorContainer).closest("a")[0],t&&(r=f[0].contentWindow.document.createRange(),r.selectNodeContents(t),o=f[0].contentWindow.getSelection(),o.removeAllRanges(),o.addRange(r)),n=s.data.link.match(/^\s*?javascript:/i)?d:s.data.link,c.makeLink(n,{target:"_blank",title:n,rel:"nofollow"}),s.data.link=d,c.focus()}return c[e](),c.focus()}}}}}]).directive("squireCover",function(){return{restrict:"E",replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isCoverVisible()"\n    ng-click=\'hideCover()\'\n    class="angular-squire-cover">\n</ng-transclude>',link:function(e,n,t,i){var s;return s=!0,e.isCoverVisible=function(){return s},e.hideCover=function(){return s=!1,i.editorVisibility(!0)},i.editorVisibility(!s),e.$watch(function(){return i.editorVisibility()},function(e){return s=!e})}}}).directive("squireControls",function(){return{restrict:"E",scope:!1,replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isControlsVisible()"\n    class="angular-squire-controls">\n</ng-transclude>',link:function(e,n,t,i){return e.isControlsVisible=function(){return i.editorVisibility()}}}}).provider("squireService",["$window",function(e){var n,t,i,s,r,o,a;return r="undefined"!=typeof e.Sanitize,n={bold:!0,italic:!0,underline:!0,link:!0,ol:!0,ul:!0,quote:!0,header:!0,alignRight:!0,alignLeft:!0,alignCenter:!0,undo:!0,redo:!0},r&&(t=new Sanitize({elements:["div","span","b","i","ul","ol","li","blockquote","a","p","br","u"],attributes:{__ALL__:["class"],a:["href","title","target","rel"]},protocols:{a:{href:["ftp","http","https","mailto","gopher"]}}}),a={paste:t,input:t}),i=r,o={onPaste:function(){},onChange:function(e){return e},sanitize:{paste:function(e,n){return i&&(e.fragment=a.paste.clean_node(e.fragment)),o.onPaste(e,n)},input:function(e,n){var t,s,r,l,u;if(i){for(r=document.createDocumentFragment(),u=document.createElement("body"),u.innerHTML=e;t=u.firstChild;)r.appendChild(t);for(r=a.input.clean_node(r);t=r.firstChild;)u.appendChild(t);l=u.innerHTML,e!==l&&(n.setHTML(l),e=l)}return s={html:e},o.onChange(s,n),s.html}},setButtonDefaults:function(e){return n=e},getButtonDefaults:function(){return n}},this.onPaste=function(e){return e?o.onPaste=e:void 0},this.onChange=function(e){return e?o.onChange=e:void 0},s=function(e){return r?e:function(){throw new Error("Angular-Squire: you must include https://github.com/gbirke/Sanitize.js to use sanitize options")}},this.sanitizeOptions={paste:s(function(e){return e?a.paste=new Sanitize(e):void 0}),input:s(function(e){return e?a.input=new Sanitize(e):void 0})},this.strictPaste=s(function(e){return a.paste=e?new Sanitize({elements:["div","span","b","i","u","br","p"]}):t}),this.enableSanitizer=s(function(e){return null==e&&(e=!0),i=e}),this.$get=function(){return o},this}])}).call(this),angular.module("angular-squire").run(["$templateCache",function(e){e.put("/modules/angular-squire/editor.html",'<div class=\'angular-squire\'>\n    <div ng-class="{\'editor-hide\': !isEditorVisible()}" class=\'editor-container\'>\n        <div class="menu">\n            <div class="group" ng-show="buttonVis.bold || buttonVis.italic || buttonVis.underline">\n                <div title=\'Bold\'\n                     ng-click="action(\'bold\')"\n                     ng-show="buttonVis.bold"\n                     class="item bold">\n                    <i class="fa fa-bold"></i>\n                </div>\n                <div title=\'Italic\'\n                     ng-click="action(\'italic\')"\n                     ng-show="buttonVis.italic"\n                     class="item italic">\n                    <i class="fa fa-italic"></i>\n                </div>\n                <div title=\'Underline\'\n                     ng-click="action(\'underline\')"\n                     ng-show="buttonVis.underline"\n                     class="item underline">\n                    <i class="fa fa-underline"></i>\n                </div>\n            </div>\n            <div class="group"  ng-show="buttonVis.link || buttonVis.ol || buttonVis.ul || buttonVis.quote">\n                <div title=\'Insert Link\'\n                     class="item add-link"\n                     ng-show="buttonVis.link"\n                     ng-click="popoverShow($event)">\n                    <i class="fa fa-link"></i>\n                    <div class="squire-popover">\n                        <div class="arrow"></div>\n                        <div class="content">\n                            <div class="title">Insert Link</div>\n                            <input type="text"\n                                id="edit-link"\n                                placeholder="Link URL"\n                                ng-model="data.link"\n                                ng-keydown="popoverHide($event, \'makeLink\')" />\n                            <button class="double r" ng-show="canRemoveLink()"\n                                ng-click="popoverHide($event, \'removeLink\')">\n                                <span class="fa fa-remove"></span> Remove Link\n                            </button>\n                            <button class="double l" ng-show="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-edit"></span> Update Link\n                            </button>\n                            <button ng-hide="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-plus"></span> Insert Link\n                            </button>\n                        </div>\n                        <div class="squire-popover-overlay" ng-click="popoverHide($event, \'makeLink\')"></div>\n                    </div>\n                </div>\n                <div title=\'Insert Numbered List\'\n                     ng-click="action(\'makeOrderedList\')"\n                     ng-show="buttonVis.ol"\n                     class="item olist">\n                    <i class="fa fa-list-ol"></i>\n                </div>\n                <div title=\'Insert List\'\n                     ng-click="action(\'makeUnorderedList\')"\n                     ng-show="buttonVis.ul"\n                     class="item ulist">\n                    <i class="fa fa-list-ul"></i>\n                </div>\n                <div title=\'Quote\'\n                     ng-click="action(\'increaseQuoteLevel\')"\n                     ng-show="buttonVis.quote"\n                     class="item quote">\n                    <i class="fa fa-quote-right"></i>\n                </div>\n            </div>\n\n            <div class="group" ng-show="buttonVis.header || buttonVis.alignLeft || buttonVis.alignRight || buttonVis.alignCenter">\n                <div title=\'Header\'\n                     ng-click="action(\'makeHeading\')"\n                     ng-show="buttonVis.header"\n                     class="item header">\n                    <i class="fa fa-header"></i>\n                </div>\n                <div title=\'Align Left\'\n                     ng-click="action(\'alignLeft\')"\n                     ng-show="buttonVis.alignLeft"\n                     class="item aleft">\n                    <i class="fa fa-align-left"></i>\n                </div>\n                <div title=\'Align Center\'\n                     ng-click="action(\'alignCenter\')"\n                     ng-show="buttonVis.alignCenter"\n                     class="item acenter">\n                    <i class="fa fa-align-center"></i>\n                </div>\n                <div title=\'Align Right\'\n                     ng-click="action(\'alignRight\')"\n                     ng-show="buttonVis.alignRight"\n                     class="item aright">\n                    <i class="fa fa-align-right"></i>\n                </div>\n            </div>\n\n            <div class="group" ng-show="buttonVis.undo || buttonVis.redo">\n                <div title=\'Undo\'\n                     ng-click="action(\'undo\')"\n                     ng-show="buttonVis.undo"\n                     class="item">\n                    <i class="fa fa-undo"></i>\n                </div>\n                <div title=\'Redo\'\n                     ng-click="action(\'redo\')"\n                     ng-show="buttonVis.redo"\n                     class="item">\n                    <i class="fa fa-repeat"></i>\n                </div>\n            </div>\n        </div>\n\n        <div class=\'angular-squire-wrapper\' ng-style=\'{width: width, height: height}\'>\n            <div class=\'placeholder\'>\n                <div ng-show=\'showPlaceholder()\'>{{ placeholder }}</div>\n            </div>\n            <iframe frameborder=\'0\' border=\'0\' marginwidth=\'0\' marginheight=\'0\' src=\'about:blank\'></iframe>\n        </div>\n    </div>\n    <ng-transclude></ng-transclude>\n</div>\n')}]);