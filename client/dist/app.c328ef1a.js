// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var home = function home(datas) {
  var dateSort = true;

  var setDateSort = function setDateSort(dateSort) {
    dateSort = !dateSort;
    console.log(dateSort);
  };

  var dataState = datas;
  var currentPage = 1;
  var length = 5;
  var pageMax = parseInt(dataState.length / length) + 1; //page 최대갯수 '게시물갯수바꾸기'에 따라 달라져야겠지

  var getDataByAuthor = function getDataByAuthor(author) {
    //이 로직을 view에서 하는게 낫지않을까? sever까지 가기는 아까운데
    var updated = datas.filter(function (x) {
      return x.author == author;
    });
    dataState = updated;
    render(dataState, length, 1);
  };

  var onClickDate = function onClickDate() {
    setDateSort(dateSort);
  };

  var onClickAuthor = function onClickAuthor(e) {
    getDataByAuthor(e.target.innerText);
  };

  var onChangeLength = function onChangeLength(e) {
    length = e.target.value;

    (function changePageMax() {
      pageMax = parseInt(dataState.length / length) + 1;
    })(); //즉시실행함수로 page최대갯수 바꿔줌


    currentPage = 1;
    render(dataState, length, currentPage); //게시물갯수바꾸면 1페이지로
  };

  var onClickWrite = function onClickWrite() {
    history.pushState('xx', 'ss', 'edit?new');
    window.dispatchEvent(new Event('locationchange'));
  };

  var onClickTitle = function onClickTitle(e) {
    var ContentNum = e.target.previousSibling.previousSibling.innerText;
    history.pushState('xx', 'ss', "content?num=".concat(ContentNum));
    window.dispatchEvent(new Event('locationchange'));
  };

  var onClickpaging = function onClickpaging(e) {
    switch (e.target.innerText) {
      case 'left':
        if (currentPage == 1) {
          //페이지 1이면 더 내려가지않고 함수끝내기
          console.log('page가 최소임');
          return;
        }

        currentPage = currentPage - 1;
        break;

      case 'right':
        if (currentPage == pageMax) {
          //페이지 초과시 함수끝내기
          console.log('page 최대임');
          return;
        }

        currentPage = currentPage + 1;
        break;

      default:
        break;
    }

    render(dataState, length, currentPage);
  };

  var container = document.getElementById('root');

  function render(dataState, length, currentPage) {
    //나중에 render(state)해서 render구현제대로
    var template = "\n                <div>\n                    <div class =\"columns\">\n                        <ul>\uBC88\uD638</ul>\n                        <ul>\uC81C\uBAA9</ul>    \n                        <ul>\uC791\uC131\uC790</ul>    \n                        <ul class='date_column'>\uC791\uC131\uC77C</ul>\n                    </div>\n                    <div class =\"post_container\">\n                        {{__post__}}\n                    </div>\n                    <button class=\"write\">\uC791\uC131</button>\n                    <select class=\"select_length\"> \n                        <option>\uAC8C\uC2DC\uBB3C \uAC2F\uC218</option>\n                        <option value =5>5\uAC1C</option>\n                        <option value =10>10\uAC1C</option>\n                        <option value =30>30\uAC1C</option>\n                        <option value =50>50\uAC1C</option>\n                        <option value =100>100\uAC1C</option>\n                    </select>\n                    <div class='page_container'>\n                        <button class='left_button'>left</button>\n                        <div>".concat(currentPage, "</div>\n                        <button class='right_button'>right</button>\n                    </div>\n\n                </div>\n        ");
    var posts = []; //for문 돌리면서 여러개를 넣어야 되서 배열로해서 template 일부분을 교체할꺼

    for (var i = (currentPage - 1) * length; i < currentPage * length; i++) {
      var data = dataState[i];

      if (data == undefined) {
        //지정한 length보다 글의 갯수가 적을 떄의 예외
        break;
      }

      posts.push("\n                <ul class=\"num\">".concat(data.num, "</ul>\n                <ul class=\"title\">").concat(data.title, "</ul>\n                <ul class=\"author\">").concat(data.author, "</ul>\n                <ul class=\"date\">").concat(data.date, "</ul>\n            "));
    }

    ;
    template = template.replace("{{__post__}}", posts.join(''));
    container.innerHTML = template;
    var selectLength = document.querySelector('.select_length'); //게시물 갯수 바뀌는 이벤트

    selectLength.addEventListener('change', onChangeLength);
    var authors = document.querySelectorAll('.author'); //작성자 클릭 이벤트

    var _iterator = _createForOfIteratorHelper(authors),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var author = _step.value;
        author.addEventListener('click', onClickAuthor);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var titles = document.querySelectorAll('.title'); //게시글조회 이벤트

    var _iterator2 = _createForOfIteratorHelper(titles),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var title = _step2.value;
        title.addEventListener('click', onClickTitle);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var date = document.querySelector('.date_column');
    date.addEventListener('click', onClickDate);
    var button = document.querySelector('.write');
    button.addEventListener('click', onClickWrite);
    var leftButton = document.querySelector('.left_button');
    leftButton.addEventListener('click', onClickpaging);
    var rightButton = document.querySelector('.right_button');
    rightButton.addEventListener('click', onClickpaging);
  }

  render(dataState, length, currentPage); //default render실행
};

var _default = home;
exports.default = _default;
},{}],"write.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var write = function write() {
  var container = document.getElementById('root');
  container.innerHTML = 'hi';
};

var _default = write;
exports.default = _default;
},{}],"content.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var content = function content(props) {
  var data = props.dataFound;
  var deleteData = props.deleteData;
  var content = props.contentFound; //props받아오기

  var container = document.getElementById('root');

  var onClickHome = function onClickHome() {
    history.pushState('x', 's', '/');
    window.dispatchEvent(new Event('locationchange'));
  };

  var onClickEdit = function onClickEdit() {
    history.pushState('a', 's', "edit?num=".concat(data.num));
    window.dispatchEvent(new Event('locationchange'));
  };

  var onClickDelete = function onClickDelete() {
    deleteData(data.num); //삭제후 목록복귀

    history.pushState('x', 's', '/');
    window.dispatchEvent(new Event('locationchange'));
  };

  var template = "\n    <div>\uAE00\uBC88\uD638 \n ".concat(data.num, "</div>\n    <div>\uC81C\uBAA9 \n ").concat(data.title, "</div>\n    <div>\uC791\uC131\uC790 \n ").concat(data.author, "</div>\n    <div>\uC791\uC131 \uB0A0\uC9DC \n ").concat(data.date, "</div>\n    <div>").concat(content, "</div>\n    <button class='edit_button'>\uC218\uC815</button>\n    <button class='delete_button'>\uC0AD\uC81C</button>\n    <button class='home_button'>\uBAA9\uB85D</button>\n    ");
  container.innerHTML = template;
  var editButton = container.querySelector('.edit_button');
  editButton.addEventListener('click', onClickEdit);
  var deleteButton = container.querySelector('.delete_button');
  deleteButton.addEventListener('click', onClickDelete);
  var homeButton = container.querySelector('.home_button');
  homeButton.addEventListener('click', onClickHome);
};

var _default = content;
exports.default = _default;
},{}],"edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var edit = function edit(props) {
  var data = props.data;
  var content = props.content;
  var changeData = props.changeData;
  var AddData = props.AddData; //props받아오기

  var container = document.getElementById('root');

  var onClickSend = function onClickSend() {
    if (AddData) {
      AddData(text, title, author, data);
    } else {
      changeData(text, title, author, data); //데이터 바꾸기
    }

    history.pushState('', '', "/content?num=".concat(data.num)); //다시 글로 돌아가기

    window.dispatchEvent(new Event('locationchange'));
  };

  var onChange = function onChange(e) {
    //input요소들 바뀔때마다 state변경해주가
    switch (e.target.classList.value) {
      case 'text_container':
        text = e.target.value;
        break;

      case 'title_input':
        title = e.target.value;
        break;

      case 'author_input':
        author = e.target.value;
        break;

      default:
        console.log('error cant found element');
    }
  };

  var title = data.title;
  var author = data.author;
  var text = content;

  function render(text, title, author) {
    var template = "\n        <div>\uAE00\uBC88\uD638 \n ".concat(data.num, "</div>\n        <div>\uC81C\uBAA9</div>\n        <div class ='form'>\n            <input class='title_input' type='text' value=").concat(title, "></input>\n            <div>\uC791\uC131\uC790</div>\n            <input class='author_input' type='text' value =").concat(author, " ></input>\n            <div>\uC791\uC131 \uB0A0\uC9DC \n ").concat(data.date, "</div>\n            <textarea class='text_container' cols=\"30\" rows=\"10\">").concat(text, "</textarea>\n        </div>\n        <button class='send_button'>\uC804\uC1A1</button>\n        ");
    container.innerHTML = template;
    var sendButton = container.querySelector('.send_button');
    sendButton.addEventListener('click', onClickSend);
    var form = container.querySelector('.form');
    form.addEventListener('keypress', onChange);
  }

  ;
  render(text, title, author);
};

var _default = edit;
exports.default = _default;
},{}],"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDataByNum = exports.findContentByNum = exports.deleteData = exports.datas = exports.dataCount = exports.contentsData = exports.changeData = exports.AddData = void 0;
var dataCount = 12;
exports.dataCount = dataCount;
var datas = [{
  num: 1,
  title: 'hi',
  author: 'tn',
  date: '20123122'
}, {
  num: 2,
  title: 'wei',
  author: 'ts',
  date: '20123232'
}, {
  num: 3,
  title: 'herwi',
  author: 'kn',
  date: '20123112'
}, {
  num: 4,
  title: 'hqqi',
  author: '1n',
  date: '20123342'
}, {
  num: 5,
  title: 'hqqi',
  author: '1n',
  date: '20123342'
}, {
  num: 6,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 7,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 8,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 9,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 10,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 11,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}, {
  num: 12,
  title: 'hwei',
  author: 'tn',
  date: '20123322'
}]; //글번호 / 제목 / 내용 / 작성자 / 작성일 등의 정보를 볼 수 있다.
//위에 data랑 통합하지 않은 이유 = home에 게시글들 쭉 나열하는데 굳이 content까지 읽어들일 필요 없다고 판단
//근데 어차피 hash로 가져오는거라 별로 상관없나? 어차피 db에서 할것들이니 신경ㄴㄴ

exports.datas = datas;
var contentsData = [{
  num: 1,
  content: 'ㄹㄴ카ㅣㄴㄹ푸너123헢ㄹㅇ킾릉ㅋ'
}, {
  num: 2,
  content: 'ㅣㄴㅇ53255ㅡ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 3,
  content: 'ㅣㄴㄴㄹ123우ㅡ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 4,
  content: 'ㅣㄴㄹ푸너ㅏ3453ㄹ핔우ㅡ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 5,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔45545우ㅡ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 6,
  content: '카ㅣㄴㅇㄹㄴㅇㄴ3434ㄹ푸너ㅏㄹ핔우ㅡㄴㅇ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 7,
  content: '카ㅣㄴㄹ푸너ㄴㅇㅇㅏㄹ핔우ㅡ헢ㄹㅇㄹㄴㅇㅇ킾릉ㅋ'
}, {
  num: 8,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔ㄴ우ㅡ헢ㄹㄴㄹㅇㅇ킾릉ㅋ'
}, {
  num: 9,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔우ㄴㅇㅇㄹㄴㅡ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 10,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔우ㅡㄴㄴㄹㅇ헢ㄹㅇ킾릉ㅋ'
}, {
  num: 11,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔우ㅡ헢ㄹㅇ킾릉ㅋㅇㄹㅇㄹ'
}, {
  num: 12,
  content: '카ㅣㄴㄹ푸너ㅏㄹ핔우ㄴㅇㄹㄴㅇㄹㅇㄴㅡ헢ㄹㅇ킾릉ㅋ'
}];
exports.contentsData = contentsData;

var findContentByNum = function findContentByNum(num) {
  //num으로 flitering 할까? 아니면 배열의 크기를 높이더라도 index와 num을 동일하게 가져가서 index로 할까?
  //index랑 같게 가져가면 또 복잡해지네, 어차피 db에서 처리로직이 있느니 일단 filter로하자
  return contentsData.find(function (data) {
    return data.num == num;
  }).content;
};

exports.findContentByNum = findContentByNum;

var findDataByNum = function findDataByNum(num) {
  return datas.find(function (data) {
    return data.num == num;
  });
};

exports.findDataByNum = findDataByNum;

var deleteData = function deleteData(num) {
  exports.datas = datas = datas.filter(function (data) {
    return data.num !== num;
  });
  exports.contentsData = contentsData = contentsData.filter(function (data) {
    return data.num !== num;
  });
};

exports.deleteData = deleteData;

var changeData = function changeData(text, title, author, data) {
  var updatedData = {
    num: data.num,
    title: title,
    author: author,
    date: data.date
  };
  var updatedContent = {
    num: data.num,
    content: text
  };
  deleteData(data.num);
  datas.push(updatedData);
  contentsData.push(updatedContent);
};

exports.changeData = changeData;

var AddData = function AddData(text, title, author, data) {
  var newData = {
    num: data.num,
    title: title,
    author: author,
    date: data.date
  };
  var newContent = {
    num: data.num,
    content: text
  };
  datas.push(newData);
  contentsData.push(newContent);
  exports.dataCount = dataCount = dataCount + 1;
};

exports.AddData = AddData;
},{}],"node_modules/strict-uri-encode/index.js":[function(require,module,exports) {
'use strict';

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => "%".concat(x.charCodeAt(0).toString(16).toUpperCase()));
},{}],"node_modules/decode-uri-component/index.js":[function(require,module,exports) {
'use strict';

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

module.exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};
},{}],"node_modules/split-on-first/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  var separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};
},{}],"node_modules/filter-obj/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};
},{}],"node_modules/query-string/index.js":[function(require,module,exports) {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var strictUriEncode = require('strict-uri-encode');

var decodeComponent = require('decode-uri-component');

var splitOnFirst = require('split-on-first');

var filterObject = require('filter-obj');

var isNullOrUndefined = function (value) {
  return value === null || value === undefined;
};

var encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return function (key) {
        return function (result, value) {
          var index = result.length;

          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
        };
      };

    case 'bracket':
      return function (key) {
        return function (result, value) {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
        };
      };

    case 'colon-list-separator':
      return function (key) {
        return function (result, value) {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), ':list='].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), ':list=', encode(value, options)].join('')]);
        };
      };

    case 'comma':
    case 'separator':
    case 'bracket-separator':
      {
        var keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            } // Translate null to an empty string so that it doesn't serialize as 'null'


            value = value === null ? '' : value;

            if (result.length === 0) {
              return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
            }

            return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
          };
        };
      }

    default:
      return function (key) {
        return function (result, value) {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [encode(key, options)]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
        };
      };
  }
}

function parserForArrayFormat(options) {
  var result;

  switch (options.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'colon-list-separator':
      return function (key, value, accumulator) {
        result = /(:list)$/.exec(key);
        key = key.replace(/:list$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
    case 'separator':
      return function (key, value, accumulator) {
        var isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
        var isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
        value = isEncodedArray ? decode(value, options) : value;
        var newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(function (item) {
          return decode(item, options);
        }) : value === null ? value : decode(value, options);
        accumulator[key] = newValue;
      };

    case 'bracket-separator':
      return function (key, value, accumulator) {
        var isArray = /(\[\])$/.test(key);
        key = key.replace(/\[\]$/, '');

        if (!isArray) {
          accumulator[key] = value ? decode(value, options) : value;
          return;
        }

        var arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(function (item) {
          return decode(item, options);
        });

        if (accumulator[key] === undefined) {
          accumulator[key] = arrayValue;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], arrayValue);
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function validateArrayFormatSeparator(value) {
  if (typeof value !== 'string' || value.length !== 1) {
    throw new TypeError('arrayFormatSeparator must be single character string');
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (_typeof(input) === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

function removeHash(input) {
  var hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function getHash(url) {
  var hash = '';
  var hashStart = url.indexOf('#');

  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }

  return hash;
}

function extract(input) {
  input = removeHash(input);
  var queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parseValue(value, options) {
  if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
    value = Number(value);
  } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    value = value.toLowerCase() === 'true';
  }

  return value;
}

function parse(query, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    parseNumbers: false,
    parseBooleans: false
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);
  var formatter = parserForArrayFormat(options); // Create an object with no prototype

  var ret = Object.create(null);

  if (typeof query !== 'string') {
    return ret;
  }

  query = query.trim().replace(/^[?#&]/, '');

  if (!query) {
    return ret;
  }

  for (var param of query.split('&')) {
    if (param === '') {
      continue;
    }

    var [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
    formatter(decode(key, options), value, ret);
  }

  for (var _key of Object.keys(ret)) {
    var _value = ret[_key];

    if (_typeof(_value) === 'object' && _value !== null) {
      for (var k of Object.keys(_value)) {
        _value[k] = parseValue(_value[k], options);
      }
    } else {
      ret[_key] = parseValue(_value, options);
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
    var value = ret[key];

    if (Boolean(value) && _typeof(value) === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (object, options) {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ','
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);

  var shouldFilter = function (key) {
    return options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';
  };

  var formatter = encoderForArrayFormat(options);
  var objectCopy = {};

  for (var key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  var keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(function (key) {
    var value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
        return encode(key, options) + '[]';
      }

      return value.reduce(formatter(key), []).join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&');
};

exports.parseUrl = function (url, options) {
  options = Object.assign({
    decode: true
  }, options);
  var [url_, hash] = splitOnFirst(url, '#');
  return Object.assign({
    url: url_.split('?')[0] || '',
    query: parse(extract(url), options)
  }, options && options.parseFragmentIdentifier && hash ? {
    fragmentIdentifier: decode(hash, options)
  } : {});
};

exports.stringifyUrl = function (object, options) {
  options = Object.assign(_defineProperty({
    encode: true,
    strict: true
  }, encodeFragmentIdentifier, true), options);
  var url = removeHash(object.url).split('?')[0] || '';
  var queryFromUrl = exports.extract(object.url);
  var parsedQueryFromUrl = exports.parse(queryFromUrl, {
    sort: false
  });
  var query = Object.assign(parsedQueryFromUrl, object.query);
  var queryString = exports.stringify(query, options);

  if (queryString) {
    queryString = "?".concat(queryString);
  }

  var hash = getHash(object.url);

  if (object.fragmentIdentifier) {
    hash = "#".concat(options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier);
  }

  return "".concat(url).concat(queryString).concat(hash);
};

exports.pick = function (input, filter, options) {
  options = Object.assign(_defineProperty({
    parseFragmentIdentifier: true
  }, encodeFragmentIdentifier, false), options);
  var {
    url: url,
    query: query,
    fragmentIdentifier: fragmentIdentifier
  } = exports.parseUrl(input, options);
  return exports.stringifyUrl({
    url: url,
    query: filterObject(query, filter),
    fragmentIdentifier: fragmentIdentifier
  }, options);
};

exports.exclude = function (input, filter, options) {
  var exclusionFilter = Array.isArray(filter) ? function (key) {
    return !filter.includes(key);
  } : function (key, value) {
    return !filter(key, value);
  };
  return exports.pick(input, exclusionFilter, options);
};
},{"strict-uri-encode":"node_modules/strict-uri-encode/index.js","decode-uri-component":"node_modules/decode-uri-component/index.js","split-on-first":"node_modules/split-on-first/index.js","filter-obj":"node_modules/filter-obj/index.js"}],"api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService = /*#__PURE__*/_createClass(function ApiService() {
  _classCallCheck(this, ApiService);

  _defineProperty(this, "getDataset", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return customFecth({
              method: "GET"
            }, "/datas");

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "findDataByNum", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(num) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return customFecth({
                method: "GET"
              }, "/datas?num=".concat(num));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findContentByNum", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(num) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return customFecth({
                method: "GET"
              }, "/content?num=".concat(num));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "postContent", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(text, title, author, num, date) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return customFecth({
                method: "POST",
                body: {
                  text: text,
                  title: title,
                  author: author,
                  num: num,
                  date: date
                }
              }, "/content");

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x3, _x4, _x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "updateData", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(text, title, author, num, date) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return customFecth({
                method: "PUT",
                body: {
                  text: text,
                  title: title,
                  author: author,
                  num: num,
                  date: date
                }
              }, "/datas?num=".concat(num));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8, _x9, _x10, _x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "deleteDataByNum", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(num) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return customFecth({
                method: "DELETE"
              }, "/content?data=".concat(num));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x13) {
      return _ref6.apply(this, arguments);
    };
  }());
});

exports.default = ApiService;

var customFecth = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(options, url) {
    var res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return fetch("http://localhost:8080".concat(url), _objectSpread(_objectSpread({}, options), {}, {
              headers: _objectSpread(_objectSpread({}, options.headers), {}, {
                "Content-Type": "application/json"
              })
            }));

          case 2:
            res = _context7.sent;
            return _context7.abrupt("return", res);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function customFecth(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _home = _interopRequireDefault(require("./home.js"));

var _write = _interopRequireDefault(require("./write.js"));

var _content2 = _interopRequireDefault(require("./content.js"));

var _edit = _interopRequireDefault(require("./edit.js"));

var _data = require("./data.js");

var _queryString = _interopRequireDefault(require("query-string"));

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiservice = new _api.default();
var container = document.getElementById('root');

function router() {
  var routePath = location.pathname.replace('/', '');

  if (routePath == '') {
    apiservice.getDataset.then(function (res) {
      console.log(res);
    });
    (0, _home.default)(_data.datas);
  } else if (routePath == "content") {
    var query = _queryString.default.parse(location.search);

    var contentFound = (0, _data.findContentByNum)(query.num);
    var dataFound = (0, _data.findDataByNum)(query.num);
    (0, _content2.default)({
      contentFound: contentFound,
      dataFound: dataFound,
      deleteData: _data.deleteData
    });
  } else if (routePath == 'edit') {
    //새로 작성이랑 수정이랑 구분
    var _query = _queryString.default.parse(location.search);

    if (location.search.replace('?', '') == 'new') {
      var today = new Date();
      var date = today.toLocaleDateString().replace(/. /gi, '').replace('.', '');
      var data = {
        num: _data.dataCount + 1,
        title: '',
        author: '',
        date: date
      };
      var _content = '';
      (0, _edit.default)({
        content: _content,
        data: data,
        AddData: _data.AddData
      });
    } else {
      var _contentFound = (0, _data.findContentByNum)(_query.num);

      var _dataFound = (0, _data.findDataByNum)(_query.num);

      (0, _edit.default)({
        content: _contentFound,
        data: _dataFound,
        changeData: _data.changeData
      });
    }
  } else {
    container.innerHTML = 'route가 존재하지 않습니다';
  }
}

window.addEventListener('locationchange', router);
router();
},{"./home.js":"home.js","./write.js":"write.js","./content.js":"content.js","./edit.js":"edit.js","./data.js":"data.js","query-string":"node_modules/query-string/index.js","./api.js":"api.js"}],"../../../../AppData/Roaming/nvm/v14.17.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65124" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/nvm/v14.17.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map