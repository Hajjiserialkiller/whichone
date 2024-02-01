from django.urls import path
from .  import views


urlpatterns = [
    path('', views.home,name='home'),
    path('category/', views.category,name='category'),
    path('post/<str:pk>/', views.postdetail, name='post_detail'),
]