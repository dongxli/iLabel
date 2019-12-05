from .views import ImageView
from django.urls import path

urlpatterns = [
    path('images/', ImageView.as_view()),
    path('images/<int:pk>/', ImageView.as_view())
]