from django.urls import path
from .views import UserSignupView, UserLoginView, PersonalizedRecommendationView, UserProfileUpdateView, UserLibraryView
from . import views

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('me/', views.user_me, name='user_me'),
    path('delete/', views.delete_account, name='delete_account'),
    path('recommendation/personalized/', PersonalizedRecommendationView.as_view(), name='personalized_recommendation'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('library/', UserLibraryView.as_view(), name='user_library'),
]