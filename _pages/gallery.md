---
layout: archive
title: "Gallery"
permalink: /gallery/
author_profile: true
---

<style>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.gallery-item {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  text-align: center;
}

.gallery-item img {
  max-width: 100%;
  height: auto;
  display: block;
}

.gallery-caption {
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}
</style>

<div class="gallery-grid">
  {% for item in site.data.gallery %}
    <div class="gallery-item">
      <img src="{{ item.image_path | relative_url }}" alt="{{ item.caption }}">
      {% if item.caption %}
        <div class="gallery-caption">{{ item.caption }}</div>
      {% endif %}
    </div>
  {% endfor %}
</div>
