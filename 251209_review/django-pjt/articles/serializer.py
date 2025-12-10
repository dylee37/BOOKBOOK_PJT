from rest_framework import serializers
from .models import Article

# 게시글 전체 조회
class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title')

# 게시글 상세 조회/생성/수정
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'  # title, content
