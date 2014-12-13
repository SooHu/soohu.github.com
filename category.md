---
layout: page
title: Category
---
{% for cat in site.categories %}
<div>
<a href="index.html#{{ cat[0] }}">{{ cat[0] }}</a>
</div>
{% endfor %}

{% for cat in site.categories %}
<div id="{{cat[0]}}" name="{{cat[0]}}">
<h1>{{cat[0]}}</h1>
</div>
{% for post in cat[1] %}
<div class="article">
<span class="datetime">{{ post.date | date:"%Y-%m-%d" }} </span>
<a href="{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}
{% endfor %}

<h1>Tags</h1>
{% for tag in site.tags %}
<div>
<a>{{ tag[0] }}</a>
</div>
{% endfor %}