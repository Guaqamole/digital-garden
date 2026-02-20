---
title: Embed Video
date: 2023-10-30
draft: false
tags:
  - ObsidianTips
complete: true
---
# How to Embed a video

To embed a web page, add the following in your note and replace the placeholder text with the URL of the web page you want to embed:

```html
<iframe width="1200" height="800" src=""></iframe>
```

Note

Some websites don't allow you to embed them. Instead, they may provide URLs that are meant for embedding them. If the website doesn't support embedding, try searching for the name of the website followed by "embed iframe". For example, "youtube embed iframe".

Tip

If you're using [Canvas](https://help.obsidian.md/Plugins/Canvas), you can embed a web page in a card. For more information, refer to [Canvas > Add cards from web pages](https://help.obsidian.md/Plugins/Canvas#Add%20cards%20from%20web%20pages).

## Embed a YouTube video

To embed a YouTube video, use the same Markdown syntax as [external images](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20images):

```md
![](https://www.youtube.com/watch?v=NnTvZWp5Q7o)
```

## Embed a tweet

To embed a tweet, use the same Markdown syntax as [external images](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20images):

```md
![](https://twitter.com/obsdmd/status/1580548874246443010)
```



# Reponsive video

**TO MAKE IT WORK, ADD A CSS SNIPPET IN OBSIDIAN**

<label class="ob-comment" title="Test for comment" style=""> TRY LATER… <input type="checkbox"> <span style=""> This is what you expect to happen. </span></label> 

You can name it whatever you want - "Responsive Youtube" for recommendation. Here's the css:

```
.iframe-container{
position: relative;
width: 100%;
padding-bottom: 56.25%;
height: 0;
}
.iframe-container iframe{
position: absolute;
top:0;
left: 0;
width: 100%;
height: 100%;
}
```

Then everytime you copy the embed code from youtube, add it in between this html code, example below.

<div class=iframe-container>

</div>

Here is the responsive embeded code that works!

```
<div class=iframe-container>
<iframe width="1200" height="800" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

And voila, you can watch your videos in Obsidian without having to struggle with different window sizes or devices.

Thank you for the css from [https://youtu.be/9YffrCViTVk](https://youtu.be/9YffrCViTVk)
