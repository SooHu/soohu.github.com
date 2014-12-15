---
layout: page
title: 标签
---
<div class="page-tag">
{% for tag in site.tags %}
<a href="index.html#{{ tag[0] }}">{{ tag[0] }}({{tag[1].size}})</a>
{% endfor %}
</div>


{% for tag in site.tags %}
<h1 class="tag-name" id = "{{tag[0]}}" name="{{tag[0]}}">{{tag[0]}}</h1>
{% for post in tag[1] %}
<div class="article">
<span class="datetime">{{ post.date | date:"%Y-%m-%d" }} </span>
<a href="{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}
{% endfor %}