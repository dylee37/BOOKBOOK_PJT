from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Article
from .serializer import ArticleSerializer, ArticleListSerializer

@api_view(['GET', 'POST',])
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.order_by('-pk')
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ArticleSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        


@api_view(['GET', 'PUT', 'DELETE',])
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    elif request.method == 'DELETE':
        article.delete()
        return Response({ 'id': article_id })