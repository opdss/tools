!function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.XRegExp = a()
    }
}(function () {
    return function a(n, e, r) {
        function t(i, l) {
            if (!e[i]) {
                if (!n[i]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(i, !0);
                    if (m) return m(i, !0);
                    var o = new Error("Cannot find module '" + i + "'");
                    throw o.code = "MODULE_NOT_FOUND", o
                }
                var p = e[i] = {exports: {}};
                n[i][0].call(p.exports, function (a) {
                    var e = n[i][1][a];
                    return t(e || a)
                }, p, p.exports, a, n, e, r)
            }
            return e[i].exports
        }

        for (var m = "function" == typeof require && require, i = 0; i < r.length; i++) t(r[i]);
        return t
    }({
        1: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";

                function n(a) {
                    var n = /^(?:\(\?:\))*\^/, e = /\$(?:\(\?:\))*$/;
                    return n.test(a) && e.test(a) && e.test(a.replace(/\\[\s\S]/g, "")) ? a.replace(n, "").replace(e, "") : a
                }

                function e(n, e) {
                    var t = e ? "x" : "";
                    return a.isRegExp(n) ? n[r] && n[r].captureNames ? n : a(n.source, t) : a(n, t)
                }

                var r = "xregexp", t = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g,
                    m = a.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, t], "g", {conjunction: "or"});
                a.build = function (i, l, s) {
                    s = s || "";
                    var o = s.indexOf("x") > -1, p = /^\(\?([\w$]+)\)/.exec(i);
                    p && (s = a._clipDuplicates(s + p[1]));
                    var c = {};
                    for (var u in l) if (l.hasOwnProperty(u)) {
                        var d = e(l[u], o);
                        c[u] = {pattern: n(d.source), names: d[r].captureNames || []}
                    }
                    var b, _ = e(i, o), h = 0, f = 0, I = [0], g = _[r].captureNames || [],
                        x = _.source.replace(m, function (a, n, e, r, m) {
                            var i, l, s, o = n || e;
                            if (o) {
                                if (!c.hasOwnProperty(o)) throw new ReferenceError("Undefined property " + a);
                                return n ? (i = g[f], I[++f] = ++h, l = "(?<" + (i || o) + ">") : l = "(?:", b = h, l + c[o].pattern.replace(t, function (a, n, e) {
                                    if (n) {
                                        if (i = c[o].names[h - b], ++h, i) return "(?<" + i + ">"
                                    } else if (e) return s = +e - 1, c[o].names[s] ? "\\k<" + c[o].names[s] + ">" : "\\" + (+e + b);
                                    return a
                                }) + ")"
                            }
                            if (r) {
                                if (i = g[f], I[++f] = ++h, i) return "(?<" + i + ">"
                            } else if (m) return s = +m - 1, g[s] ? "\\k<" + g[s] + ">" : "\\" + I[+m];
                            return a
                        });
                    return a(x, s)
                }
            }
        }, {}], 2: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";

                function n(a, n, e, r) {
                    return {name: a, value: n, start: e, end: r}
                }

                a.matchRecursive = function (e, r, t, m, i) {
                    m = m || "", i = i || {};
                    var l, s, o, p, c, u = m.indexOf("g") > -1, d = m.indexOf("y") > -1, b = m.replace(/y/g, ""),
                        _ = i.escapeChar, h = i.valueNames, f = [], I = 0, g = 0, x = 0, y = 0;
                    if (r = a(r, b), t = a(t, b), _) {
                        if (_.length > 1) throw new Error("Cannot use more than one escape character");
                        _ = a.escape(_), c = new RegExp("(?:" + _ + "[\\S\\s]|(?:(?!" + a.union([r, t], "", {conjunction: "or"}).source + ")[^" + _ + "])+)+", m.replace(/[^imu]+/g, ""))
                    }
                    for (; ;) {
                        if (_ && (x += (a.exec(e, c, x, "sticky") || [""])[0].length), o = a.exec(e, r, x), p = a.exec(e, t, x), o && p && (o.index <= p.index ? p = null : o = null), o || p) g = (o || p).index, x = g + (o || p)[0].length; else if (!I) break;
                        if (d && !I && g > y) break;
                        if (o) I || (l = g, s = x), ++I; else {
                            if (!p || !I) throw new Error("Unbalanced delimiter found in string");
                            if (!--I && (h ? (h[0] && l > y && f.push(n(h[0], e.slice(y, l), y, l)), h[1] && f.push(n(h[1], e.slice(l, s), l, s)), h[2] && f.push(n(h[2], e.slice(s, g), s, g)), h[3] && f.push(n(h[3], e.slice(g, x), g, x))) : f.push(e.slice(s, g)), y = x, !u)) break
                        }
                        g === x && ++x
                    }
                    return u && !d && h && h[0] && e.length > y && f.push(n(h[0], e.slice(y), y, e.length)), f
                }
            }
        }, {}], 3: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";

                function n(a) {
                    return a.replace(/[- _]+/g, "").toLowerCase()
                }

                function e(a) {
                    var n = /^\\[xu](.+)/.exec(a);
                    return n ? s(n[1]) : a.charCodeAt("\\" === a.charAt(0) ? 1 : 0)
                }

                function r(n) {
                    var r = "", t = -1;
                    return a.forEach(n, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function (a) {
                        var n = e(a[1]);
                        n > t + 1 && (r += "\\u" + p(o(t + 1)), n > t + 2 && (r += "-\\u" + p(o(n - 1)))), t = e(a[2] || a[1])
                    }), t < 65535 && (r += "\\u" + p(o(t + 1)), t < 65534 && (r += "-\\uFFFF")), r
                }

                function t(a) {
                    return l[a]["b!"] || (l[a]["b!"] = r(l[a].bmp))
                }

                function m(a, n) {
                    var e = l[a], r = "";
                    return e.bmp && !e.isBmpLast && (r = "[" + e.bmp + "]" + (e.astral ? "|" : "")), e.astral && (r += e.astral), e.isBmpLast && e.bmp && (r += (e.astral ? "|" : "") + "[" + e.bmp + "]"), n ? "(?:(?!" + r + ")(?:[锟�-锟絔[锟�-锟絔|[\0-锟縘))" : "(?:" + r + ")"
                }

                function i(a, n) {
                    var e = n ? "a!" : "a=";
                    return l[a][e] || (l[a][e] = m(a, n))
                }

                var l = {}, s = a._dec, o = a._hex, p = a._pad4;
                a.addToken(/\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/, function (a, e, r) {
                    var m = "P" === a[1] || !!a[2], s = r.indexOf("A") > -1, o = n(a[4] || a[3]), p = l[o];
                    if ("P" === a[1] && a[2]) throw new SyntaxError("Invalid double negation " + a[0]);
                    if (!l.hasOwnProperty(o)) throw new SyntaxError("Unknown Unicode token " + a[0]);
                    if (p.inverseOf) {
                        if (o = n(p.inverseOf), !l.hasOwnProperty(o)) throw new ReferenceError("Unicode token missing data " + a[0] + " -> " + p.inverseOf);
                        p = l[o], m = !m
                    }
                    if (!p.bmp && !s) throw new SyntaxError("Astral mode required for Unicode token " + a[0]);
                    if (s) {
                        if ("class" === e) throw new SyntaxError("Astral mode does not support Unicode tokens within character classes");
                        return i(o, m)
                    }
                    return "class" === e ? m ? t(o) : p.bmp : (m ? "[^" : "[") + p.bmp + "]"
                }, {scope: "all", optionalFlags: "A", leadChar: "\\"}), a.addUnicodeData = function (e) {
                    for (var r, t = 0; t < e.length; ++t) {
                        if (r = e[t], !r.name) throw new Error("Unicode token requires name");
                        if (!(r.inverseOf || r.bmp || r.astral)) throw new Error("Unicode token has no character data " + r.name);
                        l[n(r.name)] = r, r.alias && (l[n(r.alias)] = r)
                    }
                    a.cache.flush("patterns")
                }, a._getUnicodeProperty = function (a) {
                    var e = n(a);
                    return l[e]
                }
            }
        }, {}], 4: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";
                if (!a.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Blocks");
                a.addUnicodeData([{name: "InAdlam", astral: "锟絒锟�-锟絔"}, {
                    name: "InAegean_Numbers",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InAhom", astral: "锟絒锟�-锟絔"}, {
                    name: "InAlchemical_Symbols",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InAlphabetic_Presentation_Forms", bmp: "铿€-锃�"}, {
                    name: "InAnatolian_Hieroglyphs",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InAncient_Greek_Musical_Notation", astral: "锟絒锟�-锟絔"}, {
                    name: "InAncient_Greek_Numbers",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InAncient_Symbols", astral: "锟絒锟�-锟絔"}, {
                    name: "InArabic",
                    bmp: "貈-劭"
                }, {name: "InArabic_Extended_A", bmp: "啖�-啵�"}, {
                    name: "InArabic_Mathematical_Alphabetic_Symbols",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InArabic_Presentation_Forms_A", bmp: "锃�-锓�"}, {
                    name: "InArabic_Presentation_Forms_B",
                    bmp: "锕�-\ufeff"
                }, {name: "InArabic_Supplement", bmp: "輴-菘"}, {name: "InArmenian", bmp: "园-謴"}, {
                    name: "InArrows",
                    bmp: "鈫�-鈬�"
                }, {name: "InAvestan", astral: "锟絒锟�-锟絔"}, {name: "InBalinese", bmp: "岈€-岘�"}, {
                    name: "InBamum",
                    bmp: "隁�-隂�"
                }, {name: "InBamum_Supplement", astral: "锟絒锟�-锟絔"}, {
                    name: "InBasic_Latin",
                    bmp: "\0-"
                }, {name: "InBassa_Vah", astral: "锟絒锟�-锟絔"}, {name: "InBatak", bmp: "岑€-岑�"}, {
                    name: "InBengali",
                    bmp: "唳€-唰�"
                }, {name: "InBhaiksuki", astral: "锟絒锟�-锟絔"}, {
                    name: "InBlock_Elements",
                    bmp: "鈻€-鈻�"
                }, {name: "InBopomofo", bmp: "銊€-銊�"}, {
                    name: "InBopomofo_Extended",
                    bmp: "銌�-銌�"
                }, {name: "InBox_Drawing", bmp: "鈹€-鈺�"}, {
                    name: "InBrahmi",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InBraille_Patterns", bmp: "鉅€-猓�"}, {name: "InBuginese", bmp: "屺€-屺�"}, {
                    name: "InBuhid",
                    bmp: "釢€-釢�"
                }, {name: "InByzantine_Musical_Symbols", astral: "锟絒锟�-锟絔"}, {
                    name: "InCJK_Compatibility",
                    bmp: "銓€-銖�"
                }, {name: "InCJK_Compatibility_Forms", bmp: "锔�-锕�"}, {
                    name: "InCJK_Compatibility_Ideographs",
                    bmp: "铯€-铽�"
                }, {
                    name: "InCJK_Compatibility_Ideographs_Supplement",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InCJK_Radicals_Supplement", bmp: "夂€-饣�"}, {
                    name: "InCJK_Strokes",
                    bmp: "銍€-銍�"
                }, {name: "InCJK_Symbols_and_Punctuation", bmp: "銆€-銆�"}, {
                    name: "InCJK_Unified_Ideographs",
                    bmp: "涓€-榭�"
                }, {
                    name: "InCJK_Unified_Ideographs_Extension_A",
                    bmp: "銗€-涠�"
                }, {
                    name: "InCJK_Unified_Ideographs_Extension_B",
                    astral: "[锟�-锟絔[锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "InCJK_Unified_Ideographs_Extension_C",
                    astral: "锟絒锟�-锟絔|[锟�-锟絔[锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "InCJK_Unified_Ideographs_Extension_D",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "InCJK_Unified_Ideographs_Extension_E",
                    astral: "锟絒锟�-锟絔|[锟�-锟絔[锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "InCarian", astral: "锟絒锟�-锟絔"}, {
                    name: "InCaucasian_Albanian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InChakma", astral: "锟絒锟�-锟絔"}, {name: "InCham", bmp: "戗€-戛�"}, {
                    name: "InCherokee",
                    bmp: "釒�-釓�"
                }, {name: "InCherokee_Supplement", bmp: "戥�-戤�"}, {
                    name: "InCombining_Diacritical_Marks",
                    bmp: "虁-童"
                }, {
                    name: "InCombining_Diacritical_Marks_Extended",
                    bmp: "岐�-岖�"
                }, {
                    name: "InCombining_Diacritical_Marks_Supplement",
                    bmp: "岱€-岱�"
                }, {name: "InCombining_Diacritical_Marks_for_Symbols", bmp: "鈨�-鈨�"}, {
                    name: "InCombining_Half_Marks",
                    bmp: "锔�-锔�"
                }, {name: "InCommon_Indic_Number_Forms", bmp: "隊�-隊�"}, {
                    name: "InControl_Pictures",
                    bmp: "鈵€-鈵�"
                }, {name: "InCoptic", bmp: "獠€-獬�"}, {
                    name: "InCoptic_Epact_Numbers",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InCounting_Rod_Numerals", astral: "锟絒锟�-锟絔"}, {
                    name: "InCuneiform",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InCuneiform_Numbers_and_Punctuation", astral: "锟絒锟�-锟絔"}, {
                    name: "InCurrency_Symbols",
                    bmp: "鈧�-鈨�"
                }, {name: "InCypriot_Syllabary", astral: "锟絒锟�-锟絔"}, {
                    name: "InCyrillic",
                    bmp: "衻-涌"
                }, {name: "InCyrillic_Extended_A", bmp: "夥�-夥�"}, {
                    name: "InCyrillic_Extended_B",
                    bmp: "隀€-隁�"
                }, {name: "InCyrillic_Extended_C", bmp: "岵€-岵�"}, {
                    name: "InCyrillic_Supplement",
                    bmp: "詟-辕"
                }, {name: "InDeseret", astral: "锟絒锟�-锟絔"}, {
                    name: "InDevanagari",
                    bmp: "啶€-啷�"
                }, {name: "InDevanagari_Extended", bmp: "辏�-辏�"}, {
                    name: "InDingbats",
                    bmp: "鉁€-鉃�"
                }, {name: "InDomino_Tiles", astral: "锟絒锟�-锟絔"}, {
                    name: "InDuployan",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InEarly_Dynastic_Cuneiform", astral: "锟絒锟�-锟絔"}, {
                    name: "InEgyptian_Hieroglyphs",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "InElbasan", astral: "锟絒锟�-锟絔"}, {
                    name: "InEmoticons",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InEnclosed_Alphanumeric_Supplement", astral: "锟絒锟�-锟絔"}, {
                    name: "InEnclosed_Alphanumerics",
                    bmp: "鈶�-鈸�"
                }, {
                    name: "InEnclosed_CJK_Letters_and_Months",
                    bmp: "銏€-銒�"
                }, {name: "InEnclosed_Ideographic_Supplement", astral: "锟絒锟�-锟絔"}, {
                    name: "InEthiopic",
                    bmp: "釄€-釐�"
                }, {name: "InEthiopic_Extended", bmp: "舛€-夥�"}, {
                    name: "InEthiopic_Extended_A",
                    bmp: "戡€-戡�"
                }, {name: "InEthiopic_Supplement", bmp: "釒€-釒�"}, {
                    name: "InGeneral_Punctuation",
                    bmp: "鈥€-鈦�"
                }, {name: "InGeometric_Shapes", bmp: "鈻�-鈼�"}, {
                    name: "InGeometric_Shapes_Extended",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InGeorgian", bmp: "醾�-醿�"}, {
                    name: "InGeorgian_Supplement",
                    bmp: "獯€-獯�"
                }, {name: "InGlagolitic", bmp: "獍€-獗�"}, {
                    name: "InGlagolitic_Supplement",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InGothic", astral: "锟絒锟�-锟絔"}, {
                    name: "InGrantha",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InGreek_Extended", bmp: "峒€-峥�"}, {
                    name: "InGreek_and_Coptic",
                    bmp: "桶-峡"
                }, {name: "InGujarati", bmp: "嗒€-喃�"}, {
                    name: "InGurmukhi",
                    bmp: "啜€-喋�"
                }, {name: "InHalfwidth_and_Fullwidth_Forms", bmp: "锛€-锟�"}, {
                    name: "InHangul_Compatibility_Jamo",
                    bmp: "銊�-銌�"
                }, {name: "InHangul_Jamo", bmp: "釀€-釃�"}, {
                    name: "InHangul_Jamo_Extended_A",
                    bmp: "辚�-辚�"
                }, {name: "InHangul_Jamo_Extended_B", bmp: "頌�-頍�"}, {
                    name: "InHangul_Syllables",
                    bmp: "臧€-頌�"
                }, {name: "InHanunoo", bmp: "釡�-釡�"}, {name: "InHatran", astral: "锟絒锟�-锟絔"}, {
                    name: "InHebrew",
                    bmp: "謵-卓"
                }, {name: "InHigh_Private_Use_Surrogates", bmp: "锟�-锟�"}, {
                    name: "InHigh_Surrogates",
                    bmp: "锟�-锟�"
                }, {name: "InHiragana", bmp: "銇€-銈�"}, {
                    name: "InIPA_Extensions",
                    bmp: "蓯-石"
                }, {
                    name: "InIdeographic_Description_Characters",
                    bmp: "饪�-饪�"
                }, {name: "InIdeographic_Symbols_and_Punctuation", astral: "锟絒锟�-锟絔"}, {
                    name: "InImperial_Aramaic",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InInscriptional_Pahlavi", astral: "锟絒锟�-锟絔"}, {
                    name: "InInscriptional_Parthian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InJavanese", bmp: "軎€-戋�"}, {
                    name: "InKaithi",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InKana_Supplement", astral: "锟絒锟�-锟絔"}, {
                    name: "InKanbun",
                    bmp: "銌�-銌�"
                }, {name: "InKangxi_Radicals", bmp: "饧€-饪�"}, {name: "InKannada", bmp: "嗖€-喑�"}, {
                    name: "InKatakana",
                    bmp: "銈�-銉�"
                }, {name: "InKatakana_Phonetic_Extensions", bmp: "銍�-銍�"}, {
                    name: "InKayah_Li",
                    bmp: "辘€-辘�"
                }, {name: "InKharoshthi", astral: "锟絒锟�-锟絔"}, {name: "InKhmer", bmp: "釣€-釤�"}, {
                    name: "InKhmer_Symbols",
                    bmp: "岌�-岌�"
                }, {name: "InKhojki", astral: "锟絒锟�-锟絔"}, {name: "InKhudawadi", astral: "锟絒锟�-锟絔"}, {
                    name: "InLao",
                    bmp: "嗪€-嗷�"
                }, {name: "InLatin_Extended_Additional", bmp: "岣€-峄�"}, {
                    name: "InLatin_Extended_A",
                    bmp: "膧-趴"
                }, {name: "InLatin_Extended_B", bmp: "苺-蓮"}, {
                    name: "InLatin_Extended_C",
                    bmp: "獗�-獗�"
                }, {name: "InLatin_Extended_D", bmp: "隃�-隉�"}, {
                    name: "InLatin_Extended_E",
                    bmp: "戡�-戥�"
                }, {name: "InLatin_1_Supplement", bmp: "聙-每"}, {
                    name: "InLepcha",
                    bmp: "岚€-岜�"
                }, {name: "InLetterlike_Symbols", bmp: "鈩€-鈪�"}, {name: "InLimbu", bmp: "幛€-幞�"}, {
                    name: "InLinear_A",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InLinear_B_Ideograms", astral: "锟絒锟�-锟絔"}, {
                    name: "InLinear_B_Syllabary",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InLisu", bmp: "険�-険�"}, {name: "InLow_Surrogates", bmp: "锟�-锟�"}, {
                    name: "InLycian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InLydian", astral: "锟絒锟�-锟絔"}, {
                    name: "InMahajani",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InMahjong_Tiles", astral: "锟絒锟�-锟絔"}, {
                    name: "InMalayalam",
                    bmp: "啻€-嗟�"
                }, {name: "InMandaic", bmp: "唷€-唷�"}, {name: "InManichaean", astral: "锟絒锟�-锟絔"}, {
                    name: "InMarchen",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InMathematical_Alphanumeric_Symbols", astral: "锟絒锟�-锟絔"}, {
                    name: "InMathematical_Operators",
                    bmp: "鈭€-鈰�"
                }, {name: "InMeetei_Mayek", bmp: "戬€-戬�"}, {
                    name: "InMeetei_Mayek_Extensions",
                    bmp: "戢�-戢�"
                }, {name: "InMende_Kikakui", astral: "锟絒锟�-锟絔"}, {
                    name: "InMeroitic_Cursive",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InMeroitic_Hieroglyphs", astral: "锟絒锟�-锟絔"}, {
                    name: "InMiao",
                    astral: "锟絒锟�-锟絔"
                }, {
                    name: "InMiscellaneous_Mathematical_Symbols_A",
                    bmp: "鉄€-鉄�"
                }, {name: "InMiscellaneous_Mathematical_Symbols_B", bmp: "猞€-猝�"}, {
                    name: "InMiscellaneous_Symbols",
                    bmp: "鈽€-鉀�"
                }, {
                    name: "InMiscellaneous_Symbols_and_Arrows",
                    bmp: "猬€-獐�"
                }, {
                    name: "InMiscellaneous_Symbols_and_Pictographs",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "InMiscellaneous_Technical", bmp: "鈱€-鈴�"}, {
                    name: "InModi",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InModifier_Tone_Letters", bmp: "隃€-隃�"}, {
                    name: "InMongolian",
                    bmp: "釥€-幄�"
                }, {name: "InMongolian_Supplement", astral: "锟絒锟�-锟絔"}, {
                    name: "InMro",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InMultani", astral: "锟絒锟�-锟絔"}, {
                    name: "InMusical_Symbols",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InMyanmar", bmp: "醼€-醾�"}, {
                    name: "InMyanmar_Extended_A",
                    bmp: "戛�-戛�"
                }, {name: "InMyanmar_Extended_B", bmp: "戋�-戋�"}, {name: "InNKo", bmp: "還-呖"}, {
                    name: "InNabataean",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InNew_Tai_Lue", bmp: "幡€-岌�"}, {name: "InNewa", astral: "锟絒锟�-锟絔"}, {
                    name: "InNumber_Forms",
                    bmp: "鈪�-鈫�"
                }, {name: "InOgham", bmp: "釟€-釟�"}, {name: "InOl_Chiki", bmp: "岜�-岜�"}, {
                    name: "InOld_Hungarian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InOld_Italic", astral: "锟絒锟�-锟絔"}, {
                    name: "InOld_North_Arabian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InOld_Permic", astral: "锟絒锟�-锟絔"}, {
                    name: "InOld_Persian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InOld_South_Arabian", astral: "锟絒锟�-锟絔"}, {
                    name: "InOld_Turkic",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InOptical_Character_Recognition", bmp: "鈶€-鈶�"}, {
                    name: "InOriya",
                    bmp: "喱€-喹�"
                }, {name: "InOrnamental_Dingbats", astral: "锟絒锟�-锟絔"}, {
                    name: "InOsage",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InOsmanya", astral: "锟絒锟�-锟絔"}, {
                    name: "InPahawh_Hmong",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InPalmyrene", astral: "锟絒锟�-锟絔"}, {
                    name: "InPau_Cin_Hau",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InPhags_pa", bmp: "辍€-辍�"}, {
                    name: "InPhaistos_Disc",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InPhoenician", astral: "锟絒锟�-锟絔"}, {
                    name: "InPhonetic_Extensions",
                    bmp: "岽€-岬�"
                }, {name: "InPhonetic_Extensions_Supplement", bmp: "岫€-岫�"}, {
                    name: "InPlaying_Cards",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InPrivate_Use_Area", bmp: "顎€-铮�"}, {
                    name: "InPsalter_Pahlavi",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InRejang", bmp: "辘�-辚�"}, {
                    name: "InRumi_Numeral_Symbols",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InRunic", bmp: "釟�-釠�"}, {name: "InSamaritan", bmp: "酄€-酄�"}, {
                    name: "InSaurashtra",
                    bmp: "辎€-辏�"
                }, {name: "InSharada", astral: "锟絒锟�-锟絔"}, {
                    name: "InShavian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InShorthand_Format_Controls", astral: "锟絒锟�-锟絔"}, {
                    name: "InSiddham",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InSinhala", bmp: "喽€-喾�"}, {
                    name: "InSinhala_Archaic_Numbers",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InSmall_Form_Variants", bmp: "锕�-锕�"}, {
                    name: "InSora_Sompeng",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InSpacing_Modifier_Letters", bmp: "拾-丝"}, {
                    name: "InSpecials",
                    bmp: "锟�-锟�"
                }, {name: "InSundanese", bmp: "岙€-岙�"}, {
                    name: "InSundanese_Supplement",
                    bmp: "岢€-岢�"
                }, {name: "InSuperscripts_and_Subscripts", bmp: "鈦�-鈧�"}, {
                    name: "InSupplemental_Arrows_A",
                    bmp: "鉄�-鉄�"
                }, {name: "InSupplemental_Arrows_B", bmp: "猡€-猊�"}, {
                    name: "InSupplemental_Arrows_C",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InSupplemental_Mathematical_Operators", bmp: "猕€-猥�"}, {
                    name: "InSupplemental_Punctuation",
                    bmp: "飧€-夤�"
                }, {
                    name: "InSupplemental_Symbols_and_Pictographs",
                    astral: "锟絒锟�-锟絔"
                }, {
                    name: "InSupplementary_Private_Use_Area_A",
                    astral: "[锟�-锟絔[锟�-锟絔"
                }, {name: "InSupplementary_Private_Use_Area_B", astral: "[锟�-锟絔[锟�-锟絔"}, {
                    name: "InSutton_SignWriting",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InSyloti_Nagri", bmp: "隊€-隊�"}, {name: "InSyriac", bmp: "軃-輳"}, {
                    name: "InTagalog",
                    bmp: "釡€-釡�"
                }, {name: "InTagbanwa", bmp: "釢�-釢�"}, {name: "InTags", astral: "锟絒锟�-锟絔"}, {
                    name: "InTai_Le",
                    bmp: "幞�-幞�"
                }, {name: "InTai_Tham", bmp: "屺�-岐�"}, {
                    name: "InTai_Viet",
                    bmp: "戟€-戢�"
                }, {name: "InTai_Xuan_Jing_Symbols", astral: "锟絒锟�-锟絔"}, {
                    name: "InTakri",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InTamil", bmp: "喈€-喁�"}, {
                    name: "InTangut",
                    astral: "[锟�-锟絔[锟�-锟絔"
                }, {name: "InTangut_Components", astral: "锟絒锟�-锟絔"}, {
                    name: "InTelugu",
                    bmp: "喟€-啾�"
                }, {name: "InThaana", bmp: "迉-蘅"}, {name: "InThai", bmp: "喔€-喙�"}, {
                    name: "InTibetan",
                    bmp: "嗉€-嗫�"
                }, {name: "InTifinagh", bmp: "獯�-獾�"}, {
                    name: "InTirhuta",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InTransport_and_Map_Symbols", astral: "锟絒锟�-锟絔"}, {
                    name: "InUgaritic",
                    astral: "锟絒锟�-锟絔"
                }, {
                    name: "InUnified_Canadian_Aboriginal_Syllabics",
                    bmp: "釔€-釞�"
                }, {name: "InUnified_Canadian_Aboriginal_Syllabics_Extended", bmp: "幄�-幔�"}, {
                    name: "InVai",
                    bmp: "陻€-陿�"
                }, {name: "InVariation_Selectors", bmp: "锔€-锔�"}, {
                    name: "InVariation_Selectors_Supplement",
                    astral: "锟絒锟�-锟絔"
                }, {name: "InVedic_Extensions", bmp: "岢�-岢�"}, {
                    name: "InVertical_Forms",
                    bmp: "锔�-锔�"
                }, {name: "InWarang_Citi", astral: "锟絒锟�-锟絔"}, {
                    name: "InYi_Radicals",
                    bmp: "陹�-険�"
                }, {name: "InYi_Syllables", bmp: "陘€-陹�"}, {name: "InYijing_Hexagram_Symbols", bmp: "浞€-浞�"}])
            }
        }, {}], 5: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";
                if (!a.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Categories");
                a.addUnicodeData([{
                    name: "C",
                    alias: "Other",
                    isBmpLast: !0,
                    bmp: "\0--聼颅透凸蝷-蝺螊螎微园諚諛諣謭謰謱謵讏-讖撰-庄椎-貐販貪蹪軒軓輯輰薏-蘅呋-呖酄牤酄苦唷澿-啖熰⒌啖�-啵撪＂唳勦唳庎唳掄Ι唳编Τ-唳掂唳秽唰嗋唰娻-唰栢-唰涏唰むД唰�-啜€啜勦▼-啜庎☉啜掄ī啜编ù啜粪ê啜秽ń喋�-喋嗋喋娻-喋愢-喋樴喋�-喋ム┒-嗒€嗒勦獛嗒掄嗒编嗒亨喃嗋珚喃庎珡喃�-喃熰喃ム-喃膏-喱€喱勦瑣喱庎瑧喱掄喱编喱亨喹呧瓎喹夃瓓喹�-喹曕瓨-喹涏瓰喹む喹�-喈佮畡喈�-喈嵿畱喈�-喈樴疀喈澿疇-喈⑧-喈о-喈-喈洁瘍-喁呧瘔喁庎瘡喁�-喁栢瘶-喁ム-喁苦皠喟嵿皯喟┼昂-喟监眳啾夃睅-啾斷睏啾�-啾熰堡啾ム卑-啾粪矂嗖嵿矐嗖┼泊嗖亨不喑呧硥喑�-喑斷硹-喑澿碂喑む偿喑班吵-啻€啻勦磵啻戉椿啻监祬嗟夃祼-嗟撪丹嗟ム秬喽佮秳喽�-喽權恫喽监毒喽苦穱-喾夃穻-喾庎窌喾椸窢-喾ム钒喾编返-喔€喔�-喔距箿-嗪€嗪冟簠嗪嗋簤嗪嬥簩嗪�-嗪撪簶嗪犩氦嗪︵酣嗪┼含嗪亨壕嗪苦粎嗷囙粠嗷忇粴嗷涏粻-嗷苦綀嘟�-嘟班緲嗑洁繊嗫�-嗫酷儐醿�-醿屷儙醿忈墘釅庒墢釅椺墮釅炨墴釆夅妿釆忈姳釆夺姺釆酷媮釈嗎媷釈椺寫釋栣寳釐涐崪釐�-釐酷帤-釒熱彾釓丰従釓酷殱-釟熱浌-釠酷湇釡�-釡熱湻-釡酷潝-釢熱澀釢贬澊-釢酷煘釤熱煪-釤熀-釤酷爭釥忈牃-釥熱「-帷酷-幄６-幔酷幛�-幛ぜ-幛酷-幞冡ギ幞サ-幞酷Μ-幡-岌忈-岌濁屺濁岍结┚岐�-岐忈獨-岐熱岐-岖酷瓕-岘忈-岘酷-岑会案-岚横眾-岜屷矇-岵酷硤-岢忈撤岢�-岢酷范-岱横紪峒椺紴峒熱絾峤囜綆峤忈綐峤氠綔峤炨骄峤酷镜峥呩繑峥曖繙峥搬勘峥滇靠鈥�-鈥忊€�-鈥仩-鈦伈鈦斥倧鈧�-鈧熲偪-鈨忊儽-鈨库唽-鈫忊徔鈵�-鈵库憢-鈶熲猸碘畺猱椻-猱尖瘔獐�-獐-獐库隘獗熲炒-獬糕处獯�-獯串獯胆-獾当-獾锯稐-舛熲锭舛斗舛库穱夥忊窏夥熲箙-夤库簹饣�-饣库繓-饪考-饪裤亐銈椼倶銊€-銊勩劗-銊般啅銌�-銌裤嚖-銍垷銒夸抖-涠块繓-榭筷拲-陹応搰-険応槵-陿筷浉-隂筷灟隇�-隉蛾牞-隊牶-隊筷「-辍筷-辏嶊-辏熽＞辏筷-辚炾ソ-辚筷戋�-戋濌Э戗�-戗筷戛応戛涥珒-戢氷-戡€戡囮瑘戡応瑦戡�-戡熽戡-戥戬-戬宽灓-頌焽-頍婍熂-铮匡┊铹珰-铽匡瑖-铿掞瑯-铿滐铿斤锃傦瓍锆�-锆掞祤-锏忥稅锒戯穲-锓肪锓匡笟-锔燂箵锕э宫-锕沟锘�-锛€锞�-锟侊繄锟夛繍锟戯繕锟欙繚-锟燂咖锟�-锟伙烤锟�",
                    astral: "锟絒锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷锟�-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷-锟斤拷-锟絔|[锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟斤拷]|锟絒锟�-锟斤拷锟�-锟絔|锟絒锟斤拷锟斤拷锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟絔"
                }, {name: "Cc", alias: "Control", bmp: "\0--聼"}, {
                    name: "Cf",
                    alias: "Format",
                    bmp: "颅貈-貐販蹪軓啵⑨爭鈥�-鈥忊€�-鈥仩-鈦も仸-鈦痋ufeff锟�-锟�",
                    astral: "饝偨|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷-锟絔"
                }, {
                    name: "Cn",
                    alias: "Unassigned",
                    bmp: "透凸蝷-蝺螊螎微园諚諛諣謭謰謱謵讏-讖撰-庄椎-卓貪軒輯輰薏-蘅呋-呖酄牤酄苦唷澿-啖熰⒌啖�-啵撪唳嵿唳戉唳┼Ρ唳�-唳掂唳秽唰嗋唰娻-唰栢-唰涏唰むД唰�-啜€啜勦▼-啜庎☉啜掄ī啜编ù啜粪ê啜秽ń喋�-喋嗋喋娻-喋愢-喋樴喋�-喋ム┒-嗒€嗒勦獛嗒掄嗒编嗒亨喃嗋珚喃庎珡喃�-喃熰喃ム-喃膏-喱€喱勦瑣喱庎瑧喱掄喱编喱亨喹呧瓎喹夃瓓喹�-喹曕瓨-喹涏瓰喹む喹�-喈佮畡喈�-喈嵿畱喈�-喈樴疀喈澿疇-喈⑧-喈о-喈-喈洁瘍-喁呧瘔喁庎瘡喁�-喁栢瘶-喁ム-喁苦皠喟嵿皯喟┼昂-喟监眳啾夃睅-啾斷睏啾�-啾熰堡啾ム卑-啾粪矂嗖嵿矐嗖┼泊嗖亨不喑呧硥喑�-喑斷硹-喑澿碂喑む偿喑班吵-啻€啻勦磵啻戉椿啻监祬嗟夃祼-嗟撪丹嗟ム秬喽佮秳喽�-喽權恫喽监毒喽苦穱-喾夃穻-喾庎窌喾椸窢-喾ム钒喾编返-喔€喔�-喔距箿-嗪€嗪冟簠嗪嗋簤嗪嬥簩嗪�-嗪撪簶嗪犩氦嗪︵酣嗪┼含嗪亨壕嗪苦粎嗷囙粠嗷忇粴嗷涏粻-嗷苦綀嘟�-嘟班緲嗑洁繊嗫�-嗫酷儐醿�-醿屷儙醿忈墘釅庒墢釅椺墮釅炨墴釆夅妿釆忈姳釆夺姺釆酷媮釈嗎媷釈椺寫釋栣寳釐涐崪釐�-釐酷帤-釒熱彾釓丰従釓酷殱-釟熱浌-釠酷湇釡�-釡熱湻-釡酷潝-釢熱澀釢贬澊-釢酷煘釤熱煪-釤熀-釤酷爮釥�-釥熱「-帷酷-幄６-幔酷幛�-幛ぜ-幛酷-幞冡ギ幞サ-幞酷Μ-幡-岌忈-岌濁屺濁岍结┚岐�-岐忈獨-岐熱岐-岖酷瓕-岘忈-岘酷-岑会案-岚横眾-岜屷矇-岵酷硤-岢忈撤岢�-岢酷范-岱横紪峒椺紴峒熱絾峤囜綆峤忈綐峤氠綔峤炨骄峤酷镜峥呩繑峥曖繙峥搬勘峥滇靠鈦モ伈鈦斥倧鈧�-鈧熲偪-鈨忊儽-鈨库唽-鈫忊徔鈵�-鈵库憢-鈶熲猸碘畺猱椻-猱尖瘔獐�-獐-獐库隘獗熲炒-獬糕处獯�-獯串獯胆-獾当-獾锯稐-舛熲锭舛斗舛库穱夥忊窏夥熲箙-夤库簹饣�-饣库繓-饪考-饪裤亐銈椼倶銊€-銊勩劗-銊般啅銌�-銌裤嚖-銍垷銒夸抖-涠块繓-榭筷拲-陹応搰-険応槵-陿筷浉-隂筷灟隇�-隉蛾牞-隊牶-隊筷「-辍筷-辏嶊-辏熽＞辏筷-辚炾ソ-辚筷戋�-戋濌Э戗�-戗筷戛応戛涥珒-戢氷-戡€戡囮瑘戡応瑦戡�-戡熽戡-戥戬-戬宽灓-頌焽-頍婍熂-頍匡┊铹珰-铽匡瑖-铿掞瑯-铿滐铿斤锃傦瓍锆�-锆掞祤-锏忥稅锒戯穲-锓肪锓匡笟-锔燂箵锕э宫-锕沟锘斤痪锛€锞�-锟侊繄锟夛繍锟戯繕锟欙繚-锟燂咖锟�-锟革烤锟�",
                    astral: "锟絒锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷锟�-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷-锟斤拷-锟絔|[锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟斤拷]|锟絒锟�-锟斤拷锟�-锟絔|锟絒锟斤拷锟斤拷锟斤拷-锟絔|锟絒锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷-锟斤拷-锟斤拷-锟絔|[锟斤拷][锟斤拷]"
                }, {
                    name: "Co",
                    alias: "Private_Use",
                    bmp: "顎€-铮�",
                    astral: "[锟�-锟斤拷-锟絔[锟�-锟絔|[锟斤拷][锟�-锟絔"
                }, {name: "Cs", alias: "Surrogate", bmp: "锟�-锟�"}, {
                    name: "L",
                    alias: "Letter",
                    bmp: "A-Za-z陋碌潞脌-脰脴-枚酶-藖藛-藨藸-摔爽水桶-痛投头秃-徒涂螁螆-螉螌螏-巍危-系戏-襾見-辕员-諙諜铡-謬讗-转装-撞貭-賷佼侬俦-蹞蹠邾郐郛郫酆-奂劭軔軖-墀輱-蕙薇邐-擢叽叩吆酄€-酄曕牃酄む牗唷€-唷樴-啖脆⒍-啖洁-啶灌そ啷愢-啷∴ケ-唳€唳�-唳屶唳愢-唳ㄠΚ-唳班Σ唳�-唳灌唰庎唰澿-唰∴О唰编▍-啜娻◤啜愢〒-啜ㄠí-啜班ú啜赤ǖ啜多ǜ啜灌-喋溹喋�-喋脆獏-嗒嵿獜-嗒戉獡-嗒ㄠ-嗒班嗒赤-嗒灌喃愢珷喃∴喱�-喱屶瑥喱愢瑩-喱ㄠ-喱班喱赤-喱灌喹溹瓭喹�-喹∴喈冟畢-喈娻畮-喈愢畳-喈曕畽喈氞疁喈炧疅喈｀喈�-喈-喈灌瘣喟�-喟屶皫-喟愢皰-喟ㄠ蔼-喟灌敖啾�-啾氞睜啾∴瞼嗖�-嗖屶矌-嗖愢矑-嗖ㄠ勃-嗖赤驳-嗖灌步喑炧碃喑∴潮喑侧磪-啻屶磶-啻愢磼-啻亨唇嗟庎禂-嗟栢禑-嗟∴岛-嗟苦秴-喽栢稓-喽编冻-喽秽督喾€-喾嗋竵-喔班覆喔赤箑-喙嗋簛嗪傕簞嗪囙簣嗪娻簫嗪�-嗪椸簷-嗪熰骸-嗪｀亥嗪о邯嗪涵-嗪班翰嗪赤航嗷€-嗷勦粏嗷�-嗷熰紑嘟€-嘟囙綁-嘟緢-嗑屷€€-醼€酷亹-醽曖仛-醽濁仭醽メ仸醽�-醽搬伒-醾佱値醾�-醿呩儑醿嶀儛-醿横兗-釅堘墛-釅嶀墣-釅栣墭釅�-釅濁墵-釆堘妸-釆嶀姁-釆搬姴-釆滇姼-釆踞媭釈�-釈呩媹-釈栣嫎-釋愥寬-釋曖寴-釐氠巰-釒忈帬-釓滇徃-釓结悂-釞櫙-釞酷殎-釟氠殸-釠洷-釠羔渶-釡屷湈-釡戓湢-釡贬潃-釢戓潬-釢澁-釢搬瀫-釣翅煑釤溼牋-帷丰-幄勧-幄ㄡⅹ幄�-幔滇-幛炨-幞グ-幞瘁-幡Π-岌夅█-屺栣-岍斸岈�-岈翅瓍-岘嬦畠-岙犪岙-岑メ皜-岚ａ睄-岜忈睔-岜结瞼-岵堘畅-岢钞-岢贬车岢夺磤-岫酷竴-峒曖紭-峒濁紶-峤呩綀-峤嶀綈-峤椺綑峤涐綕峤�-峤结線-峋瘁径-峋坚揪峥�-峥勧繂-峥屷繍-峥撫繓-峥涐繝-峥坎-峥瘁慷-峥尖伇鈦库倫-鈧溾剛鈩団剨-鈩撯剷鈩�-鈩濃劋鈩︹劏鈩�-鈩劘-鈩光劶-鈩库厖-鈪夆厧鈫冣唲獍€-獍鞍-獗炩睜-獬も倡-獬巢獬斥磤-獯モ揣獯窗-獾р弹舛€-舛栤稜-舛︹定-舛栋-舛垛陡-舛锯穩-夥嗏穲-夥庘窅-夥栤窐-夥炩腐銆呫€嗐€�-銆点€汇€笺亖-銈栥倽-銈熴偂-銉恒兗-銉裤剠-銊劚-銌庛啝-銌恒嚢-銍裤悁-涠典竴-榭曣€€-陹岅搻-険疥攢-陿岅槓-陿熽槳陿檧-隀櫩-隁濌殸-隂リ湕-隃熽湤-隇堦瀷-隇灠-隇逢煼-隊侁爟-隊呹爣-隊婈爩-隊㈥-辍酬-辎酬２-辏逢；辏疥-辘リぐ-辚嗞-辚缄-軎碴戋�-戋りЕ-戋Ш-戋娟█-戗﹢-戛傟﹦-戛嬯-戛蛾┖戛�-戟戟店戟�-戟疥珋戢傟珱-戢濌珷-戢-戢搓瑏-戡嗞瑝-戡庩瑧-戡栮瑺-戡﹃-戡-戥氷瓬-戥リ-戬㈥皜-頌ｍ灠-頍嗧煁-頍伙-铹┌-铽欙瑎-铿嗭瑩-铿楋瑵铿�-铿-铿讹-铿硷锃€锃侊瓋锃勶瓎-锂憋瘬-锎斤祼-锒忥稈-锓囷钒-锓伙拱-锕达苟-锘硷肌-锛猴絹-锝氾溅-锞撅總-锟囷繆-锟忥繏-锟楋繗-锟�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|[锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "Ll",
                    alias: "Lowercase_Letter",
                    bmp: "a-z碌脽-枚酶-每膩膬膮膰膲膵膷膹膽膿臅臈臋臎臐臒摹模磨魔末墨沫寞谋某牡姆母暮募木艀艂艅艈艌艍艐艒艔艖艙艜艞艡艣艥艧拧牛钮脓农奴怒暖疟懦诺欧藕偶啪-苺苾茀茍茖茘茠茣茩-茮茷啤疲匹屁篇偏骗瓢拼贫乒坪平-瓶菃菈菍菐菒菕菙菛菢菤菧菨菬恰牵钎千签谦黔钳前浅堑枪腔墙强葋葍葏葒葔葖葝葟葢葥葧葪葯葲葷葻取龋去颧醛全拳券缺瘸-裙燃瓤蓘蓚蓢蓧蓩蓫蓮-蕮蕰-石捅统头突-徒螑维-蠋蠍蠎蠒-蠗蠙蠜蠞蠠稀希膝惜烯汐檄席-铣系细匣霞邪-褵选眩靴学雪勋循询驯殉训逊压鸦呀芽襾覌覎覐覒覔視覘覚覜覞覠摇遥谣咬药耀噎爷冶页业曳夜一医铱觽觿訂訄訆訉訋訌討訐訒訔訖記訚訜印樱鹰缨萤荧迎盈颖映拥臃庸踊咏涌詠詢詤試詨詪詬詮詰該詴詶詸詻詽詿浴裕豫鸳冤垣原辕铡-謬釓�-釓结瞼-岵堘磤-岽但-岬丰倒-岫氠竵岣冡竻岣囜笁岣嬦笉岣忈笐岣撫笗岣椺笝岣涐笣岣熱浮岣ａ弗岣п俯岣腑岣副岣翅傅岣丰腹岣会附岣酷箒峁冡箙峁囜箟峁嬦箥峁忈箲峁撫箷峁椺箼峁涐節峁熱埂峁ａ攻峁п供峁弓峁贡峁翅沟峁丰构峁会菇峁酷簛岷冡簠岷囜簤岷嬦簫岷忈簯岷撫簳-岷濁簾岷♂海岷メ骇岷┽韩岷函岷贬撼岷滇悍岷贯夯岷结嚎峄佱粌峄呩粐峄夅粙峄嶀粡峄戓粨峄曖粭峄欋粵峄濁粺峄♂唬峄メ户峄┽猾峄化峄贬怀峄滇环峄贯换峄结豢-峒囜紣-峒曖紶-峒п及-峒丰絸-峤呩綈-峤椺綘-峤п桨-峤结線-峋囜緪-峋椺緺-峋п景-峋瘁径峋丰揪峥�-峥勧繂峥囜繍-峥撫繓峥椺繝-峥п坎-峥瘁慷峥封剨鈩庘剰鈩撯劘鈩粹劰鈩尖劷鈪�-鈪夆厧鈫勨鞍-獗炩薄獗モ宝獗ㄢ豹獗北獗斥贝獗�-獗烩瞾獠冣矃獠団矇獠嬧矋獠忊矐獠撯矔獠椻矙獠涒矟獠熲病獠ｂ播獠р博獠箔獠脖獠斥驳獠封补獠烩步獠库硜獬冣硡獬団硥獬嬧硩獬忊硲獬撯硶獬椻硻獬涒碀獬熲场獬ｂ长獬钞獬斥磤-獯モ揣獯檨隀冴檯隀囮檳隀嬯檷隀応檻隀撽檿隀楆櫃隀涥櫇隀熽櫋隀ｊ櫏隀ш櫓隀櫗隁侁殐隁呹殗隁夑殝隁嶊殢隁戧殦隁曣殫隁欔殯隃ｊ湧隃ш湬隃湱隃�-隃标湷隃店湻隃龟溁隃疥溈隄侁潈隄呹潎隄夑潒隄嶊潖隄戧潛隄曣潡隄欔潧隄濌潫隄￡潱隄リ潷隄╆潾隄澂隄�-隄戈澓隄缄澘隇侁瀮隇呹瀲隇岅瀻隇戧灀-隇曣灄隇欔灈隇濌灍隇￡灒隇リ灖隇╆灥隇逢熀戡�-戥氷瓲-戥リ-戤匡瑎-铿嗭瑩-铿楋絹-锝�",
                    astral: "锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟絔"
                }, {
                    name: "Lm",
                    alias: "Modifier_Letter",
                    bmp: "拾-藖藛-藨藸-摔爽水痛秃諜賭邾郐叽叩吆酄氞牑酄ㄠケ喙嗋粏醿坚煑帷冡岜�-岜结船-岬蹈岫�-岫库伇鈦库倫-鈧溾奔獗解弹飧€呫€�-銆点€汇倽銈炪兗-銉娟€曣摳-険疥槍隀筷殰隁濌湕-隃熽澃隇堦煾隉龟戋﹃┌戢濌戢搓瓬-戥燂桨锞烇緹",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟斤拷]"
                }, {
                    name: "Lo",
                    alias: "Other_Letter",
                    bmp: "陋潞苹莯-莾蕯讗-转装-撞貭-乜賮-賷佼侬俦-蹞蹠郛郫酆-奂劭軔軖-墀輱-蕙薇邐-擢酄€-酄曕-唷樴-啖脆⒍-啖洁-啶灌そ啷愢-啷∴ゲ-唳€唳�-唳屶唳愢-唳ㄠΚ-唳班Σ唳�-唳灌唰庎唰澿-唰∴О唰编▍-啜娻◤啜愢〒-啜ㄠí-啜班ú啜赤ǖ啜多ǜ啜灌-喋溹喋�-喋脆獏-嗒嵿獜-嗒戉獡-嗒ㄠ-嗒班嗒赤-嗒灌喃愢珷喃∴喱�-喱屶瑥喱愢瑩-喱ㄠ-喱班喱赤-喱灌喹溹瓭喹�-喹∴喈冟畢-喈娻畮-喈愢畳-喈曕畽喈氞疁喈炧疅喈｀喈�-喈-喈灌瘣喟�-喟屶皫-喟愢皰-喟ㄠ蔼-喟灌敖啾�-啾氞睜啾∴瞼嗖�-嗖屶矌-嗖愢矑-嗖ㄠ勃-嗖赤驳-嗖灌步喑炧碃喑∴潮喑侧磪-啻屶磶-啻愢磼-啻亨唇嗟庎禂-嗟栢禑-嗟∴岛-嗟苦秴-喽栢稓-喽编冻-喽秽督喾€-喾嗋竵-喔班覆喔赤箑-喙呧簛嗪傕簞嗪囙簣嗪娻簫嗪�-嗪椸簷-嗪熰骸-嗪｀亥嗪о邯嗪涵-嗪班翰嗪赤航嗷€-嗷勦粶-嗷熰紑嘟€-嘟囙綁-嘟緢-嗑屷€€-醼€酷亹-醽曖仛-醽濁仭醽メ仸醽�-醽搬伒-醾佱値醿�-醿横兘-釅堘墛-釅嶀墣-釅栣墭釅�-釅濁墵-釆堘妸-釆嶀姁-釆搬姴-釆滇姼-釆踞媭釈�-釈呩媹-釈栣嫎-釋愥寬-釋曖寴-釐氠巰-釒忈悂-釞櫙-釞酷殎-釟氠殸-釠洷-釠羔渶-釡屷湈-釡戓湢-釡贬潃-釢戓潬-釢澁-釢搬瀫-釣翅煖釥�-帷傖-帷丰-幄勧-幄ㄡⅹ幄�-幔滇-幛炨-幞グ-幞瘁-幡Π-岌夅█-屺栣-岍斸瑓-岈翅瓍-岘嬦畠-岙犪岙-岑メ皜-岚ａ睄-岜忈睔-岜丰畅-岢钞-岢贬车岢垛劦-鈩糕窗-獾р秬-舛栤稜-舛︹定-舛栋-舛垛陡-舛锯穩-夥嗏穲-夥庘窅-夥栤窐-夥炪€嗐€笺亖-銈栥偀銈�-銉恒兛銊�-銊劚-銌庛啝-銌恒嚢-銍裤悁-涠典竴-榭曣€€-陘旉€�-陹岅搻-険逢攢-陿嬯槓-陿熽槳陿櫘隁�-隂リ瀼隉逢熁-隊侁爟-隊呹爣-隊婈爩-隊㈥-辍酬-辎酬２-辏逢；辏疥-辘リぐ-辚嗞-辚缄-軎碴-戋りЁ-戋Ш-戋娟█-戗﹢-戛傟﹦-戛嬯-戛┍-戛蛾┖戛�-戟戟店戟�-戟疥珋戢傟珱戢滉珷-戢戡�-戡嗞瑝-戡庩瑧-戡栮瑺-戡﹃-戡瘈-戬㈥皜-頌ｍ灠-頍嗧煁-頍伙-铹┌-铽欙瑵铿�-铿-铿讹-铿硷锃€锃侊瓋锃勶瓎-锂憋瘬-锎斤祼-锒忥稈-锓囷钒-锓伙拱-锕达苟-锘硷溅-锝奖-锞濓緺-锞撅總-锟囷繆-锟忥繏-锟楋繗-锟�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟絔|锟絒锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|[锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "Lt", alias: "Titlecase_Letter", bmp: "菂菆菋遣峋�-峋忈緲-峋熱鲸-峋炯峥屷考"}, {
                    name: "Lu",
                    alias: "Uppercase_Letter",
                    bmp: "A-Z脌-脰脴-脼膧膫膭膯膱膴膶膸膼膾臄臇臉臍臏臑臓蘑膜摩抹莫默漠陌牟拇亩墓幕慕目艁艃艆艊艎艑艓艕艗艛艝艠艢艤艦艩泞扭纽浓弄努女虐挪糯哦鸥殴呕沤苼苽苿茊茋茐-茓茙-茟茡茢茤-茦茰茲茻茽脾皮痞僻譬片飘漂票-瞥频品聘萍莿菄菉菎菑菓菗菚菞菣菦菫菭洽扦铅迁仟乾钱潜谴嵌-歉呛羌蔷葊葌葎葐葓葕葘葞葠葤葦葨葮葰葴葹葼娶趣圈权泉痊犬劝炔群然冉染蓙蓛-蓡蓤蓨蓪蓭桶筒投涂螁螆-螉螌螏螐螒-巍危-潍蠌蠏-蠑蠘蠚蠝蠟蠣息悉夕熄溪犀袭洗戏瞎虾辖-携褷癣绚薛穴血熏旬寻巡汛讯迅押鸭丫襽見覍規覑覓覕覗覙覛覝覟覡尧窑姚舀要椰耶野也掖叶腋液壹揖觻觼觾訁訃訅計訊訍訏訑訓訕託訙訛訝英婴应莹营蝇赢影硬哟佣痈雍蛹泳詟詡詣詥詧詩詫詭詯話詳詵詷詺詼詾誀寓预驭渊元袁援员-諙醾�-醿呩儑醿嶀帬-釓滇竴岣傖竸岣嗎笀岣娽笇岣庒笎岣掅笖岣栣笜岣氠笢岣炨笭岣⑨袱岣︶辅岣脯岣赴岣册复岣夺父岣横讣岣踞箑峁傖箘峁嗎箞峁娽箤峁庒箰峁掅箶峁栣箻峁氠箿峁炨範峁⑨工峁︶龚峁宫峁拱峁册勾峁夺垢峁横辜峁踞簚岷傖簞岷嗎簣岷娽簩岷庒簮岷掅簲岷炨籂岷⑨氦岷︶酣岷含岷喊岷册捍岷夺焊岷横杭岷踞粈峄傖粍峄嗎粓峄娽粚峄庒粣峄掅粩峄栣粯峄氠粶峄炨粻峄⑨护峄︶花峄滑峄话峄册淮峄夺桓峄横患峄踞紙-峒忈紭-峒濁绩-峒几-峒酷綀-峤嶀綑峤涐綕峤熱建-峤靖-峋会繄-峥嬦繕-峥涐卡-峥扛-峥烩剛鈩団剫-鈩嶁剱-鈩掆剷鈩�-鈩濃劋鈩︹劏鈩�-鈩劙-鈩斥劸鈩库厖鈫冣皜-獍睜獗�-獗も抱獗┾鲍獗�-獗扳辈獗碘本-獠€獠傗矂獠嗏矆獠娾矊獠庘矏獠掆矓獠栤矘獠氣矞獠炩矤獠⑩菠獠︹波獠铂獠舶獠测泊獠垛哺獠衡布獠锯硛獬傗硠獬嗏硤獬娾硨獬庘硱獬掆硵獬栤硺獬氣硿獬炩碃獬⑩倡獬巢隀€隀傟檮隀嗞檲隀婈檶隀庩檺隀掙檾隀栮櫂隀氷櫆隀炾櫊隀㈥櫎隀﹃櫒隀櫖隁€隁傟殑隁嗞殘隁婈殞隁庩殣隁掙殧隁栮殬隁氷湤隃り湨隃湭隃湲隃碴湸隃蛾湼隃宏溂隃娟潃隄傟潉隄嗞潏隄婈潓隄庩潗隄掙潝隄栮潣隄氷潨隄炾潬隄㈥潳隄﹃潹隄潿隄澒隄魂澖隄娟瀫隇傟瀯隇嗞瀷隇嶊瀽隇掙灃隇橁灇隇滉灋隇犼灑隇り灕隇灙-隇灠-隇搓灦锛�-锛�",
                    astral: "锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟絔"
                }, {
                    name: "M",
                    alias: "Mark",
                    bmp: "虁-童覂-覊謶-纸挚讈讉讋讌讎貝-貧賸-贌侔蹡-蹨蹮-郅郄郇郦-郗軕馨-輮蕈-薨攉-叱酄�-酄權牄-酄｀牓-酄о牘-酄-唷涏-啵∴＃-啶冟ず-啶监ぞ-啷忇-啷椸ア啷｀-唳冟唳�-唰勦唰堗-唰嵿唰⑧В啜�-啜冟啜�-喋傕﹪喋堗-喋嵿喋班┍喋掂獊-嗒冟嗒�-喃呧珖-喃夃珛-喃嵿喃｀瑏-喱冟喱�-喹勦瓏喹堗瓔-喹嵿瓥喹椸喹｀畟喈�-喁傕瘑-喁堗瘖-喁嵿瘲喟€-喟冟熬-啾勦眴-啾堗眾-啾嵿睍啾栢雹啾｀瞾-嗖冟布嗖�-喑勦硢-喑堗硦-喑嵿硶喑栢尝喑｀磥-啻冟淳-嗟勦祮-嗟堗祳-嗟嵿禇嗟⑧担喽傕秲喾娻窂-喾斷窎喾�-喾熰凡喾赤副喔�-喔亨箛-喙庎罕嗪�-嗪灌夯嗪监粓-嗷嵿紭嗉權嫉嗉粪脊嗉距伎嘟�-嗑勦締嗑囙緧-嗑椸緳-嗑监繂醼�-醼踞仏-醽欋仦-醽犪仮-醽め仹-醽伇-醽瘁倐-醾嶀倧醾�-醾濁崫-釐熱湌-釡斸湶-釡瘁潚釢撫澆釢翅灤-釤撫煗釥�-釥嶀幄嗎ⅸ幛�-幛ぐ-幛会-屺涐-岍炨-岍坚┛岐�-岐踞瑎-岈勧-岘勧-岘翅畝-岙傖-岙-岑翅挨-岚丰硱-岢掅硵-岢ㄡ抄岢�-岢瘁掣岢贯穩-岱滇坊-岱库儛-鈨扳朝-獬扁悼夥�-夥裤€�-銆倷銈氷櫙-隀碴櫞-隀疥殲隁熽洶隂标爞隊嗞爧隊�-隊ш辎侁⒋-辏呹　-辏标う-辘-辚撽-軎冴Τ-戋€戋リī-戗蛾﹥戛岅戛�-戛疥戟�-戟搓戟戈戟筷珌戢�-戢戢蛾-戬戬瑸锔€-锔忥笭-锔�",
                    astral: "锟絒锟斤拷锟�-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "Mc",
                    alias: "Spacing_Mark",
                    bmp: "啶冟せ啶�-啷€啷�-啷屶啷忇唳冟-唰€唰囙唰嬥唰椸▋啜�-喋€嗒冟-喃€喃夃珛喃屶瑐喱冟喹€喹囙瓐喹嬥瓕喹椸喈苦瘉喁傕瘑-喁堗瘖-喁屶瘲喟�-喟冟眮-啾勦矀嗖冟簿喑€-喑勦硣喑堗硦喑嬥硶喑栢磦啻冟淳-嗟€嗟�-嗟堗祳-嗟屶禇喽傕秲喾�-喾戉窐-喾熰凡喾赤季嗉苦娇醼€€贬€羔€会€坚仏醽椺仮-醽め仹-醽們醾勧倗-醾屷倧醾�-醾溼灦釣�-釤呩焽釤堘ぃ-幛︶ぉ-幛ぐ幛贬こ-幛羔屺氠岍椺岍ａ─岍�-岍册瑒岈滇岈�-岘佱瓋岘勧畟岙♂岙п岑п-岑岑册岚�-岚按岚滇场岢册吵銆€牐隊り牕辎€辎侁⒋-辏冴辚撽軎搓Φ軎宏軎�-戋€戗ò戗酬ù戛嶊┗戛疥戢戢店戬り戬ш戬",
                    astral: "锟絒锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷]|锟絒锟�-锟斤拷锟斤拷锟�-锟斤拷锟�-锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟絔|锟絒锟斤拷锟斤拷锟絔|锟絒锟�-锟絔|锟絒锟斤拷锟�-锟絔"
                }, {name: "Me", alias: "Enclosing_Mark", bmp: "覉覊岐锯儩-鈨犫儮-鈨り櫚-隀�"}, {
                    name: "Mn",
                    alias: "Nonspacing_Mark",
                    bmp: "虁-童覂-覈謶-纸挚讈讉讋讌讎貝-貧賸-贌侔蹡-蹨蹮-郅郄郇郦-郗軕馨-輮蕈-薨攉-叱酄�-酄權牄-酄｀牓-酄о牘-酄-唷涏-啵∴＃-啶傕ず啶监-啷堗啷�-啷椸ア啷｀唳监-唰勦唰⑧В啜佮▊啜监﹣喋傕﹪喋堗-喋嵿喋班┍喋掂獊嗒傕喃�-喃呧珖喃堗珝喃⑧喱佮喱苦瓉-喹勦瓖喹栢喹｀畟喁€喁嵿皜喟�-啾€啾�-啾堗眾-啾嵿睍啾栢雹啾｀瞾嗖监部喑嗋硨喑嵿尝喑｀磥嗟�-嗟勦祶嗟⑧担喾娻窉-喾斷窎喔编复-喔亨箛-喙庎罕嗪�-嗪灌夯嗪监粓-嗷嵿紭嗉權嫉嗉粪脊嘟�-嘟距線-嗑勦締嗑囙緧-嗑椸緳-嗑监繂醼�-醼搬€�-醼丰€贯€横€结€踞仒醽欋仦-醽犪伇-醽瘁倐醾呩倖醾嶀倽釐�-釐熱湌-釡斸湶-釡瘁潚釢撫澆釢翅灤釣滇灧-釣结焼釤�-釤撫煗釥�-釥嶀幄嗎ⅸ幛�-幛⑨ぇ幛ㄡげ幛�-幛会屺樶岍栣-岍炨岍⑨━-岍┏-岍坚┛岐�-岐结瑎-岈冡岈�-岈横岘傖-岘翅畝岙佱-岙メ岙┽-岙岑ㄡ岑-岑贬艾-岚翅岸岚丰硱-岢掅硵-岢犪尝-岢ㄡ抄岢瘁掣岢贯穩-岱滇坊-岱库儛-鈨溾儭鈨�-鈨扳朝-獬扁悼夥�-夥裤€�-銆倷銈氷櫙隀�-隀疥殲隁熽洶隂标爞隊嗞爧隊リ牔辏勱辏�-辏标う-辘-辚戧-軎傟Τ軎�-軎龟戋リī-戗ū戗碴ǖ戗蛾﹥戛岅┘戟瓣-戟搓戟戈戟筷珌戢戢蛾戬铿烇竴-锔忥笭-锔�",
                    astral: "锟絒锟斤拷锟�-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷]|锟絒锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟�-锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷锟�-锟斤拷锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "N",
                    alias: "Number",
                    bmp: "0-9虏鲁鹿录-戮贍-侃郯-酃還-邏啷�-啷Е-唰Т-唰灌│-喋-喃-喹-喹粪-喁侧宝-啾备-啾距肠-喑禈-嗟炧郸-嗟膏乏-喾箰-喙權粣-嗷權紶-嗉翅亐-醽夅倫-醾欋崺-釐坚洰-釠搬煚-釤┽煱-釤贯爯-釥欋-幞忈-岌氠獉-岐夅獝-岐欋瓙-岘欋-岙贯眬-岜夅睈-岜欌伆鈦�-鈦光個-鈧夆厫-鈫傗唴-鈫夆憼-鈷涒摢-鈸库澏-鉃撯辰銆囥€�-銆┿€�-銆恒啋-銌曘垹-銏┿増-銐忋墤-銐熴妧-銑夈姳-銑筷槧-陿╆洣-隂牥-隊店-辏欔-辘夑-戋欔О-戋龟-戛欔-戬癸紣-锛�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "Nd",
                    alias: "Decimal_Number",
                    bmp: "0-9贍-侃郯-酃還-邏啷�-啷Е-唰│-喋-喃-喹-喁宝-啾肠-喑郸-嗟乏-喾箰-喙權粣-嗷權紶-嗉┽亐-醽夅倫-醾欋煚-釤┽爯-釥欋-幞忈-岌欋獉-岐夅獝-岐欋瓙-岘欋-岙贯眬-岜夅睈-岜欔槧-陿╆-辏欔-辘夑-戋欔О-戋龟-戛欔-戬癸紣-锛�",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "Nl",
                    alias: "Letter_Number",
                    bmp: "釠�-釠扳厾-鈫傗唴-鈫堛€囥€�-銆┿€�-銆宏洣-隂�",
                    astral: "锟絒锟�-锟斤拷锟斤拷-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "No",
                    alias: "Other_Number",
                    bmp: "虏鲁鹿录-戮唰�-唰灌-喹粪-喁侧备-啾距禈-嗟炧蛋-嗟膏吉-嗉翅崺-釐坚煱-釤贯鈦扳伌-鈦光個-鈧夆厫-鈪熲唹鈶�-鈷涒摢-鈸库澏-鉃撯辰銌�-銌曘垹-銏┿増-銐忋墤-銐熴妧-銑夈姳-銑筷牥-隊�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "P",
                    alias: "Punctuation",
                    bmp: "!-#%-\\x2A,-/:;\\x3F@\\x5B-\\x5D_\\x7B}隆搂芦露路禄驴途螄諝-諢謮謯志讇變讍壮状貕貖貙貚貨貫責侏-侪蹟軃-軑叻-吖酄�-酄距啷むゥ啷班喾脆箯喙氞箾嗉�-嗉掄紨嗉�-嗉洁緟嗫�-嗫斷繖嗫氠亰-醽忈兓釐�-釐ㄡ悁釞櫘釟涐殰釠�-釠湹釡夺煍-釤栣煒-釤氠爛-釥娽幞呩屺熱獱-岐︶-岐瓪-岘犪-岑酷盎-岚酷本岜酷硛-岢囜硴鈥�-鈥р€�-鈦冣亝-鈦戔亾-鈦炩伣鈦锯倣鈧庘寛-鈱嬧尒鈱潹-鉂碘焻鉄嗏煢-鉄-猞樷-猝涒Ъ猝解彻-獬尖尘獬库蛋飧€-飧赴-夤勩€�-銆冦€�-銆戙€�-銆熴€般€姐偁銉魂摼険筷槏-陿応櫝隀娟洸-隂逢〈-辍逢辏応８-辏宏＜辘く辚熽-戋嶊戋熽-戛熽珵戢熽戢标锎撅纯锔�-锔欙赴-锕掞箶-锕★梗锕躬锕紒-锛冿紖-锛婏紝-锛忥細锛涳紵锛狅蓟-锛斤伎锝涳綕锝�-锝�",
                    astral: "锟絒锟�-锟斤拷锟絔|饜暞|锟絒锟斤拷锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟絔|锟絒锟�-锟絔|锟絒锟斤拷锟斤拷-锟斤拷]|饹矡|锟絒锟�-锟絔|锟絒锟斤拷]"
                }, {name: "Pc", alias: "Connector_Punctuation", bmp: "_鈥库亐鈦旓赋锔达箥-锕忥伎"}, {
                    name: "Pd",
                    alias: "Dash_Punctuation",
                    bmp: "\\x2D謯志釔€釥嗏€�-鈥曗笚飧氣负飧烩箑銆溿€般偁锔憋覆锕橈梗锛�"
                }, {
                    name: "Pe",
                    alias: "Close_Punctuation",
                    bmp: "\\x29\\x5D}嗉秽冀釟溾亞鈦锯値鈱夆寢鈱潻鉂澀鉂澅鉂斥澋鉄嗏煣鉄┾煫鉄煰猞勨猞堚猞屸猞愨猞斺猞樷猝涒Ы飧ｂ弗飧р俯銆夈€嬨€嶃€忋€戙€曘€椼€欍€涖€炪€燂淳锔橈付锔革负锔硷妇锕€锕傦箘锕堬箽锕滐篂锛夛冀锝濓綘锝�"
                }, {name: "Pf", alias: "Final_Punctuation", bmp: "禄鈥欌€濃€衡竷飧呪笂飧嶁笣飧�"}, {
                    name: "Pi",
                    alias: "Initial_Punctuation",
                    bmp: "芦鈥樷€涒€溾€熲€光競飧勨笁飧屸笢飧�"
                }, {
                    name: "Po",
                    alias: "Other_Punctuation",
                    bmp: "!-#%-'\\x2A,\\x2E/:;\\x3F@\\x5C隆搂露路驴途螄諝-諢謮讇變讍壮状貕貖貙貚貨貫責侏-侪蹟軃-軑叻-吖酄�-酄距啷むゥ啷班喾脆箯喙氞箾嗉�-嗉掄紨嗑呧繍-嗫斷繖嗫氠亰-醽忈兓釐�-釐ㄡ櫗釞洬-釠湹釡夺煍-釤栣煒-釤氠爛-釥呩爣-釥娽幞呩屺熱獱-岐︶-岐瓪-岘犪-岑酷盎-岚酷本岜酷硛-岢囜硴鈥栤€椻€�-鈥р€�-鈥糕€�-鈥锯亖-鈦冣亣-鈦戔亾鈦�-鈦炩彻-獬尖尘獬库蛋飧€飧佲竼-飧堚笅飧�-飧栤笜飧欌笡飧炩笩飧�-飧赴-飧光讣-飧库箒夤冣箘銆�-銆冦€姐兓険娟摽陿�-陿応櫝隀娟洸-隂逢〈-辍逢辏応８-辏宏＜辘く辚熽-戋嶊戋熽-戛熽珵戢熽戢标锔�-锔栵笝锔帮箙锕嗭箟-锕岋箰-锕掞箶-锕楋篃-锕★龚锕公锛�-锛冿紖-锛囷紛锛岋紟锛忥細锛涳紵锛狅技锝★饯锝�",
                    astral: "锟絒锟�-锟斤拷锟絔|饜暞|锟絒锟斤拷锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟絔|锟絒锟�-锟絔|锟絒锟斤拷锟斤拷-锟斤拷]|饹矡|锟絒锟�-锟絔|锟絒锟斤拷]"
                }, {
                    name: "Ps",
                    alias: "Open_Punctuation",
                    bmp: "\\x28\\x5B\\x7B嗉亨技釟涒€氣€炩亝鈦解倣鈱堚寠鈱┾潹鉂潿鉂澃鉂测澊鉄呪煢鉄ㄢ煪鉄煯猞冣猞団猞嬧猞忊猞撯猞椻猝氣Ъ飧⑩袱飧︹辅夤傘€堛€娿€屻€庛€愩€斻€栥€樸€氥€濓纯锔楋傅锔凤腹锔伙附锔匡箒锕冿箛锕欙箾锕濓紙锛伙經锝燂舰"
                }, {
                    name: "S",
                    alias: "Symbol",
                    bmp: "\\x24\\x2B<->\\x5E`\\x7C~垄-娄篓漏卢庐-卤麓赂脳梅藗-藚藪-藷衰-双谁睡-丝偷蝿螀隙覀謲-謴貑-貓貗貛貜蹫郓劢劬叨唰侧С唰亨Щ喃编喁�-喁亨笨嗟忇倒喔苦紒-嗉冟紦嗉�-嗉椸細-嗉熰即嗉多几嗑�-嗫呧繃-嗫屶繋嗫忇繒-嗫樶倿醾熱帎-釒欋煕幞€岌�-岌酷-岘-岘坚窘峋�-峥佱繊-峥忈繚-峥熱凯-峥拷峥锯亜鈦掆伜-鈦尖倞-鈧屸偁-鈧锯剙鈩佲剝-鈩嗏剤鈩夆剶鈩�-鈩樷劄-鈩ｂ劌鈩р劑鈩労鈩烩厐-鈪勨厞-鈪嶁厪鈫娾唻鈫�-鈱団寣-鈱ㄢ尗-鈴锯悁-鈵︹憖-鈶娾挏-鈸┾攢-鉂р灁-鉄勨焽-鉄モ煱-猞傗-猝椻-猝烩Ь-猸斥-猱曗畼-猱光-獐堚瘖-獐戔-獐偿-獬簚-夂欌簺-饣斥紑-饪曗堪-饪汇€勩€掋€撱€犮€躲€枫€俱€裤倹銈溿啇銌戙問-銌熴噣-銍ｃ垁-銏炪埅-銐囥墣銐�-銐裤妸-銑般媭-銒俱寑-銖夸穩-浞筷拹-険嗞渶-隃栮湢隃￡瀴隇婈牗-隊牰-隊龟┓-戛龟瓫铿╋-锆侊芳锓斤耿锕�-锕︼供锛勶紜锛�-锛烇季锝€锝滐綖锟�-锟︼卡-锟考锟�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟絔|锟絒锟斤拷锟絔|饝溈|锟絒锟�-锟斤拷]|饹矞|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟絔|锟絒锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷]"
                }, {name: "Sc", alias: "Currency_Symbol", bmp: "\\x24垄-楼謴貗唰侧С唰秽喁灌缚釤涒偁-鈧娟牳锓硷供锛勶繝锟★骏锟�"}, {
                    name: "Sk",
                    alias: "Modifier_Symbol",
                    bmp: "\\x5E`篓炉麓赂藗-藚藪-藷衰-双谁睡-丝偷蝿螀峋结究-峥佱繊-峥忈繚-峥熱凯-峥拷峥俱倹銈滉渶-隃栮湢隃￡瀴隇婈瓫锂�-锆侊季锝€锟�",
                    astral: "锟絒锟�-锟絔"
                }, {
                    name: "Sm",
                    alias: "Math_Symbol",
                    bmp: "\\x2B<->\\x7C~卢卤脳梅隙貑-貓鈦勨亽鈦�-鈦尖倞-鈧屸剺鈪€-鈪勨厠鈫�-鈫斺啔鈫涒啝鈫ｂ啨鈫噹鈬忊噿鈬斺嚧-鈰库尃鈱♀嵓鈳�-鈳斥彍-鈴♀柗鈼佲椄-鈼库櫙鉄€-鉄勨焽-鉄モ煱-鉄库-猞傗-猝椻-猝烩Ь-猥库-猸勨瓏-猸岋锕工-锕︼紜锛�-锛烇綔锝烇竣锟�-锟�",
                    astral: "锟絒锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷]|锟絒锟斤拷]"
                }, {
                    name: "So",
                    alias: "Other_Symbol",
                    bmp: "娄漏庐掳覀謲謳貛貜蹫郓劢劬叨唰亨喁�-喁膏啾苦祻嗟灌紒-嗉冟紦嗉�-嗉椸細-嗉熰即嗉多几嗑�-嗫呧繃-嗫屶繋嗫忇繒-嗫樶倿醾熱帎-釒欋岌�-岌酷-岘-岘尖剙鈩佲剝-鈩嗏剤鈩夆剶鈩栤剹鈩�-鈩ｂ劌鈩р劑鈩労鈩烩厞鈪屸厤鈪忊唺鈫嬧啎-鈫欌啘-鈫熲啞鈫⑩啢鈫モ啩-鈫啹-鈬嶁噽鈬戔嚀鈬�-鈬斥寑-鈱団寣-鈱熲將-鈱ㄢ尗-鈲烩嵔-鈳氣幋-鈴涒彚-鈴锯悁-鈵︹憖-鈶娾挏-鈸┾攢-鈻垛柛-鈼€鈼�-鈼封榾-鈾櫚-鉂р灁-鉃库爛-猓库瑎-猬瓍猸嗏瓖-猸斥-猱曗畼-猱光-獐堚瘖-獐戔-獐偿-獬簚-夂欌簺-饣斥紑-饪曗堪-饪汇€勩€掋€撱€犮€躲€枫€俱€裤啇銌戙問-銌熴噣-銍ｃ垁-銏炪埅-銐囥墣銐�-銐裤妸-銑般媭-銒俱寑-銖夸穩-浞筷拹-険嗞牗-隊牰隊逢牴戛�-戛癸方锟わ卡锟慨锟硷拷",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟絔|锟絒锟斤拷锟絔|饝溈|锟絒锟�-锟斤拷]|饹矞|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷]"
                }, {name: "Z", alias: "Separator", bmp: " 聽釟€鈥€-鈥奬u2028\u2029鈥仧銆€"}, {
                    name: "Zl",
                    alias: "Line_Separator",
                    bmp: "\u2028"
                }, {name: "Zp", alias: "Paragraph_Separator", bmp: "\u2029"}, {
                    name: "Zs",
                    alias: "Space_Separator",
                    bmp: " 聽釟€鈥€-鈥娾€仧銆€"
                }])
            }
        }, {}], 6: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";
                if (!a.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Properties");
                var n = [{name: "ASCII", bmp: "\0-"}, {
                    name: "Alphabetic",
                    bmp: "A-Za-z陋碌潞脌-脰脴-枚酶-藖藛-藨藸-摔爽水蛥桶-痛投头秃-徒涂螁螆-螉螌螏-巍危-系戏-襾見-辕员-諙諜铡-謬职-纸挚讈讉讋讌讎讗-转装-撞貝-貧貭-贄贆-贌佼-蹞蹠-蹨邸-郇郗-郫酆-奂劭軔-芸輱-薇邐-擢叽叩吆酄€-酄椸牃-酄-唷樴-啖脆⒍-啖洁-啵熰＃-啵┼０-啶秽そ-啷屶-啷愢-啷｀ケ-唳冟-唳屶唳愢-唳ㄠΚ-唳班Σ唳�-唳灌-唰勦唰堗唰屶唰椸唰澿-唰｀О唰编▉-啜冟▍-啜娻◤啜愢〒-啜ㄠí-啜班ú啜赤ǖ啜多ǜ啜灌ň-喋傕﹪喋堗喋屶喋�-喋溹喋�-喋掂獊-嗒冟獏-嗒嵿獜-嗒戉獡-嗒ㄠ-嗒班嗒赤-嗒灌-喃呧珖-喃夃珛喃屶珢喃�-喃｀喱�-喱冟瑓-喱屶瑥喱愢瑩-喱ㄠ-喱班喱赤-喱灌-喹勦瓏喹堗瓔喹屶瓥喹椸瓬喹澿瓱-喹｀喈傕畠喈�-喈娻畮-喈愢畳-喈曕畽喈氞疁喈炧疅喈｀喈�-喈-喈灌-喁傕瘑-喁堗瘖-喁屶瘣喁椸皜-喟冟皡-喟屶皫-喟愢皰-喟ㄠ蔼-喟灌敖-啾勦眴-啾堗眾-啾屶睍啾栢睒-啾氞睜-啾｀瞼-嗖冟矃-嗖屶矌-嗖愢矑-嗖ㄠ勃-嗖赤驳-嗖灌步-喑勦硢-喑堗硦-喑屶硶喑栢碁喑�-喑｀潮喑侧磥-啻冟磪-啻屶磶-啻愢磼-啻亨唇-嗟勦祮-嗟堗祳-嗟屶祹嗟�-嗟椸禑-嗟｀岛-嗟苦秱喽冟秴-喽栢稓-喽编冻-喽秽督喾€-喾嗋窂-喾斷窎喾�-喾熰凡喾赤竵-喔亨箑-喙嗋箥嗪佮簜嗪勦簢嗪堗簥嗪嵿簲-嗪椸簷-嗪熰骸-嗪｀亥嗪о邯嗪涵-嗪灌夯-嗪洁粈-嗷勦粏嗷嵿粶-嗷熰紑嘟€-嘟囙綁-嘟奖-嗑佮緢-嗑椸緳-嗑坚€€-醼夺€羔€�-醼酷亹-醽⑨仴-醽ㄡ伄-醾嗎値醾溼倽醾�-醿呩儑醿嶀儛-醿横兗-釅堘墛-釅嶀墣-釅栣墭釅�-釅濁墵-釆堘妸-釆嶀姁-釆搬姴-釆滇姼-釆踞媭釈�-釈呩媹-釈栣嫎-釋愥寬-釋曖寴-釐氠崯釒€-釒忈帬-釓滇徃-釓结悂-釞櫙-釞酷殎-釟氠殸-釠洰-釠羔渶-釡屷湈-釡撫湢-釡翅潃-釢撫潬-釢澁-釢搬澆釢翅瀫-釣翅灦-釤堘煑釤溼牋-帷丰-幄-幔滇-幛炨-幛ぐ-幛羔-幞グ-幞瘁-幡Π-岌夅█-屺涐-岍炨-岍瘁岈€-岈翅-岘冡瓍-岘嬦畝-岙┽-岙-岑メ-岑贬皜-岚滇睄-岜忈睔-岜结瞼-岵堘畅-岢钞-岢翅车岢夺磤-岫酷阀-岱瘁竴-峒曖紭-峒濁紶-峤呩綀-峤嶀綈-峤椺綑峤涐綕峤�-峤结線-峋瘁径-峋坚揪峥�-峥勧繂-峥屷繍-峥撫繓-峥涐繝-峥坎-峥瘁慷-峥尖伇鈦库倫-鈧溾剛鈩団剨-鈩撯剷鈩�-鈩濃劋鈩︹劏鈩�-鈩劘-鈩光劶-鈩库厖-鈪夆厧鈪�-鈫堚挾-鈸┾皜-獍鞍-獗炩睜-獬も倡-獬巢獬斥磤-獯モ揣獯窗-獾р弹舛€-舛栤稜-舛︹定-舛栋-舛垛陡-舛锯穩-夥嗏穲-夥庘窅-夥栤窐-夥炩窢-夥库腐銆�-銆囥€�-銆┿€�-銆点€�-銆笺亖-銈栥倽-銈熴偂-銉恒兗-銉裤剠-銊劚-銌庛啝-銌恒嚢-銍裤悁-涠典竴-榭曣€€-陹岅搻-険疥攢-陿岅槓-陿熽槳陿檧-隀櫞-隀魂櫩-隂湕-隃熽湤-隇堦瀷-隇灠-隇逢煼-隊侁爟-隊呹爣-隊婈爩-隊ш-辍酬-辏冴辏�-辏逢；辏疥-辘ぐ-辚掙-辚缄-軎碴Υ-軎筷戋�-戋りЕ-戋Ш-戋娟█-戗蛾﹢-戛嶊-戛蛾┖戛�-戟娟珋戢傟珱-戢濌珷-戢-戢店瑏-戡嗞瑝-戡庩瑧-戡栮瑺-戡﹃-戡-戥氷瓬-戥リ-戬皜-頌ｍ灠-頍嗧煁-頍伙-铹┌-铽欙瑎-铿嗭瑩-铿楋瑵-铿-铿讹-铿硷锃€锃侊瓋锃勶瓎-锂憋瘬-锎斤祼-锒忥稈-锓囷钒-锓伙拱-锕达苟-锘硷肌-锛猴絹-锝氾溅-锞撅總-锟囷繆-锟忥繏-锟楋繗-锟�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟絔|[锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷]|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {
                    name: "Any",
                    isBmpLast: !0,
                    bmp: "\0-锟�",
                    astral: "[锟�-锟絔[锟�-锟絔"
                }, {
                    name: "Default_Ignorable_Code_Point",
                    bmp: "颅蛷販釁熱厾釣瘁灥釥�-釥庘€�-鈥忊€�-鈥仩-鈦叅锔€-锔廫ufeff锞狅堪-锟�",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟絔|[锟�-锟絔[锟�-锟絔"
                }, {
                    name: "Lowercase",
                    bmp: "a-z陋碌潞脽-枚酶-每膩膬膮膰膲膵膷膹膽膿臅臈臋臎臐臒摹模磨魔末墨沫寞谋某牡姆母暮募木艀艂艅艈艌艍艐艒艔艖艙艜艞艡艣艥艧拧牛钮脓农奴怒暖疟懦诺欧藕偶啪-苺苾茀茍茖茘茠茣茩-茮茷啤疲匹屁篇偏骗瓢拼贫乒坪平-瓶菃菈菍菐菒菕菙菛菢菤菧菨菬恰牵钎千签谦黔钳前浅堑枪腔墙强葋葍葏葒葔葖葝葟葢葥葧葪葯葲葷葻取龋去颧醛全拳券缺瘸-裙燃瓤蓘蓚蓢蓧蓩蓫蓮-蕮蕰-矢藔藖藸-摔蛥捅统头秃-徒螑维-蠋蠍蠎蠒-蠗蠙蠜蠞蠠稀希膝惜烯汐檄席-铣系细匣霞邪-褵选眩靴学雪勋循询驯殉训逊压鸦呀芽襾覌覎覐覒覔視覘覚覜覞覠摇遥谣咬药耀噎爷冶页业曳夜一医铱觽觿訂訄訆訉訋訌討訐訒訔訖記訚訜印樱鹰缨萤荧迎盈颖映拥臃庸踊咏涌詠詢詤試詨詪詬詮詰該詴詶詸詻詽詿浴裕豫鸳冤垣原辕铡-謬釓�-釓结瞼-岵堘磤-岫酷竵岣冡竻岣囜笁岣嬦笉岣忈笐岣撫笗岣椺笝岣涐笣岣熱浮岣ａ弗岣п俯岣腑岣副岣翅傅岣丰腹岣会附岣酷箒峁冡箙峁囜箟峁嬦箥峁忈箲峁撫箷峁椺箼峁涐節峁熱埂峁ａ攻峁п供峁弓峁贡峁翅沟峁丰构峁会菇峁酷簛岷冡簠岷囜簤岷嬦簫岷忈簯岷撫簳-岷濁簾岷♂海岷メ骇岷┽韩岷函岷贬撼岷滇悍岷贯夯岷结嚎峄佱粌峄呩粐峄夅粙峄嶀粡峄戓粨峄曖粭峄欋粵峄濁粺峄♂唬峄メ户峄┽猾峄化峄贬怀峄滇环峄贯换峄结豢-峒囜紣-峒曖紶-峒п及-峒丰絸-峤呩綈-峤椺綘-峤п桨-峤结線-峋囜緪-峋椺緺-峋п景-峋瘁径峋丰揪峥�-峥勧繂峥囜繍-峥撫繓峥椺繝-峥п坎-峥瘁慷峥封伇鈦库倫-鈧溾剨鈩庘剰鈩撯劘鈩粹劰鈩尖劷鈪�-鈪夆厧鈪�-鈪库唲鈸�-鈸┾鞍-獗炩薄獗モ宝獗ㄢ豹獗北獗斥贝獗�-獗解瞾獠冣矃獠団矇獠嬧矋獠忊矐獠撯矔獠椻矙獠涒矟獠熲病獠ｂ播獠р博獠箔獠脖獠斥驳獠封补獠烩步獠库硜獬冣硡獬団硥獬嬧硩獬忊硲獬撯硶獬椻硻獬涒碀獬熲场獬ｂ长獬钞獬斥磤-獯モ揣獯檨隀冴檯隀囮檳隀嬯檷隀応檻隀撽檿隀楆櫃隀涥櫇隀熽櫋隀ｊ櫏隀ш櫓隀櫗隁侁殐隁呹殗隁夑殝隁嶊殢隁戧殦隁曣殫隁欔殯-隁濌湥隃リ湩隃╆湯隃湳-隃标湷隃店湻隃龟溁隃疥溈隄侁潈隄呹潎隄夑潒隄嶊潖隄戧潛隄曣潡隄欔潧隄濌潫隄￡潱隄リ潷隄╆潾隄澂-隄戈澓隄缄澘隇侁瀮隇呹瀲隇岅瀻隇戧灀-隇曣灄隇欔灈隇濌灍隇￡灒隇リ灖隇╆灥隇逢煾-隉宏-戥氷瓬-戥リ-戤匡瑎-铿嗭瑩-铿楋絹-锝�",
                    astral: "锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟絔"
                }, {
                    name: "Noncharacter_Code_Point",
                    bmp: "锓�-锓烤锟�",
                    astral: "[锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷][锟斤拷]"
                }, {
                    name: "Uppercase",
                    bmp: "A-Z脌-脰脴-脼膧膫膭膯膱膴膶膸膼膾臄臇臉臍臏臑臓蘑膜摩抹莫默漠陌牟拇亩墓幕慕目艁艃艆艊艎艑艓艕艗艛艝艠艢艤艦艩泞扭纽浓弄努女虐挪糯哦鸥殴呕沤苼苽苿茊茋茐-茓茙-茟茡茢茤-茦茰茲茻茽脾皮痞僻譬片飘漂票-瞥频品聘萍莿菄菉菎菑菓菗菚菞菣菦菫菭洽扦铅迁仟乾钱潜谴嵌-歉呛羌蔷葊葌葎葐葓葕葘葞葠葤葦葨葮葰葴葹葼娶趣圈权泉痊犬劝炔群然冉染蓙蓛-蓡蓤蓨蓪蓭桶筒投涂螁螆-螉螌螏螐螒-巍危-潍蠌蠏-蠑蠘蠚蠝蠟蠣息悉夕熄溪犀袭洗戏瞎虾辖-携褷癣绚薛穴血熏旬寻巡汛讯迅押鸭丫襽見覍規覑覓覕覗覙覛覝覟覡尧窑姚舀要椰耶野也掖叶腋液壹揖觻觼觾訁訃訅計訊訍訏訑訓訕託訙訛訝英婴应莹营蝇赢影硬哟佣痈雍蛹泳詟詡詣詥詧詩詫詭詯話詳詵詷詺詼詾誀寓预驭渊元袁援员-諙醾�-醿呩儑醿嶀帬-釓滇竴岣傖竸岣嗎笀岣娽笇岣庒笎岣掅笖岣栣笜岣氠笢岣炨笭岣⑨袱岣︶辅岣脯岣赴岣册复岣夺父岣横讣岣踞箑峁傖箘峁嗎箞峁娽箤峁庒箰峁掅箶峁栣箻峁氠箿峁炨範峁⑨工峁︶龚峁宫峁拱峁册勾峁夺垢峁横辜峁踞簚岷傖簞岷嗎簣岷娽簩岷庒簮岷掅簲岷炨籂岷⑨氦岷︶酣岷含岷喊岷册捍岷夺焊岷横杭岷踞粈峄傖粍峄嗎粓峄娽粚峄庒粣峄掅粩峄栣粯峄氠粶峄炨粻峄⑨护峄︶花峄滑峄话峄册淮峄夺桓峄横患峄踞紙-峒忈紭-峒濁绩-峒几-峒酷綀-峤嶀綑峤涐綕峤熱建-峤靖-峋会繄-峥嬦繕-峥涐卡-峥扛-峥烩剛鈩団剫-鈩嶁剱-鈩掆剷鈩�-鈩濃劋鈩︹劏鈩�-鈩劙-鈩斥劸鈩库厖鈪�-鈪唭鈷�-鈸忊皜-獍睜獗�-獗も抱獗┾鲍獗�-獗扳辈獗碘本-獠€獠傗矂獠嗏矆獠娾矊獠庘矏獠掆矓獠栤矘獠氣矞獠炩矤獠⑩菠獠︹波獠铂獠舶獠测泊獠垛哺獠衡布獠锯硛獬傗硠獬嗏硤獬娾硨獬庘硱獬掆硵獬栤硺獬氣硿獬炩碃獬⑩倡獬巢隀€隀傟檮隀嗞檲隀婈檶隀庩檺隀掙檾隀栮櫂隀氷櫆隀炾櫊隀㈥櫎隀﹃櫒隀櫖隁€隁傟殑隁嗞殘隁婈殞隁庩殣隁掙殧隁栮殬隁氷湤隃り湨隃湭隃湲隃碴湸隃蛾湼隃宏溂隃娟潃隄傟潉隄嗞潏隄婈潓隄庩潗隄掙潝隄栮潣隄氷潨隄炾潬隄㈥潳隄﹃潹隄潿隄澒隄魂澖隄娟瀫隇傟瀯隇嗞瀷隇嶊瀽隇掙灃隇橁灇隇滉灋隇犼灑隇り灕隇灙-隇灠-隇搓灦锛�-锛�",
                    astral: "锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "White_Space", bmp: "\t-\r 聟聽釟€鈥€-鈥奬u2028\u2029鈥仧銆€"}];
                n.push({name: "Assigned", inverseOf: "Cn"}), a.addUnicodeData(n)
            }
        }, {}], 7: [function (a, n, e) {
            n.exports = function (a) {
                "use strict";
                if (!a.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Scripts");
                a.addUnicodeData([{name: "Adlam", astral: "锟絒锟�-锟斤拷-锟斤拷锟絔"}, {
                    name: "Ahom",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Anatolian_Hieroglyphs", astral: "锟絒锟�-锟絔"}, {
                    name: "Arabic",
                    bmp: "貈-貏貑-貗貚-貧貫貭-乜賮-賷贃-侬俦-蹨蹫-劭輴-菘啖�-啖脆⒍-啖洁-啵∴＃-啵匡瓙-锆侊瘬-锎斤祼-锒忥稈-锓囷钒-锓斤拱-锕达苟-锘�",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷-锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟絔"
                }, {name: "Armenian", bmp: "员-諙諜-諢铡-謬謯謲-謴铿�-铿�"}, {
                    name: "Avestan",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Balinese", bmp: "岈€-岘嬦瓙-岘�"}, {
                    name: "Bamum",
                    bmp: "隁�-隂�",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Bassa_Vah", astral: "锟絒锟�-锟斤拷-锟絔"}, {name: "Batak", bmp: "岑€-岑翅-岑�"}, {
                    name: "Bengali",
                    bmp: "唳€-唳冟-唳屶唳愢-唳ㄠΚ-唳班Σ唳�-唳灌-唰勦唰堗-唰庎唰溹唰�-唰｀Е-唰�"
                }, {name: "Bhaiksuki", astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔"}, {
                    name: "Bopomofo",
                    bmp: "霜双銊�-銊啝-銌�"
                }, {name: "Brahmi", astral: "锟絒锟�-锟斤拷-锟斤拷]"}, {name: "Braille", bmp: "鉅€-猓�"}, {
                    name: "Buginese",
                    bmp: "屺€-屺涐屺�"
                }, {name: "Buhid", bmp: "釢€-釢�"}, {name: "Canadian_Aboriginal", bmp: "釔€-釞酷-幔�"}, {
                    name: "Carian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Caucasian_Albanian", astral: "锟絒锟�-锟斤拷]"}, {
                    name: "Chakma",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Cham", bmp: "戗€-戗蛾﹢-戛嶊-戛欔-戛�"}, {name: "Cherokee", bmp: "釒�-釓滇徃-釓疥-戤�"}, {
                    name: "Common",
                    bmp: "\0-@\\x5B-`\\x7B-漏芦-鹿禄-驴脳梅使-藷衰-拴爽-丝痛途螀螄謮貐貙貨販責賭蹪啵⑧イ啷ム缚嗫�-嗫樶兓釠�-釠湹釡夺爞釥冡爡岢撫场岢�-岢钞-岢翅车岢垛€€-鈥嬧€�-鈦も仸-鈦扳伌-鈦锯個-鈧庘偁-鈧锯剙-鈩モ劎-鈩┾劕-鈩扁劤-鈪嶁厪-鈪熲唹-鈫嬧啇-鈴锯悁-鈵︹憖-鈶娾憼-鉄库-猸斥-猱曗畼-猱光-獐堚瘖-獐戔-獐竴-夤勨堪-饪汇€€-銆勩€嗐€�-銆犮€�-銆枫€�-銆裤倹銈溿偁銉汇兗銌�-銌熴噣-銍ｃ垹-銐熴壙-銒忋崢-銖夸穩-浞筷渶-隃￡瀳-隇婈牥-隊龟ぎ戋応瓫锎撅纯锔�-锔欙赴-锕掞箶-锕︼龚-锕玕ufeff锛�-锛狅蓟-锝€锝�-锝ワ桨锞烇緹锟�-锟︼卡-锟抗-锟�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷锟斤拷锟斤拷锟�-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷]|锟絒锟斤拷-锟絔"
                }, {name: "Coptic", bmp: "息-席獠€-獬斥彻-獬�"}, {
                    name: "Cuneiform",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Cypriot", astral: "锟絒锟�-锟斤拷锟�-锟斤拷锟斤拷锟絔"}, {
                    name: "Cyrillic",
                    bmp: "衻-覄覈-辕岵€-岵堘传岬糕窢-夥筷檧-隁燂府锔�"
                }, {name: "Deseret", astral: "锟絒锟�-锟絔"}, {
                    name: "Devanagari",
                    bmp: "啶€-啷愢-啷｀ウ-啷筷　-辏�"
                }, {name: "Duployan", astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔"}, {
                    name: "Egyptian_Hieroglyphs",
                    astral: "锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "Elbasan", astral: "锟絒锟�-锟絔"}, {
                    name: "Ethiopic",
                    bmp: "釄€-釅堘墛-釅嶀墣-釅栣墭釅�-釅濁墵-釆堘妸-釆嶀姁-釆搬姴-釆滇姼-釆踞媭釈�-釈呩媹-釈栣嫎-釋愥寬-釋曖寴-釐氠崫-釐坚巰-釒欌秬-舛栤稜-舛︹定-舛栋-舛垛陡-舛锯穩-夥嗏穲-夥庘窅-夥栤窐-夥炾瑏-戡嗞瑝-戡庩瑧-戡栮瑺-戡﹃-戡�"
                }, {name: "Georgian", bmp: "醾�-醿呩儑醿嶀儛-醿横兗-醿库磤-獯モ揣獯�"}, {
                    name: "Glagolitic",
                    bmp: "獍€-獍鞍-獗�",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟絔"
                }, {name: "Gothic", astral: "锟絒锟�-锟絔"}, {
                    name: "Grantha",
                    astral: "锟絒锟�-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟絔"
                }, {
                    name: "Greek",
                    bmp: "桶-统偷-头秃-徒涂蝿螁螆-螉螌螏-巍危-稀习-峡岽�-岽禎-岬♂郸-岬犊峒€-峒曖紭-峒濁紶-峤呩綀-峤嶀綈-峤椺綑峤涐綕峤�-峤结線-峋瘁径-峥勧繂-峥撫繓-峥涐繚-峥坎-峥瘁慷-峥锯劍戥�",
                    astral: "锟絒锟�-锟斤拷]|锟絒锟�-锟絔"
                }, {name: "Gujarati", bmp: "嗒�-嗒冟獏-嗒嵿獜-嗒戉獡-嗒ㄠ-嗒班嗒赤-嗒灌-喃呧珖-喃夃珛-喃嵿珢喃�-喃｀-喃编"}, {
                    name: "Gurmukhi",
                    bmp: "啜�-啜冟▍-啜娻◤啜愢〒-啜ㄠí-啜班ú啜赤ǖ啜多ǜ啜灌啜�-喋傕﹪喋堗-喋嵿喋�-喋溹喋�-喋�"
                }, {
                    name: "Han",
                    bmp: "夂€-夂欌簺-饣斥紑-饪曘€呫€囥€�-銆┿€�-銆汇悁-涠典竴-榭曪-铹┌-铽�",
                    astral: "[锟�-锟斤拷-锟斤拷-锟絔[锟�-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟斤拷-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"
                }, {name: "Hangul", bmp: "釀€-釃裤€€劚-銌庛垁-銏炪墵-銐娟-辚缄皜-頌ｍ灠-頍嗧煁-頍伙緺-锞撅總-锟囷繆-锟忥繏-锟楋繗-锟�"}, {
                    name: "Hanunoo",
                    bmp: "釡�-釡�"
                }, {name: "Hatran", astral: "锟絒锟�-锟斤拷锟斤拷-锟絔"}, {
                    name: "Hebrew",
                    bmp: "謶-讎讗-转装-状铿�-铿讹-铿硷锃€锃侊瓋锃勶瓎-锃�"
                }, {name: "Hiragana", bmp: "銇�-銈栥倽-銈�", astral: "饹€亅馃垁"}, {
                    name: "Imperial_Aramaic",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {
                    name: "Inherited",
                    bmp: "虁-童覅覇賸-贂侔啷戉岐�-岐踞硱-岢掅硵-岢犪尝-岢ㄡ抄岢瘁掣岢贯穩-岱滇坊-岱库€屸€嶁儛-鈨般€�-銆倷銈氾竴-锔忥笭-锔�",
                    astral: "锟絒锟斤拷]|锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟絔|锟絒锟�-锟絔"
                }, {name: "Inscriptional_Pahlavi", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Inscriptional_Parthian",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Javanese", bmp: "軎€-戋嶊-戋欔戋�"}, {name: "Kaithi", astral: "锟絒锟�-锟絔"}, {
                    name: "Kannada",
                    bmp: "嗖€-嗖冟矃-嗖屶矌-嗖愢矑-嗖ㄠ勃-嗖赤驳-嗖灌布-喑勦硢-喑堗硦-喑嵿硶喑栢碁喑�-喑｀肠-喑潮喑�"
                }, {name: "Katakana", bmp: "銈�-銉恒兘-銉裤嚢-銍裤嫄-銒俱寑-銔楋溅-锝奖-锞�", astral: "饹€€"}, {
                    name: "Kayah_Li",
                    bmp: "辘€-辘く"
                }, {name: "Kharoshthi", astral: "锟絒锟�-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔"}, {
                    name: "Khmer",
                    bmp: "釣€-釤濁煚-釤┽煱-釤贯-岌�"
                }, {name: "Khojki", astral: "锟絒锟�-锟斤拷-锟絔"}, {name: "Khudawadi", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Lao",
                    bmp: "嗪佮簜嗪勦簢嗪堗簥嗪嵿簲-嗪椸簷-嗪熰骸-嗪｀亥嗪о邯嗪涵-嗪灌夯-嗪洁粈-嗷勦粏嗷�-嗷嵿粣-嗷權粶-嗷�"
                }, {
                    name: "Latin",
                    bmp: "A-Za-z陋潞脌-脰脴-枚酶-矢藸-摔岽€-岽メ船-岬溼耽-岬メ但-岬丰倒-岫踞竴-峄库伇鈦库倫-鈧溾劒鈩劜鈪庘厾-鈫堚睜-獗筷湤-隇囮瀷-隇灠-隇逢煼-隉筷-戥氷瓬-戥わ瑎-铿嗭肌-锛猴絹-锝�"
                }, {name: "Lepcha", bmp: "岚€-岚丰盎-岜夅睄-岜�"}, {
                    name: "Limbu",
                    bmp: "幛€-幛炨-幛ぐ-幛会幞�-幞�"
                }, {name: "Linear_A", astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"}, {
                    name: "Linear_B",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷锟斤拷-锟斤拷-锟斤拷-锟絔"
                }, {name: "Lisu", bmp: "険�-険�"}, {name: "Lycian", astral: "锟絒锟�-锟絔"}, {
                    name: "Lydian",
                    astral: "锟絒锟�-锟斤拷]"
                }, {name: "Mahajani", astral: "锟絒锟�-锟絔"}, {
                    name: "Malayalam",
                    bmp: "啻�-啻冟磪-啻屶磶-啻愢磼-啻亨唇-嗟勦祮-嗟堗祳-嗟忇禂-嗟｀郸-嗟�"
                }, {name: "Mandaic", bmp: "唷€-唷涏"}, {name: "Manichaean", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Marchen",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Meetei_Mayek", bmp: "戢�-戢蛾瘈-戬-戬�"}, {
                    name: "Mende_Kikakui",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Meroitic_Cursive", astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"}, {
                    name: "Meroitic_Hieroglyphs",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Miao", astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"}, {name: "Modi", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Mongolian",
                    bmp: "釥€釥佱爠釥�-釥庒爯-釥欋牋-帷丰-幄�",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Mro", astral: "锟絒锟�-锟斤拷-锟斤拷锟絔"}, {
                    name: "Multani",
                    astral: "锟絒锟�-锟斤拷锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Myanmar", bmp: "醼€-醾熽-戋娟-戛�"}, {
                    name: "Nabataean",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "New_Tai_Lue", bmp: "幡€-幡Π-岌夅-岌氠岌�"}, {name: "Newa", astral: "锟絒锟�-锟斤拷锟絔"}, {
                    name: "Nko",
                    bmp: "還-吆"
                }, {name: "Ogham", bmp: "釟€-釟�"}, {name: "Ol_Chiki", bmp: "岜�-岜�"}, {
                    name: "Old_Hungarian",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Old_Italic", astral: "锟絒锟�-锟絔"}, {
                    name: "Old_North_Arabian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Old_Permic", astral: "锟絒锟�-锟絔"}, {
                    name: "Old_Persian",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Old_South_Arabian", astral: "锟絒锟�-锟絔"}, {
                    name: "Old_Turkic",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Oriya", bmp: "喱�-喱冟瑓-喱屶瑥喱愢瑩-喱ㄠ-喱班喱赤-喱灌-喹勦瓏喹堗瓔-喹嵿瓥喹椸瓬喹澿瓱-喹｀-喹�"}, {
                    name: "Osage",
                    astral: "锟絒锟�-锟斤拷-锟絔"
                }, {name: "Osmanya", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Pahawh_Hmong",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟斤拷-锟斤拷-锟絔"
                }, {name: "Palmyrene", astral: "锟絒锟�-锟絔"}, {name: "Pau_Cin_Hau", astral: "锟絒锟�-锟絔"}, {
                    name: "Phags_Pa",
                    bmp: "辍€-辍�"
                }, {name: "Phoenician", astral: "锟絒锟�-锟斤拷]"}, {
                    name: "Psalter_Pahlavi",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {name: "Rejang", bmp: "辘�-辚撽"}, {name: "Runic", bmp: "釟�-釠洰-釠�"}, {
                    name: "Samaritan",
                    bmp: "酄€-酄牥-酄�"
                }, {name: "Saurashtra", bmp: "辎€-辏呹-辏�"}, {name: "Sharada", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Shavian",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Siddham", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "SignWriting",
                    astral: "锟絒锟�-锟斤拷-锟斤拷-锟絔"
                }, {
                    name: "Sinhala",
                    bmp: "喽傕秲喽�-喽栢稓-喽编冻-喽秽督喾€-喾嗋穵喾�-喾斷窎喾�-喾熰乏-喾凡-喾�",
                    astral: "锟絒锟�-锟絔"
                }, {name: "Sora_Sompeng", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Sundanese",
                    bmp: "岙€-岙酷硛-岢�"
                }, {name: "Syloti_Nagri", bmp: "隊€-隊�"}, {name: "Syriac", bmp: "軃-軑軓-輮輱-輳"}, {
                    name: "Tagalog",
                    bmp: "釡€-釡屷湈-釡�"
                }, {name: "Tagbanwa", bmp: "釢�-釢澁-釢搬澆釢�"}, {name: "Tai_Le", bmp: "幞�-幞グ-幞�"}, {
                    name: "Tai_Tham",
                    bmp: "屺�-岍炨-岍坚┛-岐夅獝-岐欋獱-岐�"
                }, {name: "Tai_Viet", bmp: "戟€-戢傟珱-戢�"}, {name: "Takri", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Tamil",
                    bmp: "喈傕畠喈�-喈娻畮-喈愢畳-喈曕畽喈氞疁喈炧疅喈｀喈�-喈-喈灌-喁傕瘑-喁堗瘖-喁嵿瘣喁椸-喁�"
                }, {name: "Tangut", astral: "饢繝|[锟�-锟絔[锟�-锟絔|锟絒锟�-锟絔|锟絒锟�-锟絔"}, {
                    name: "Telugu",
                    bmp: "喟€-喟冟皡-喟屶皫-喟愢皰-喟ㄠ蔼-喟灌敖-啾勦眴-啾堗眾-啾嵿睍啾栢睒-啾氞睜-啾｀宝-啾备-啾�"
                }, {name: "Thaana", bmp: "迉-薇"}, {name: "Thai", bmp: "喔�-喔亨箑-喙�"}, {
                    name: "Tibetan",
                    bmp: "嗉€-嘟囙綁-嘟奖-嗑椸緳-嗑监揪-嗫屶繋-嗫斷繖嗫�"
                }, {name: "Tifinagh", bmp: "獯�-獾р弹獾扳悼"}, {name: "Tirhuta", astral: "锟絒锟�-锟斤拷-锟絔"}, {
                    name: "Ugaritic",
                    astral: "锟絒锟�-锟斤拷]"
                }, {name: "Vai", bmp: "陻€-陿�"}, {name: "Warang_Citi", astral: "锟絒锟�-锟斤拷]"}, {
                    name: "Yi",
                    bmp: "陘€-陹岅拹-険�"
                }])
            }
        }, {}], 8: [function (a, n, e) {
            var r = a("./xregexp");
            a("./addons/build")(r), a("./addons/matchrecursive")(r), a("./addons/unicode-base")(r), a("./addons/unicode-blocks")(r), a("./addons/unicode-categories")(r), a("./addons/unicode-properties")(r), a("./addons/unicode-scripts")(r), n.exports = r
        }, {
            "./addons/build": 1,
            "./addons/matchrecursive": 2,
            "./addons/unicode-base": 3,
            "./addons/unicode-blocks": 4,
            "./addons/unicode-categories": 5,
            "./addons/unicode-properties": 6,
            "./addons/unicode-scripts": 7,
            "./xregexp": 9
        }], 9: [function (a, n, e) {
            "use strict";

            function r(a) {
                var n = !0;
                try {
                    new RegExp("", a)
                } catch (a) {
                    n = !1
                }
                return n
            }

            function t(a, n, e, r, t) {
                var m;
                if (a[C] = {captureNames: n}, t) return a;
                if (a.__proto__) a.__proto__ = w.prototype; else for (m in w.prototype) a[m] = w.prototype[m];
                return a[C].source = e, a[C].flags = r ? r.split("").sort().join("") : r, a
            }

            function m(a) {
                return v.replace.call(a, /([\s\S])(?=[\s\S]*\1)/g, "")
            }

            function i(a, n) {
                if (!w.isRegExp(a)) throw new TypeError("Type RegExp expected");
                var e = a[C] || {}, r = o(a), i = "", l = "", s = null, c = null;
                return n = n || {}, n.removeG && (l += "g"), n.removeY && (l += "y"), l && (r = v.replace.call(r, new RegExp("[" + l + "]+", "g"), "")), n.addG && (i += "g"), n.addY && (i += "y"), i && (r = m(r + i)), n.isInternalOnly || (void 0 !== e.source && (s = e.source), null != e.flags && (c = i ? m(e.flags + i) : e.flags)), a = t(new RegExp(n.source || a.source, r), p(a) ? e.captureNames.slice(0) : null, s, c, n.isInternalOnly)
            }

            function l(a) {
                return parseInt(a, 16)
            }

            function s(a, n, e) {
                return "(" === a.input.charAt(a.index - 1) || ")" === a.input.charAt(a.index + a[0].length) || d(a.input, a.index + a[0].length, e, "[?*+]|{\\d+(?:,\\d*)?}") ? "" : "(?:)"
            }

            function o(a) {
                return T ? a.flags : v.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(a))[1]
            }

            function p(a) {
                return !(!a[C] || !a[C].captureNames)
            }

            function c(a) {
                return parseInt(a, 10).toString(16)
            }

            function u(a, n) {
                var e, r = a.length;
                for (e = 0; e < r; ++e) if (a[e] === n) return e;
                return -1
            }

            function d(a, n, e, r) {
                var t = e.indexOf("x") > -1 ? ["\\s", "#[^#\\n]*", "\\(\\?#[^)]*\\)"] : ["\\(\\?#[^)]*\\)"];
                return v.test.call(new RegExp("^(?:" + t.join("|") + ")*(?:" + r + ")"), a.slice(n))
            }

            function b(a, n) {
                return U.call(a) === "[object " + n + "]"
            }

            function _(a) {
                for (; a.length < 4;) a = "0" + a;
                return a
            }

            function h(a, n) {
                var e;
                if (m(n) !== n) throw new SyntaxError("Invalid duplicate regex flag " + n);
                for (a = v.replace.call(a, /^\(\?([\w$]+)\)/, function (a, e) {
                    if (v.test.call(/[gy]/, e)) throw new SyntaxError("Cannot use flag g or y in mode modifier " + a);
                    return n = m(n + e), ""
                }), e = 0; e < n.length; ++e) if (!D[n.charAt(e)]) throw new SyntaxError("Unknown regex flag " + n.charAt(e));
                return {pattern: a, flags: n}
            }

            function f(a) {
                var n = {};
                return b(a, "String") ? (w.forEach(a, /[^\s,]+/, function (a) {
                    n[a] = !0
                }), n) : a
            }

            function I(a) {
                if (!/^[\w$]$/.test(a)) throw new Error("Flag must be a single character A-Za-z0-9_$");
                D[a] = !0
            }

            function g(a, n, e, r, t) {
                for (var m, i, l = M.length, s = a.charAt(e), o = null; l--;) if (i = M[l], !(i.leadChar && i.leadChar !== s || i.scope !== r && "all" !== i.scope || i.flag && -1 === n.indexOf(i.flag)) && (m = w.exec(a, i.regex, e, "sticky"))) {
                    o = {matchLength: m[0].length, output: i.handler.call(t, m, r, n), reparse: i.reparse};
                    break
                }
                return o
            }

            function x(a) {
                E.astral = a
            }

            function y(a) {
                RegExp.prototype.exec = (a ? A : v).exec, RegExp.prototype.test = (a ? A : v).test, String.prototype.match = (a ? A : v).match, String.prototype.replace = (a ? A : v).replace, String.prototype.split = (a ? A : v).split, E.natives = a
            }

            function S(a) {
                if (null == a) throw new TypeError("Cannot convert null or undefined to object");
                return a
            }

            function w(a, n) {
                if (w.isRegExp(a)) {
                    if (void 0 !== n) throw new TypeError("Cannot supply flags when copying a RegExp");
                    return i(a)
                }
                if (a = void 0 === a ? "" : String(a), n = void 0 === n ? "" : String(n), w.isInstalled("astral") && -1 === n.indexOf("A") && (n += "A"), P[a] || (P[a] = {}), !P[a][n]) {
                    for (var e, r = {
                        hasNamedCapture: !1,
                        captureNames: []
                    }, m = N, l = "", s = 0, o = h(a, n), p = o.pattern, c = o.flags; s < p.length;) {
                        do {
                            (e = g(p, c, s, m, r)) && e.reparse && (p = p.slice(0, s) + e.output + p.slice(s + e.matchLength))
                        } while (e && e.reparse);
                        if (e) l += e.output, s += e.matchLength || 1; else {
                            var u = w.exec(p, O[m], s, "sticky")[0];
                            l += u, s += u.length, "[" === u && m === N ? m = B : "]" === u && m === B && (m = N)
                        }
                    }
                    P[a][n] = {
                        pattern: v.replace.call(l, /(?:\(\?:\))+/g, "(?:)"),
                        flags: v.replace.call(c, /[^gimuy]+/g, ""),
                        captures: r.hasNamedCapture ? r.captureNames : null
                    }
                }
                var d = P[a][n];
                return t(new RegExp(d.pattern, d.flags), d.captures, a, n)
            }

            var C = "xregexp", E = {astral: !1, natives: !1}, v = {
                    exec: RegExp.prototype.exec,
                    test: RegExp.prototype.test,
                    match: String.prototype.match,
                    replace: String.prototype.replace,
                    split: String.prototype.split
                }, A = {}, k = {}, P = {}, M = [], N = "default", B = "class", O = {
                    default: /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
                    class: /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
                }, L = void 0 === v.exec.call(/()??/, "")[1], T = void 0 !== /x/.flags, U = {}.toString, R = r("u"),
                F = r("y"), D = {g: !0, i: !0, m: !0, u: R, y: F};
            w.prototype = new RegExp, w.version = "3.2.0", w._clipDuplicates = m, w._hasNativeFlag = r, w._dec = l, w._hex = c, w._pad4 = _, w.addToken = function (a, n, e) {
                e = e || {};
                var r, t = e.optionalFlags;
                if (e.flag && I(e.flag), t) for (t = v.split.call(t, ""), r = 0; r < t.length; ++r) I(t[r]);
                M.push({
                    regex: i(a, {addG: !0, addY: F, isInternalOnly: !0}),
                    handler: n,
                    scope: e.scope || N,
                    flag: e.flag,
                    reparse: e.reparse,
                    leadChar: e.leadChar
                }), w.cache.flush("patterns")
            }, w.cache = function (a, n) {
                return k[a] || (k[a] = {}), k[a][n] || (k[a][n] = w(a, n))
            }, w.cache.flush = function (a) {
                "patterns" === a ? P = {} : k = {}
            }, w.escape = function (a) {
                return v.replace.call(S(a), /[-\[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            }, w.exec = function (a, n, e, r) {
                var t, m, l = "g", s = !1, o = !1;
                return s = F && !!(r || n.sticky && !1 !== r), s ? l += "y" : r && (o = !0, l += "FakeY"), n[C] = n[C] || {}, m = n[C][l] || (n[C][l] = i(n, {
                    addG: !0,
                    addY: s,
                    source: o ? n.source + "|()" : void 0,
                    removeY: !1 === r,
                    isInternalOnly: !0
                })), e = e || 0, m.lastIndex = e, t = A.exec.call(m, a), o && t && "" === t.pop() && (t = null), n.global && (n.lastIndex = t ? m.lastIndex : 0), t
            }, w.forEach = function (a, n, e) {
                for (var r, t = 0, m = -1; r = w.exec(a, n, t);) e(r, ++m, a, n), t = r.index + (r[0].length || 1)
            }, w.globalize = function (a) {
                return i(a, {addG: !0})
            }, w.install = function (a) {
                a = f(a), !E.astral && a.astral && x(!0), !E.natives && a.natives && y(!0)
            }, w.isInstalled = function (a) {
                return !!E[a]
            }, w.isRegExp = function (a) {
                return "[object RegExp]" === U.call(a)
            }, w.match = function (a, n, e) {
                var r, t, m = n.global && "one" !== e || "all" === e,
                    l = (m ? "g" : "") + (n.sticky ? "y" : "") || "noGY";
                return n[C] = n[C] || {}, t = n[C][l] || (n[C][l] = i(n, {
                    addG: !!m,
                    removeG: "one" === e,
                    isInternalOnly: !0
                })), r = v.match.call(S(a), t), n.global && (n.lastIndex = "one" === e && r ? r.index + r[0].length : 0), m ? r || [] : r && r[0]
            }, w.matchChain = function (a, n) {
                return function a(e, r) {
                    function t(a) {
                        if (m.backref) {
                            if (!(a.hasOwnProperty(m.backref) || +m.backref < a.length)) throw new ReferenceError("Backreference to undefined group: " + m.backref);
                            i.push(a[m.backref] || "")
                        } else i.push(a[0])
                    }

                    for (var m = n[r].regex ? n[r] : {regex: n[r]}, i = [], l = 0; l < e.length; ++l) w.forEach(e[l], m.regex, t);
                    return r !== n.length - 1 && i.length ? a(i, r + 1) : i
                }([a], 0)
            }, w.replace = function (a, n, e, r) {
                var t, m = w.isRegExp(n), l = n.global && "one" !== r || "all" === r,
                    s = (l ? "g" : "") + (n.sticky ? "y" : "") || "noGY", o = n;
                return m ? (n[C] = n[C] || {}, o = n[C][s] || (n[C][s] = i(n, {
                    addG: !!l,
                    removeG: "one" === r,
                    isInternalOnly: !0
                }))) : l && (o = new RegExp(w.escape(String(n)), "g")), t = A.replace.call(S(a), o, e), m && n.global && (n.lastIndex = 0), t
            }, w.replaceEach = function (a, n) {
                var e, r;
                for (e = 0; e < n.length; ++e) r = n[e], a = w.replace(a, r[0], r[1], r[2]);
                return a
            }, w.split = function (a, n, e) {
                return A.split.call(S(a), n, e)
            }, w.test = function (a, n, e, r) {
                return !!w.exec(a, n, e, r)
            }, w.uninstall = function (a) {
                a = f(a), E.astral && a.astral && x(!1), E.natives && a.natives && y(!1)
            }, w.union = function (a, n, e) {
                function r(a, n, e) {
                    var r = m[l - t];
                    if (n) {
                        if (++l, r) return "(?<" + r + ">"
                    } else if (e) return "\\" + (+e + t);
                    return a
                }

                e = e || {};
                var t, m, i = e.conjunction || "or", l = 0;
                if (!b(a, "Array") || !a.length) throw new TypeError("Must provide a nonempty array of patterns to merge");
                for (var s, o = [], p = 0; p < a.length; ++p) s = a[p], w.isRegExp(s) ? (t = l, m = s[C] && s[C].captureNames || [], o.push(v.replace.call(w(s.source).source, /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g, r))) : o.push(w.escape(s));
                var c = "none" === i ? "" : "|";
                return w(o.join(c), n)
            }, A.exec = function (a) {
                var n, e, r, t = this.lastIndex, m = v.exec.apply(this, arguments);
                if (m) {
                    if (!L && m.length > 1 && u(m, "") > -1 && (e = i(this, {
                            removeG: !0,
                            isInternalOnly: !0
                        }), v.replace.call(String(a).slice(m.index), e, function () {
                            var a, n = arguments.length;
                            for (a = 1; a < n - 2; ++a) void 0 === arguments[a] && (m[a] = void 0)
                        })), this[C] && this[C].captureNames) for (r = 1; r < m.length; ++r) (n = this[C].captureNames[r - 1]) && (m[n] = m[r]);
                    this.global && !m[0].length && this.lastIndex > m.index && (this.lastIndex = m.index)
                }
                return this.global || (this.lastIndex = t), m
            }, A.test = function (a) {
                return !!A.exec.call(this, a)
            }, A.match = function (a) {
                var n;
                if (w.isRegExp(a)) {
                    if (a.global) return n = v.match.apply(this, arguments), a.lastIndex = 0, n
                } else a = new RegExp(a);
                return A.exec.call(a, S(this))
            }, A.replace = function (a, n) {
                var e, r, t, m = w.isRegExp(a);
                return m ? (a[C] && (r = a[C].captureNames), e = a.lastIndex) : a += "", t = b(n, "Function") ? v.replace.call(String(this), a, function () {
                    var e, t = arguments;
                    if (r) for (t[0] = new String(t[0]), e = 0; e < r.length; ++e) r[e] && (t[0][r[e]] = t[e + 1]);
                    return m && a.global && (a.lastIndex = t[t.length - 2] + t[0].length), n.apply(void 0, t)
                }) : v.replace.call(null == this ? this : String(this), a, function () {
                    var a = arguments;
                    return v.replace.call(String(n), /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g, function (n, e, t) {
                        var m;
                        if (e) {
                            if ((m = +e) <= a.length - 3) return a[m] || "";
                            if ((m = r ? u(r, e) : -1) < 0) throw new SyntaxError("Backreference to undefined group " + n);
                            return a[m + 1] || ""
                        }
                        if ("$" === t) return "$";
                        if ("&" === t || 0 == +t) return a[0];
                        if ("`" === t) return a[a.length - 1].slice(0, a[a.length - 2]);
                        if ("'" === t) return a[a.length - 1].slice(a[a.length - 2] + a[0].length);
                        if (t = +t, !isNaN(t)) {
                            if (t > a.length - 3) throw new SyntaxError("Backreference to undefined group " + n);
                            return a[t] || ""
                        }
                        throw new SyntaxError("Invalid token " + n)
                    })
                }), m && (a.global ? a.lastIndex = 0 : a.lastIndex = e), t
            }, A.split = function (a, n) {
                if (!w.isRegExp(a)) return v.split.apply(this, arguments);
                var e, r = String(this), t = [], m = a.lastIndex, i = 0;
                return n = (void 0 === n ? -1 : n) >>> 0, w.forEach(r, a, function (a) {
                    a.index + a[0].length > i && (t.push(r.slice(i, a.index)), a.length > 1 && a.index < r.length && Array.prototype.push.apply(t, a.slice(1)), e = a[0].length, i = a.index + e)
                }), i === r.length ? v.test.call(a, "") && !e || t.push("") : t.push(r.slice(i)), a.lastIndex = m, t.length > n ? t.slice(0, n) : t
            }, w.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function (a, n) {
                if ("B" === a[1] && n === N) return a[0];
                throw new SyntaxError("Invalid escape " + a[0])
            }, {scope: "all", leadChar: "\\"}), w.addToken(/\\u{([\dA-Fa-f]+)}/, function (a, n, e) {
                var r = l(a[1]);
                if (r > 1114111) throw new SyntaxError("Invalid Unicode code point " + a[0]);
                if (r <= 65535) return "\\u" + _(c(r));
                if (R && e.indexOf("u") > -1) return a[0];
                throw new SyntaxError("Cannot use Unicode code point above \\u{FFFF} without flag u")
            }, {scope: "all", leadChar: "\\"}), w.addToken(/\[(\^?)\]/, function (a) {
                return a[1] ? "[\\s\\S]" : "\\b\\B"
            }, {leadChar: "["}), w.addToken(/\(\?#[^)]*\)/, s, {leadChar: "("}), w.addToken(/\s+|#[^\n]*\n?/, s, {flag: "x"}), w.addToken(/\./, function () {
                return "[\\s\\S]"
            }, {flag: "s", leadChar: "."}), w.addToken(/\\k<([\w$]+)>/, function (a) {
                var n = isNaN(a[1]) ? u(this.captureNames, a[1]) + 1 : +a[1], e = a.index + a[0].length;
                if (!n || n > this.captureNames.length) throw new SyntaxError("Backreference to undefined group " + a[0]);
                return "\\" + n + (e === a.input.length || isNaN(a.input.charAt(e)) ? "" : "(?:)")
            }, {leadChar: "\\"}), w.addToken(/\\(\d+)/, function (a, n) {
                if (!(n === N && /^[1-9]/.test(a[1]) && +a[1] <= this.captureNames.length) && "0" !== a[1]) throw new SyntaxError("Cannot use octal escape or backreference to undefined group " + a[0]);
                return a[0]
            }, {scope: "all", leadChar: "\\"}), w.addToken(/\(\?P?<([\w$]+)>/, function (a) {
                if (!isNaN(a[1])) throw new SyntaxError("Cannot use integer as capture name " + a[0]);
                if ("length" === a[1] || "__proto__" === a[1]) throw new SyntaxError("Cannot use reserved word as capture name " + a[0]);
                if (u(this.captureNames, a[1]) > -1) throw new SyntaxError("Cannot use same name for multiple groups " + a[0]);
                return this.captureNames.push(a[1]), this.hasNamedCapture = !0, "("
            }, {leadChar: "("}), w.addToken(/\((?!\?)/, function (a, n, e) {
                return e.indexOf("n") > -1 ? "(?:" : (this.captureNames.push(null), "(")
            }, {optionalFlags: "n", leadChar: "("}), n.exports = w
        }, {}]
    }, {}, [8])(8)
});
//# sourceMappingURL=xregexp-all.min.js.map