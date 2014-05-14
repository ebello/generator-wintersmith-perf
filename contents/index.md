---
id: home
title: Extensions to Wintersmith
template: index.html
---
# Wintersmith
https://github.com/jnordberg/wintersmith

## Features

### Meta redirects
In the page metadata, specify `redirect` or `redirectid`. `redirectid` is used to redirect to a page within the site, dynamically getting the URL by its metadata id.

### Ordered navigation
Primary navigation can be controlled by adding `primarynavorder` in the page's metadata along with a number specifying the order you'd like the pages in the navigation to appear. Example: `primarynavorder: 1` will list that page first in the nav. In the template, use this code to output the nav.
```
<ul>
  {% set primary_nav = env.helpers.getPrimaryNavigation(contents) %}
  {% for item in primary_nav %}
    {% include "includes/nav.html" %}
  {% endfor %}
</ul>
```

Secondary navigation by folder can be controlled by adding `navorder` in the page's metadata along with a number specifying the order you'd like the pages in the navigation to appear. Example: `navorder: 1` will list that page first in the nav. In the template, use this code to output the nav based on the folder the page is in.
```
<ul>
  {% set nav = env.helpers.getNavigation(contents, page.filepath.dir) %}
  {% for item in nav %}
    {% include "includes/nav.html" %}
  {% endfor %}
</ul>
```

### Outputting raw page JSON
If you need to output JSON as a raw string, use `{{ env.helpers.rawjson(json_object) }}`

### Get URL by page id
This function is used to get a page's URL by its id specified in page metadata.
```
Here is a link to this <a href="{{ urlbyid(contents, 'home') }}">home page</a>.
```
