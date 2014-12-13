---
layout: page
title: Tag
---

{% for tag in site.tags %}
<div>
<a href="index.html#{{ tag[0] }}">{{ tag[0] }}({{tag[1].size}})</a>
</div>
{% endfor %}

{% for tag in site.tags %}
<div id = "{{tag[0]}}" name="{{tag[0]}}">
<h1>{{tag[0]}}</h1>
</div>
{% for post in tag[1] %}
<div class="article">
<span class="datetime">{{ post.date | date:"%Y-%m-%d" }} </span>
<a href="{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}
{% endfor %}