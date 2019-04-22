# sw-packer
A service worker that caches an entire website for full offline use using a zipped package.
Inspired in the [Mozilla Cookbook](https://github.com/mozilla/serviceworker-cookbook/tree/master/cache-from-zip) recipe to cache from ZIP (MIT License).

## Usage
Just download the serviceworker.js file and change the configuration part (at the beginning of the file) to cover your use case. You alse need to ZIP your entire static website (html, images, folders, js, css, fonts).

**Variable**|How to configure it
---|---
**CACHE_VERSION** | Name of the cache used by the browser. Change it when you change your website. |
**zip_with_the_website** | URL of the ZIP file which contains the static website (html, images, folders, js, css, fonts).
**individual_requests** | Extra URLs to cache, as individual files (out of the ZIP).
**filter_location_of_zip** | Name of the root directory of the zip which contains inside the entire website.
**tags_to_replace** | When the service worker store in cache html files, it can replace some tags to large html code. Useful to not include headers and footers in all static html files and reduce the final ZIP size.
**server_headers** | The headers that the service worker will provide to the browser for all its files.
**service_worker_routes** | A javascript function that will decide from the URL, the routes that will be served using the serviceworker (returning true) or not (returning false).

## Demo
An old or new version of the service worker it is used in the catholic website [Curso Católico](https://www.cursocatolico.com/), as this service worker were initially developed for them.

## License
This serviceworker is released under the MIT License.
It depends on [typedarray.js](https://bitbucket.org/lindenlab/llsd/src/7d2646cd3f9b4c806e73aebc4b32bd81e4047fdc/js/typedarray.js?at=default&fileviewer=file-view-default) (MIT License) and [zip.js](https://github.com/gildas-lormeau/zip.js) (BSD license).

