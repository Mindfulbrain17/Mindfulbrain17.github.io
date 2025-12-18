---
layout: archive
title: "Search"
permalink: /search/
author_profile: true
---

<form action="{{ site.baseurl }}/search/" method="get">
  <input type="text" id="search-box" name="query" placeholder="Search..." style="width: 100%; padding: 10px; font-size: 16px;">
  <input type="submit" value="Search" style="margin-top: 10px;">
</form>

<ul id="search-results"></ul>

<script src="{{ site.baseurl }}/assets/js/vendor/lunr.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/search-data.json"></script>
<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ site.baseurl }}{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
    ,
    {% for collection in site.collections %}
      {% if collection.label != 'posts' %}
        {% for doc in collection.docs %}
          "{{ doc.url | slugify }}": {
            "title": "{{ doc.title | xml_escape }}",
            "author": "{{ doc.author | xml_escape }}",
            "category": "{{ collection.label | xml_escape }}",
            "content": {{ doc.content | strip_html | strip_newlines | jsonify }},
            "url": "{{ site.baseurl }}{{ doc.url | xml_escape }}"
          }
          {% unless forloop.last %},{% endunless %}
        {% endfor %}
        {% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  };
</script>
<script src="{{ site.baseurl }}/assets/js/search.js"></script>
