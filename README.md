# **JSPM-LESS**

Resolves jspm package imports in less files

This package needs to be configured as a less plugin. To see how to do it refer to the [less plugins page](http://lesscss.org/usage/#plugins).

Once this is done to import a jspm package in your less file you can do it like this:

```css
@import "jspm://my-package/style.less";
```