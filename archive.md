---
layout: page
title: 归档
---

{% for post in site.posts %}
{% unless post.next %}
<h1 class="page-data-year">{{ post.date | date: '%Y' }}</h1>
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
<h1 class="page-data-year">{{ post.date | date: '%Y' }}</h1>
{% endif %}
{% endunless %}

<li class="page-data-md">{{ post.date | date:"%m" }}月{{ post.date | date:"%d" }}日 <a class="title" href="{{ post.url }}"><i class="fa fa-hand-o-right"></i> {{ post.title }}</a><span><a href="{{/category/index.html#{{ page.tags | first }}}}">{{ post.tags | first}}</a><a href="{{/category/index.html#{{ page.tags[1] }}}}">{% if post.tags[1] %}{{ post.tags[1]}}/{% endif %}</a><a href="{{/category/index.html#{{ page.tags[2] }}}}">{% if post.tags[2] %}{{ post.tags[2]}}/{% endif %}</a></span></li>
{% endfor %}