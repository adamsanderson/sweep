Publishing
==========

In order to publish, you must build a zip file:

```
yarn package
```

Upload the versioned zip file from the `web-ext-artifacts` directory to mozilla:

https://addons.mozilla.org/en-US/developers/addon/{TODO}/versions/submit/

The source is archived in `sweep-src.zip`.

After uploading the zip files, Sweep will be available as an addon.