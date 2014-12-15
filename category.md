---
layout: page
title: 分类
---
<div class="page-category">
{% for cat in site.categories %}
<a href="index.html#{{ cat[0] }}">{{ cat[0] }}</a>
{% endfor %}
</div>


{% for cat in site.categories %}
<h1 class="category-name" id="{{cat[0]}}" name="{{cat[0]}}">{{cat[0]}}</h1>
{% for post in cat[1] %}
<div class="article">
<span class="datetime">{{ post.date | date:"%Y-%m-%d" }} </span>
<a href="{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}
{% endfor %}
