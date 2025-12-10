from django.urls import path
from . import views

urlpatterns = [
    # GET/POST api/v1/articles/
    path('articles/', views.article_list),

    # GET/PUT/DELETE api/v1/articles/<int:article_id>/
    path('articles/<int:article_id>/', views.article_detail),
]
