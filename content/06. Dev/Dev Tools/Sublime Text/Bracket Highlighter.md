---
title: Bracket Highlighter
date: 2024-05-08
draft: false
tags:
  - SublimeText
complete: true
---
## 1. package controller
```
shift + cmd + p

>> install package controller
```

## 2. install package
```
shift + cmd + p
>> 'install packages'
>> 'Bracket Highligher'
```

## 3. setup
```
shift + cmd + p
>> 'BracketHighligher:Settings'
```

paste below to local settings (right side)
```
{
	"show_bracket_popup_always": true,
	"bracket_styles": {
        // `default` and `unmatched` styles are special
        // styles. If they are not defined here,
        // they will be generated internally with
        // internal defaults.

        // `default` style defines attributes that
        // will be used for any style that does not
        // explicitly define that attribute.  So if
        // a style does not define a color, it will
        // use the color from the "default" style.
        "default": {
            "icon": "dot",
            // Support the old convention of `brackethighlighter.default`
            // for themes that already provide something.
            // As this has always been the only one we've provided
            // by default, all the others will use region-ish colors.
            //https://facelessuser.github.io/BracketHighlighter/customize/#configuring-highlight-style
            "color": "region.yellowish brackethighlighter.default",
            "style": "solid"
        },

        // This particular style is used to highlight
        // unmatched bracket pairs.  It is a special
        // style.
        "unmatched": {
            "icon": "question",
            "color": "region.redish",
            "style": "outline"
        },
        // User defined region styles
        "curly": {
            "icon": "curly_bracket",
            "color": "region.purplish"
            // "style": "underline"
        },
        "round": {
            "icon": "round_bracket",
            "color": "region.yellowish"
            // "style": "underline"
        },
        "square": {
            "icon": "square_bracket",
            "color": "region.bluish"
            // "style": "underline"
        },
        "angle": {
            "icon": "angle_bracket",
            "color": "region.orangish"
            // "style": "underline"
        },
        "tag": {
            "icon": "tag",
            "color": "region.orangish"
            // "style": "underline"
        },
        "c_define": {
            "icon": "hash",
            "color": "region.yellowish"
            // "style": "underline"
        },
        "single_quote": {
            "icon": "single_quote",
            "color": "region.greenish"
            // "style": "underline"
        },
        "double_quote": {
            "icon": "double_quote",
            "color": "region.greenish"
            // "style": "underline"
        },
        "regex": {
            "icon": "star",
            "color": "region.greenish"
            // "style": "underline"
        }
    }
}
```

![](https://i.imgur.com/uuSlIJh.png)
