from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    """도서 카테고리"""
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    """도서 상세 정보"""
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    publisher = models.CharField(max_length=50)
    isbn = models.CharField(max_length=13, unique=True)
    cover = models.URLField()
    pub_date = models.DateField()
    
    # book.json에 포함된 추가 상세 정보
    description = models.TextField(blank=True, null=True)
    subTitle = models.CharField(max_length=255, blank=True, null=True)
    
    # 작가 정보
    author_info = models.TextField(blank=True, null=True)
    author_photo = models.URLField(blank=True, null=True)

    is_bestseller = models.BooleanField(default=False)
    
    # 카테고리 (Foreign Key 연결)
    # JSON에서 "category": 1 로 참조하므로 ForeignKey로 정의합니다.
    category = models.ForeignKey(
        Category, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='books'
    )
    
    # 평점
    customer_review_rank = models.FloatField(default=0)

    # 임베딩 벡터를 저장할 필드 추가
    embedding_vector = models.JSONField(
        null=True, 
        blank=True, 
        help_text="OpenAI text-embedding-3-small 모델의 벡터 (1536차원) 저장 공간"
    )
    
    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return self.title

class Comment(models.Model):
    """도서에 대한 사용자 댓글/토크톡 모델"""
    # 어떤 책에 달린 댓글인지
    book = models.ForeignKey(
        'Book', # Book 모델을 문자열로 참조 (순환 참조 방지)
        on_delete=models.CASCADE, 
        related_name='comments'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # 댓글 내용
    content = models.TextField()
    rating = models.IntegerField(default=5)
    is_voice = models.BooleanField(default=False) 
    voice_choice = models.CharField(max_length=50, default='alloy')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at'] 

    def __str__(self):
        return f'{self.user.username} - {self.book.title[:10]} 댓글'
    

# books/models.py

class Library(models.Model):
    """사용자의 서재 (찜하기 및 댓글 단 도서 저장)"""
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='library_items'
    )
    book = models.ForeignKey(
        Book, 
        on_delete=models.CASCADE, 
        related_name='in_libraries'
    )
    # 찜하기인지, 댓글 작성으로 인한 자동 등록인지 구분하고 싶다면 필드 추가 가능 (선택사항)
    # is_liked = models.BooleanField(default=False) 
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # 한 유저가 같은 책을 중복해서 서재에 담을 수 없도록 설정
        unique_together = ('user', 'book')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username}의 서재 - {self.book.title}"